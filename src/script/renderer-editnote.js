const ipcRenderer = require('electron').ipcRenderer
const remote = require('electron').remote
const fileHelper = require('./file-helper.js')

var currentWindow = remote.getCurrentWindow()
var parentWindow = currentWindow.getParentWindow()

var editNoteApp = new Vue({
    el: '#editNoteApp',
    data: {
        key: '',
        noteTitle: '',
        noteBody: ''
    },
    methods: {
        saveEdittedNote: function () {
            if (this.noteTitle && this.noteBody) {
                var note = {
                    key: this.key,
                    title: this.noteTitle,
                    message: this.noteBody
                }
                parentWindow.webContents.send("editNote", note)
            }
            currentWindow.close()
        },
        cancelEditNote: function () {
            currentWindow.close()
        }
    }
})


ipcRenderer.on("editNoteData", function(evt, data) {
    editNoteApp.key = data.key
    editNoteApp.noteTitle = data.title
    editNoteApp.noteBody = data.message
})
