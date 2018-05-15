const FileHelper = require('./file-helper.js')
const remote = require('electron').remote
const path = require('path')

var currentWindow = remote.getCurrentWindow()
var parentWindow = currentWindow.getParentWindow()

const globalObj = remote.getGlobal("sharedObj")
const configPath = globalObj.configPath

var configFile = new FileHelper(configPath)

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
                configFile.writeFile(config)
                alert("New configurations set. Please restart Note Tool")
            }
            currentWindow.close()
        }
    }
})

var config = configFile.readFile()
settingsApp.dataPath = config.dataPath
settingsApp.maxNote = config.maxNote
