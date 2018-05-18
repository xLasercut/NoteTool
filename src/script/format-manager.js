const headers = [
    {
        tag: "h1",
        value: "<b>H1</b>"
    },
    {
        tag: "h2",
        value: "<b>H2</b>"
    },
    {
        tag: "h3",
        value: "<b>H3</b>"
    }
]

const fontStyle = [
    {
        tag: "bold",
        value: "<i class='fas fa-bold'></i>"
    },
    {
        tag: "italic",
        value: "<i class='fas fa-italic'></i>"
    },
    {
        tag: "strikethrough",
        value: "<i class='fas fa-strikethrough'></i>"
    },
    {
        tag: "underline",
        value: "<i class='fas fa-underline'></i>"
    }
]

const alignment = [
    {
        tag: "justifyFull",
        value: '<i class="fas fa-align-justify"></i>'
    },
    {
        tag: "justifyLeft",
        value: '<i class="fas fa-align-left"></i>'
    },
    {
        tag: "justifyRight",
        value: '<i class="fas fa-align-right"></i>'
    },
    {
        tag: "justifyCenter",
        value: '<i class="fas fa-align-center"></i>'
    },
    {
        tag: "insertUnorderedList",
        value: '<i class="fas fa-list-ul"></i>'
    },
    {
        tag: "insertOrderedList",
        value: '<i class="fas fa-list-ol"></i>'
    }
]

const special = [
    {
        tag: "createLink",
        value: '<i class="fas fa-link"></i>'
    },
    {
        tag: "insertImage",
        value: '<i class="far fa-image"></i>'
    }
]

function sortArray (array) {
    return array.sort(function (a, b) {
        return a.tag > b.tag
    })
}

class FormatManager {
    addFormat (tag) {
        for (var item of headers) {
            if (tag == item.tag) {
                return document.execCommand("formatBlock", false, tag)
            }
        }

        for (var item of fontStyle.concat(alignment)) {
            if (tag == item.tag) {
                return document.execCommand(tag, false, null)
            }
        }

        for (var item of special) {
            if (tag == item.tag) {
                var url = ""
                return document.execCommand(tag, false, url)
            }
        }
    }

    getBtns () {
        var formatBtns = []
        formatBtns = formatBtns.concat(sortArray(special))
        formatBtns = formatBtns.concat(sortArray(headers))
        formatBtns = formatBtns.concat(sortArray(alignment))
        formatBtns = formatBtns.concat(sortArray(fontStyle))
        return formatBtns
    }
}

module.exports = FormatManager
