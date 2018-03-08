const $ = require('jquery')
const fileHelper = require('./file-helper.js')
const remote = require('electron').remote
const path = require('path')

var currentWindow = remote.getCurrentWindow()
var parentWindow = currentWindow.getParentWindow()

const globalObj = remote.getGlobal("sharedObj")
const configPath = globalObj.configPath

var settingsApp = new Vue({
    el: "#settingsApp",
    data: {
        dataPath: '',
        maxNote: ''
    },
    methods: {
        pathSelect: function (event) {
            var theFiles = event.target.files
            this.dataPath = path.join(theFiles[0].path, "note-data.json")
        },
        closeWindow: function () {
            currentWindow.close()
        },
        saveSettings: function () {
            if (this.maxNote && this.dataPath) {
                var config = {
                    dataPath: this.dataPath,
                    maxNote: this.maxNote
                }
                fileHelper.writeFile(configPath, config)
                alert("New configurations set. Please restart Note Tool")
            }
            currentWindow.close()
        }
    }
})

var config = fileHelper.readFile(configPath)
settingsApp.dataPath = config.dataPath
settingsApp.maxNote = config.maxNote
