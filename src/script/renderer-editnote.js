const ipcRenderer = require('electron').ipcRenderer
const remote = require('electron').remote
const FormatManager = require('./format-manager.js')

var currentWindow = remote.getCurrentWindow()
var parentWindow = currentWindow.getParentWindow()

var formatManager = new FormatManager()

var editNoteApp = new Vue({
    el: '#editNoteApp',
    data: {
        key: '',
        buttons: formatManager.getBtns()
    },
    methods: {
        saveEdittedNote: function () {
            var noteTitle = this.$refs.noteTitle.innerHTML
            var noteBody = this.$refs.noteBody.innerHTML
            if (noteTitle && noteBody) {
                var note = {
                    key: this.key,
                    title: noteTitle,
                    message: noteBody
                }
                parentWindow.webContents.send("editNote", note)
            }
            currentWindow.close()
        },
        cancelEditNote: function () {
            currentWindow.close()
        },
        addTag: function (tag) {
            formatManager.addFormat(tag)
        }
    }
})


ipcRenderer.on("editNoteData", function(evt, data) {
    editNoteApp.key = data.key
    editNoteApp.$refs.noteTitle.innerHTML = data.title
    editNoteApp.$refs.noteBody.innerHTML = data.message
})
