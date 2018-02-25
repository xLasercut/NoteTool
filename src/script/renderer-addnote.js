const fileHelper = require('./file-helper.js')
const remote = require('electron').remote
const $ = require('jquery')
const path = require('path')

var currentWindow = remote.getCurrentWindow()
var mainWinow = currentWindow.getParentWindow()

const globalObj = remote.getGlobal("sharedObj")
const dataPath = globalObj.dataPath
const maxNote = globalObj.maxNote

function generateNoteId (noteData) {
    id = Math.floor(Math.random() * maxNote)
    while (noteData[id]) {
        id = Math.floor(Math.random() * maxNote)
    }
    return id
}

function addNewNote () {
    fileHelper.ensureFile(dataPath, {})
    var message = $("#addNoteBody").val()
    var title = $("#addNoteTitle").val()

    if (!(title === "" && message === "")) {
        var newNote = {
            title: title,
            message: message
        }
        var data = fileHelper.readFile(dataPath)
        if (Object.keys(data).length < maxNote){
            var noteId = generateNoteId(data)
            data[noteId] = newNote
            fileHelper.writeFile(dataPath, data)
            mainWinow.reload()
        }
        else {
            alert(`Reached note limit of: ${maxNote}`)
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
