const remote = require('electron').remote
const BrowserWindow = remote.BrowserWindow
const $ = require('jquery')
const url = require('url')
const path = require('path')
const fileHelper = require('./file-helper.js')


let mainWindow = remote.getCurrentWindow()
let addNoteWindow
let editNoteWindow
let settingsWindow
var globalObj = remote.getGlobal("sharedObj")

var debug = globalObj.debug
var dataPath = globalObj.dataPath

var addNoteUrl = url.format({
    pathname: path.join(__dirname, "..", "page", "addnote.html"),
    protocol: "file:",
    slashes: true
})

var editNoteUrl = url.format({
    pathname: path.join(__dirname, "..", "page", "editnote.html"),
    protocol: "file:",
    slashes: true
})

var settingsUrl = url.format({
    pathname: path.join(__dirname, "..", "page", "settings.html"),
    protocol: "file:",
    slashes: true
})

function createChildWindow (childWindow, parentWindow, url, height, width, eventData) {
    childWindow = new BrowserWindow({
        width: width,
        height: height,
        show: false,
        parent: parentWindow
    })

    if (debug) {
        childWindow.webContents.openDevTools()
    }
    else {
        childWindow.setMenu(null)
    }

    childWindow.loadURL(url)

    childWindow.once('ready-to-show', function () {
        childWindow.show()
        if (eventData) {
            childWindow.webContents.send(eventData.eventName, eventData.eventData)
        }
    })

    childWindow.on('closed', function () {
        childWindow = null
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
    fileHelper.ensureFile(dataPath, {})
    var data = fileHelper.readFile(dataPath)
    for (var id in data) {
        createNote(data[id], id)
    }
}

function deleteNote (id) {
    var data = fileHelper.readFile(dataPath)
    delete data[id]
    fileHelper.writeFile(dataPath, data)
    mainWindow.reload()
}




$(document).ready(function () {
    renderNotes()
})


$("#noteDiv").on("click", "button.btnEdit", function () {
    noteId = noteId = this.id.replace("btnEditNote", "")
    var noteHeader = $("#noteHeader" + noteId)
    var noteBody = $("#noteBody" + noteId)
    data = {
        eventName: "noteData",
        eventData: {
            "noteId": noteId,
            "title": noteHeader.text(),
            "body": noteBody.text()
        }
    }
    createChildWindow(editNoteWindow, mainWindow, editNoteUrl, 600, 800, data)
})

$("#noteDiv").on("click", "button.btnDelete", function () {
    noteId = this.id.replace("btnDeleteNote", "")
    deleteNote(noteId)
})

$("#btnAddNote").click(function () {
    createChildWindow(addNoteWindow, mainWindow, addNoteUrl, 600, 800)
})

$("#btnSettings").click(function () {
    createChildWindow(settingsWindow, mainWindow, settingsUrl, 600, 800)
})
