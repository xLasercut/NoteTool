const ipcRenderer = require('electron').ipcRenderer
const remote = require('electron').remote
const $ = require('jquery')
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
    fileHelper.ensureFile(process.env.DATA_PATH, {})
    var message = $("#editNoteBody").val()
    var title = $("#editNoteTitle").val()

    if (!(title === "" && message === "")) {
        var data = fileHelper.readFile(process.env.DATA_PATH)
        data[passedData.noteId].title = title
        data[passedData.noteId].message = message
        fileHelper.writeFile(process.env.DATA_PATH, data)
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
