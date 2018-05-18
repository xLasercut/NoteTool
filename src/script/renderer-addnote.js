const remote = require('electron').remote
const path = require('path')
const ipcRenderer = require('electron').ipcRenderer
const FormatManager = require("./format-manager.js")

formatManager = new FormatManager()

var currentWindow = remote.getCurrentWindow()
var parentWindow = currentWindow.getParentWindow()

var addNoteApp = new Vue({
    el: '#addNoteApp',
    data: {
        key: '',
        buttons: formatManager.getBtns()
    },
    methods: {
        addNewNote: function () {
            var noteTitle = this.$refs.noteTitle.innerHTML
            var noteBody = this.$refs.noteBody.innerHTML
            if (noteTitle && noteBody) {
                var newNote = {
                    key: this.key,
                    title: noteTitle,
                    message: noteBody
                }
                parentWindow.webContents.send("addNewNote", newNote)
            }
            currentWindow.close()
        },
        cancelNewNote: function () {
            currentWindow.close()
        },
        addTag: function (tag) {
            formatManager.addFormat(tag)
        }
    }
})



ipcRenderer.on("addNoteId", function(evt, data) {
    addNoteApp.key = data
})
