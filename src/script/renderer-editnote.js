const ipcRenderer = require('electron').ipcRenderer
const remote = require('electron').remote
const $ = require('jquery')
const fileHelper = require('./file-helper.js')

var passedData = null
var currentWindow = remote.getCurrentWindow()
var parentWindow = currentWindow.getParentWindow()

var globalObj = remote.getGlobal("sharedObj")
var dataPath = globalObj.dataPath

ipcRenderer.on("noteData", function(evt, data) {
    passedData = data
    $("#editNoteTitle").val(data.title)
    $("#editNoteBody").val(data.body)
})

function saveChanges () {
    fileHelper.ensureFile(dataPath, {})
    var message = $("#editNoteBody").val()
    var title = $("#editNoteTitle").val()

    if (!(title === "" && message === "")) {
        var data = fileHelper.readFile(dataPath)
        data[passedData.noteId].title = title
        data[passedData.noteId].message = message
        fileHelper.writeFile(dataPath, data)
        parentWindow.reload()
    }
    currentWindow.close()
}

$("#btnAddEditNote").click(function () {
    saveChanges()
})

$("#btnCancelEditNote").click(function () {
    currentWindow.close()
})
