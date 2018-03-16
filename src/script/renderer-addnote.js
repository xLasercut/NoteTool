const fileHelper = require('./file-helper.js')
const remote = require('electron').remote
const path = require('path')
const ipcRenderer = require('electron').ipcRenderer
const formatHelper = require("./format-helper.js")

var currentWindow = remote.getCurrentWindow()
var parentWindow = currentWindow.getParentWindow()

var addNoteApp = new Vue({
    el: '#addNoteApp',
    data: {
        key: '',
        noteTitle: '',
        noteBody: '',
        buttons: formatHelper.getFormatBtns()
    },
    methods: {
        addNewNote: function () {
            if (this.noteTitle && this.noteBody) {
                var newNote = {
                    key: this.key,
                    title: this.noteTitle,
                    message: this.noteBody
                }
                parentWindow.webContents.send("addNewNote", newNote)
            }
            currentWindow.close()
        },
        cancelNewNote: function () {
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



ipcRenderer.on("addNoteId", function(evt, data) {
    addNoteApp.key = data
})
