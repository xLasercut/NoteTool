const fileHelper = require('./file-helper.js')
const remote = require('electron').remote
const $ = require('jquery')
const path = require('path')

var currentWindow = remote.getCurrentWindow()
var mainWinow = currentWindow.getParentWindow()

function generateNoteId (noteData) {
    id = Math.floor(Math.random() * process.env.MAX_NOTE)
    while (noteData[id]) {
        id = Math.floor(Math.random() * process.env.MAX_NOTE)
    }
    return id
}

function addNewNote () {
    fileHelper.ensureFile(process.env.DATA_PATH, {})
    var message = $("#addNoteBody").val()
    var title = $("#addNoteTitle").val()

    if (!(title === "" && message === "")) {
        var newNote = {
            title: title,
            message: message
        }
        var data = fileHelper.readFile(process.env.DATA_PATH)
        if (Object.keys(data).length < process.env.MAX_NOTE){
            var noteId = generateNoteId(data)
            data[noteId] = newNote
            fileHelper.writeFile(process.env.DATA_PATH, data)
            mainWinow.reload()
        }
        else {
            alert(`Reached note limit of: ${process.env.MAX_NOTE}`)
        }
    }
    currentWindow.close()
}

$("#btnAddNewNote").click(function () {
    addNewNote()
})

$("#btnCancelNewNote").click(function () {
    currentWindow.close()
})
