const remote = require('electron').remote
const BrowserWindow = remote.BrowserWindow
const $ = require('jquery')
const url = require('url')
const path = require('path')
const fileHelper = require('./file-helper.js')


let mainWindow = remote.getCurrentWindow()
let addNoteWindow
let editNotewindow

function createAddNoteWindow () {
    // Create the browser window.
    var addNoteUrl = url.format({
        pathname: path.join(__dirname, "..", "page", "addnote.html"),
        protocol: "file:",
        slashes: true
    })

    addNoteWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        parent: mainWindow
    })

    // and load the index.html of the app.
    addNoteWindow.loadURL(addNoteUrl)

    addNoteWindow.once('ready-to-show', function () {
        addNoteWindow.show()
    })

    // Emitted when the window is closed.
    addNoteWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        addNoteWindow = null
    })
}

function createEditNoteWindow (data) {
    // Create the browser window.
    var editNoteUrl = url.format({
        pathname: path.join(__dirname, "..", "page", "editnote.html"),
        protocol: "file:",
        slashes: true
    })

    editNoteWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        parent: mainWindow
    })

    // and load the index.html of the app.
    editNoteWindow.loadURL(editNoteUrl)


    editNoteWindow.once('ready-to-show', function () {
        editNoteWindow.show()
        editNoteWindow.webContents.send("noteData", data)
    })

    // Emitted when the window is closed.
    editNoteWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        editNoteWindow = null
    })
}

function createNote (noteData, noteId) {

    var itemToAppend = '<div id="note' + noteId + '" class="noteContainer">' +
                            '<div id="noteHeader' + noteId + '" class="noteHeader">' +
                                noteData.title +
                                '<button id="btnDeleteNote' + noteId + '" class="btnDelete"><i class="fas fa-trash-alt"></i></button>' +
                                '<button id="btnEditNote' + noteId + '" class="btnEdit"><i class="fas fa-edit"></i></button>' +
                            '</div>' +
                            '<div id="noteBody' + noteId + '" class="noteBody">' +
                                noteData.message +
                            '</div>' +
                        '</div>'

    $("#noteDiv").append(itemToAppend)
}


function renderNotes () {
    var noteFileName = "note-data.json"
    var noteFileBasePath = path.join(__dirname, "..", "..", "data")
    var noteFileUrl = path.join(noteFileBasePath, noteFileName)
    fileHelper.ensureDataFile(noteFileBasePath, noteFileName)

    fileHelper.readNoteFile(noteFileUrl)
    .then (function (data) {
        for (var id in data) {
            createNote(data[id], id)
        }
    })
    .catch (function (error) {
        console.log(error)
    })
}

function deleteNote (id) {
    var noteFileUrl = path.join(__dirname, "..", "..", "data", "note-data.json")
    fileHelper.readNoteFile(noteFileUrl)
    .then (function (data) {
        delete data[id]
        return fileHelper.writeNoteFile(noteFileUrl, data)
    })
    .then (function (msg) {
        console.log(msg)
        mainWindow.reload()
    })
    .catch (function (error) {
        console.log(error)
    })
}




$(document).ready(function () {
    renderNotes()
})


$("#noteDiv").on("click", "button.btnEdit", function () {
    noteId = noteId = this.id.replace("btnEditNote", "")
    var noteHeader = $("#noteHeader" + noteId)
    var noteBody = $("#noteBody" + noteId)
    data = {
        "noteId": noteId,
        "title": noteHeader.text(),
        "body": noteBody.text()
    }
    createEditNoteWindow(data)
})

$("#noteDiv").on("click", "button.btnDelete", function () {
    noteId = this.id.replace("btnDeleteNote", "")
    deleteNote(noteId)
})

$("#btnAddNote").click(function () {
    createAddNoteWindow()
})
