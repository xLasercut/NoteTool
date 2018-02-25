const $ = require('jquery')
const fileHelper = require('./file-helper.js')
const remote = require('electron').remote

var currentWindow = remote.getCurrentWindow()
var parentWindow = currentWindow.getParentWindow()

var globalObj = remote.getGlobal("sharedObj")
var configPath = globalObj.configPath

$(document).ready(function () {
    var config = fileHelper.readFile(configPath)
    $("#dataPath").val(config.dataPath)
    $("#maxNote").val(config.maxNote)
})


$("#btnChangeSetting").click(function () {
    alert("WIP")
})

$("#btnCancelChangeSetting").click(function () {
    currentWindow.close()
})

$("#FileUpload").change(function (e) {
    var theFiles = e.target.files;
    var relativePath = theFiles[0].webkitRelativePath;
    var folder = relativePath.split("/");
})
