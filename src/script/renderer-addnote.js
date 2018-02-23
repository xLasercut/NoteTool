const fileHelper = require('./file-helper.js')
const remote = require('electron').remote
const $ = require('jquery')
const path = require('path')

const maxNote = 1000

function generateNoteId (noteData) {
    id = Math.floor(Math.random() * maxNote)
    while (noteData[id]) {
        id = Math.floor(Math.random() * maxNote)
    }
    return id
}

function closeWindow () {
    var currentWindow = remote.getCurrentWindow()
    currentWindow.close()
}

function reloadParent() {
    var parentWindow = remote.getCurrentWindow().getParentWindow()
    parentWindow.reload()
}

function addNewNote () {
    var message = $("#addNoteBody").val()
    var title = $("#addNoteTitle").val()

    if (title === "" && message === "") {
        closeWindow()
    }
    else {
        newNote = {
            title: title,
            message: message
        }

        var noteFileUrl = path.join(__dirname, "..", "..", "data", "note-data.json")

        fileHelper.readNoteFile(noteFileUrl)
        .then (function (data) {
            if (Object.keys(data).length < maxNote){
                noteId = generateNoteId(data)
                data[noteId] = newNote
                return fileHelper.writeNoteFile(noteFileUrl, data)
            }
            else {
                alert("Max number of note reached, please delete note before creating new note")
            }
        })
        .then (function (msg) {
            console.log(msg)
            reloadParent()
            closeWindow()
        })
        .catch (function (err) {
            console.log(err)
        })
    }
}

$("#btnAddNewNote").click(function () {
    addNewNote()
})

$("#btnCancelNewNote").click(function () {
    closeWindow()
})
