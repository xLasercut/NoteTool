const remote = require('electron').remote
const BrowserWindow = remote.BrowserWindow
const url = require('url')
const path = require('path')
const fileHelper = require('./file-helper.js')
const ipcRenderer = require('electron').ipcRenderer
const formatHelper = require("./format-helper.js")

let mainWindow = remote.getCurrentWindow()
let addNoteWindow
let editNoteWindow
let settingsWindow
const globalObj = remote.getGlobal("sharedObj")

const debug = globalObj.debug
const dataPath = globalObj.dataPath
const maxNote = globalObj.maxNote

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

function createChildWindow (childWindow, parentWindow, url, height, width, resizable, eventData) {
    childWindow = new BrowserWindow({
        width: width,
        height: height,
        resizable: resizable,
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

function findIndexOfId (data, id) {
    return data.findIndex(function (t) {
       return t.key == id
    })
}

function generateNoteId (data) {
    id = Math.floor(Math.random() * Number(maxNote))
    while (findIndexOfId(data, id) != -1) {
        id = Math.floor(Math.random() * Number(maxNote))
    }
    return id
}


fileHelper.ensureFile(dataPath, [])

var indexApp = new Vue ({
    el: '#indexApp',
    data: {
        noteData: fileHelper.readFile(dataPath)
    },
    methods: {
        editNote: function (event) {
            var index = findIndexOfId(this.noteData, event.currentTarget.id)
            data = {
                eventName: "editNoteData",
                eventData: {
                    key: event.currentTarget.id,
                    title: this.noteData[index].title,
                    message: this.noteData[index].message
                }
            }
            createChildWindow(editNoteWindow, mainWindow, editNoteUrl, 600, 800, true, data)
        },
        deleteNote: function (event) {
            var index = findIndexOfId(this.noteData, event.currentTarget.id)
            this.noteData.splice(index, 1)
            fileHelper.writeFile(dataPath, this.noteData)
        },
        openSettings: function () {
            createChildWindow(settingsWindow, mainWindow, settingsUrl, 400, 600, false)
        },
        openAddNote: function () {
            if (this.noteData.length >= Number(maxNote)) {
                alert("Max number of notes reached")
            }
            else {
                var id = generateNoteId(this.noteData)
                var data = {
                    eventName: "addNoteId",
                    eventData: id
                }
                createChildWindow(addNoteWindow, mainWindow, addNoteUrl, 600, 800, true, data)
            }
        },
        compileMessage(message) {
            return formatHelper.renderItems(message)
        }
    }
})

ipcRenderer.on("addNewNote", function(evt, data) {
    indexApp.noteData.unshift(data)
    fileHelper.writeFile(dataPath, indexApp.noteData)
})

ipcRenderer.on("editNote", function(evt, data) {
    var index = findIndexOfId(indexApp.noteData, data.key)
    indexApp.noteData.splice(index, 1, data)
    fileHelper.writeFile(dataPath, indexApp.noteData)
})
