const $ = require('jquery')
const fileHelper = require('./file-helper.js')
const remote = require('electron').remote
const path = require('path')

var currentWindow = remote.getCurrentWindow()
var parentWindow = currentWindow.getParentWindow()

const globalObj = remote.getGlobal("sharedObj")
const configPath = globalObj.configPath

$(document).ready(function () {
    var config = fileHelper.readFile(configPath)
    $("#dataPath").val(config.dataPath)
    $("#maxNote").val(config.maxNote)

    $("#btnChangeSetting").click(function () {
        config.dataPath = $("#dataPath").val()
        config.maxNote = $("#maxNote").val()
        fileHelper.writeFile(configPath, config)
        alert("New configurations set. Please restart note tool")
        currentWindow.close()
    })

    $("#btnCancelChangeSetting").click(function () {
        currentWindow.close()
    })

    $("#pathSelect").change(function (event) {
        var theFiles = event.target.files
        var dataPath = path.join(theFiles[0].path, "note-data.json")
        $("#dataPath").val(dataPath)
    })
})
