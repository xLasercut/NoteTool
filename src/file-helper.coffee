path = require('path')
fs = require('fs')
q = require('q')

module.exports.readNoteFile = (notePath) ->
    deferred = q.defer()
    fs.readFile(notePath, 'utf8',
    (err, data) ->
        if err
            deferred.reject(err)
        else
            deferred.resolve(JSON.parse(data))
    )
    deferred.promise

module.exports.writeNoteFile = (notePath, noteData) ->
    deferred = q.defer()
    fs.writeFile(notePath, JSON.stringify(noteData),
    (err) ->
        if err
            deferred.reject(err)
        else
            deferred.resolve("#{notePath} saved")
    )
    deferred.promise

createNoteFile = (filePath, fileData) ->
    deferred = q.defer()
    fs.appendFile(filePath, JSON.stringify(fileData),
    (err) ->
        if err
            deferred.reject(err)
        else
            deferred.resolve("#{filePath} created")
    )
    deferred.promise

createNoteFolder = (folderPath) ->
    deferred = q.defer()
    fs.mkdir(folderPath,
    (err) ->
        if err
            deferred.reject(err)
        else
            deferred.resolve("#{folderPath} created")
    )
    deferred.promise

module.exports.ensureDataFile = (basePath, fileName) ->
    fullPath = path.join(basePath, fileName)
    if fs.existsSync(basePath)
        if !fs.existsSync(fullPath)
            createNoteFile(fullPath, [])
            .then (msg) ->
                console.log(msg)
            .catch (err) ->
                console.log(err)
    else
        createNoteFolder(basePath)
        .then (msg) ->
            console.log(msg)
        .catch (err) ->
            console.log(err)

        createNoteFile(fullPath, [])
        .then (msg) ->
            console.log(msg)
        .catch (err) ->
            console.log(err)
