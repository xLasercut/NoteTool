function createNote (noteData, i) {
    var noteContainer = document.createElement("div");
    noteContainer.setAttribute("id", "note" + i);
    noteContainer.setAttribute("class", "noteContainer");
    document.getElementById("noteDiv").appendChild(noteContainer);

    var noteHeader = document.createElement("div");
    noteHeader.setAttribute("id", "noteHeader" + i);
    noteHeader.setAttribute("class", "noteHeader");
    noteHeader.innerHTML = noteData.title;
    document.getElementById("note" + i).appendChild(noteHeader);

    var noteBody = document.createElement("div");
    noteBody.setAttribute("id", "noteBody" + i);
    noteBody.setAttribute("class", "noteBody");
    noteBody.innerHTML = noteData.message;
    document.getElementById("note" + i).appendChild(noteBody);

    var editBtn = document.createElement("button");
}

function renderNotes () {
    var noteFileName = "note-data.json";
    var noteFileBasePath = path.join(__dirname, "..", "..", "data");
    var noteFileUrl = path.join(noteFileBasePath, noteFileName);
    fileHelper.ensureDataFile(noteFileBasePath, noteFileName);

    fileHelper.readNoteFile(noteFileUrl)
    .then (function (data) {
        for (i = 0; i < data.length; i++) {
            createNote(data[i], i);
            console.log(data[i]);
        }
    })
    .catch (function (error) {
        console.log(error);
    });
}


renderNotes();
