path = require('path')
q = require('q')
fileHelper = require('./file-helper.coffee')

createNote = (noteData, i) ->
    noteContainer = document.createElement("div")
    noteContainer.setAttribute("id", "note#{i}")
    noteContainer.setAttribute("class", "noteContainer")
    document.getElementById("noteDiv").appendChild(noteContainer)

    noteHeader = document.createElement("div")
    noteHeader.setAttribute("id", "noteHeader#{i}")
    noteHeader.setAttribute("class", "noteHeader")
    document.getElementById("note#{i}").appendChild(noteHeader)

    noteBody = document.createElement("div")
    noteBody.setAttribute("id", "noteBody#{i}")
    noteBody.setAttribute("class", "noteBody")
    document.getElementById("note#{i}").appendChild(noteBody)

    editBtn = document.createElement("button")


renderNotes = () ->
    noteFileName = 'note-data.json'
    noteFileBasePath = path.join(__dirname, '..', 'data')
    noteFileUrl = path.join(noteFileBasePath, noteFileName)

    fileHelper.ensureDataFile(noteFileBasePath, noteFileName)

    fileHelper.readNoteFile(noteFileUrl)
    .then (data) ->
        for i in [0...data.length]
            createNote(data[i], i)
            console.log(data[i])
    .catch (error) ->
        console.log(error)


renderNotes()
