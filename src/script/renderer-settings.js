const $ = require('jquery')
const fileHelper = require('./file-helper.js')
const remote = require('electron').remote

var currentWindow = remote.getCurrentWindow()
var parentWindow = currentWindow.getParentWindow()

$(document).ready(function () {
    var config = fileHelper.readFile(process.env.CONFIG_PATH)
    $("#dataPath").val(config.dataPath)
    $("#maxNote").val(config.maxNote)
})


$("#btnChangeSetting").click(function () {
    alert("WIP")
})

$("#btnCancelChangeSetting").click(function () {
    currentWindow.close()
})
