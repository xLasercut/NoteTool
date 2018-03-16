const ipcRenderer = require('electron').ipcRenderer
const remote = require('electron').remote
const fileHelper = require('./file-helper.js')
const formatHelper = require("./format-helper.js")

var currentWindow = remote.getCurrentWindow()
var parentWindow = currentWindow.getParentWindow()

var editNoteApp = new Vue({
    el: '#editNoteApp',
    data: {
        key: '',
        noteTitle: '',
        noteBody: '',
        buttons: formatHelper.getFormatBtns()
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
        },
        addTag: function (tag) {
            var textarea = this.$refs.ta
            var startPosition = textarea.selectionStart
            var endPosition = textarea.selectionEnd

            if (startPosition - endPosition === 0) {
                this.noteBody = this.noteBody.substring(0, startPosition) + `[${tag}][_${tag}]` + this.noteBody.substring(startPosition, this.noteBody.length)
            }
            else {
                this.noteBody = this.noteBody.substring(0, startPosition) + `[${tag}]` + this.noteBody.substring(startPosition, endPosition) + `[_${tag}]` + this.noteBody.substring(endPosition, this.noteBody.length)
            }
        }
    }
})


ipcRenderer.on("editNoteData", function(evt, data) {
    editNoteApp.key = data.key
    editNoteApp.noteTitle = data.title
    editNoteApp.noteBody = data.message
})
