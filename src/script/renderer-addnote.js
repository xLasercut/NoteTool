const fileHelper = require('./file-helper.js')
const remote = require('electron').remote
const $ = require('jquery')
const path = require('path')
const ipcRenderer = require('electron').ipcRenderer

var currentWindow = remote.getCurrentWindow()
var parentWindow = currentWindow.getParentWindow()

var addNoteApp = new Vue({
    el: '#addNoteApp',
    data: {
        key: '',
        noteTitle: '',
        noteBody: ''
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
        }
    }
})

ipcRenderer.on("addNoteId", function(evt, data) {
    addNoteApp.key = data
})
