const ipcRenderer = require('electron').ipcRenderer
const remote = require('electron').remote
const $ = require('jquery')
const path = require('path')
const fileHelper = require('./file-helper.js')

var passedData = null
var currentWindow = remote.getCurrentWindow()
var parentWindow = currentWindow.getParentWindow()

ipcRenderer.on("noteData", function(evt, data) {
    passedData = data
    $("#editNoteTitle").val(data.title)
    $("#editNoteBody").val(data.body)
})

function saveChanges () {
    var message = $("#editNoteBody").val()
    var title = $("#editNoteTitle").val()

    if (title === "" && message === "") {
        currentWindow.close()
    }
    else {
        var noteFileUrl = path.join(__dirname, "..", "..", "data", "note-data.json")

        fileHelper.readNoteFile(noteFileUrl)
        .then (function (data) {

            data[passedData.noteId].title = title
            data[passedData.noteId].message = message
            return fileHelper.writeNoteFile(noteFileUrl, data)
        })
        .then (function (msg) {
            console.log(msg)
            parentWindow.reload()
            currentWindow.close()
        })
        .catch (function (err) {
            console.log(err)
        })
    }
}

$("#btnAddEditNote").click(function () {
    saveChanges()
})

$("#btnCancelEditNote").click(function () {
    currentWindow.close()
})
