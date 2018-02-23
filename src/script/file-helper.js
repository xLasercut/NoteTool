const q = require('q')
const fs = require('fs')
const path = require('path')


module.exports.readNoteFile = function (notePath) {
    var deferred = q.defer()
    fs.readFile(notePath, 'utf8', function (err, data) {
        if (err) {
            deferred.reject(err)
        }
        else {
            deferred.resolve(JSON.parse(data))
        }
    })
    return deferred.promise
}

module.exports.writeNoteFile = function (notePath, noteData) {
    var deferred = q.defer()
    fs.writeFile(notePath, JSON.stringify(noteData), function (err) {
        if (err) {
            deferred.reject(err)
        }
        else {
            deferred.resolve(notePath + " saved")
        }
    })
    return deferred.promise
}

function createNoteFile (filePath, fileData) {
    var deferred = q.defer()
    fs.appendFile(filePath, JSON.stringify(fileData), function (err) {
        if (err) {
            deferred.reject(err)
        }
        else {
            deferred.resolve(filePath + " created")
        }
    })
    return deferred.promise
}

function createNoteFolder (folderPath) {
    var deferred = q.defer()
    fs.mkdir(folderPath, function (err) {
        if (err) {
            deferred.reject(err)
        }
        else {
            deferred.resolve(folderPath + " created")
        }
    })
    return deferred.promise
}

module.exports.ensureDataFile = function (basePath, fileName) {
    var fullPath = path.join(basePath, fileName)
    if (fs.existsSync(basePath)) {
        if (!fs.existsSync(fullPath)) {
            createNoteFile(fullPath, [])
            .then (function (msg) {
                console.log(msg)
            })
            .catch (function (err) {
                console.log(err)
            })
        }
    }
    else {
        createNoteFolder(basePath)
        .then (function (msg) {
            console.log(msg)
        })
        .catch (function (err) {
            console.log(err)
        })

        createNoteFile(fullPath, [])
        .then (function (msg) {
            console.log(msg)
        })
        .catch (function (err) {
            console.log(err)
        })
    }
}
