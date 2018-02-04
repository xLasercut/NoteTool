function openAddNoteWindow () {
    var addNoteUrl = url.format({
        pathname: path.join(__dirname, "addnote.html"),
        protocol: "file",
        slashes: true
    });

    windowHelper.createWindow(addNoteUrl, 800, 600, false);
}

function addNewNote () {
    var message = document.getElementById("addNoteTitle");
    var title = document.getElementById("addNoteBody");
    newNote = {
        title: title.value,
        message: message.value
    };

    var noteFileUrl = path.join(__dirname, "..", "..", "data", "note-data.json")

    fileHelper.readNoteFile(noteFileUrl)
    .then (function (data) {
        data.push(newNote);
        return fileHelper.writeNoteFile(noteFileUrl, data)
    })
    .then (function (msg) {
        console.log(msg);
        var currentWindow = remote.getCurrentWindow();
        currentWindow.close();
    })
    .catch (function (err) {
        console.log(err);
    });
}

function cancelNewNote () {
    var currentWindow = remote.getCurrentWindow();
    currentWindow.close();
}
