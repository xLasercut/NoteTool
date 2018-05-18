class FormatManager {
    constructor () {
        this.headers = ["h1", "h2", "h3"]
        this.fontStyle = ["bold", "italic", "strikethrough", "underline", "justifyCenter", "justifyFull", "justifyLeft", "justifyRight"]
    }

    addFormat (tag) {
        if (this.headers.indexOf(tag) > -1) {
            document.execCommand("formatBlock", false, tag)
        }

        if (this.fontStyle.indexOf(tag) > -1) {
            document.execCommand(tag, false, null)
        }
    }

    getBtns () {
        var formatBtns = []
        formatBtns = formatBtns.concat(this.headers)
        formatBtns = formatBtns.concat(this.fontStyle)
        formatBtns = formatBtns.sort(function (a, b) {
            return a > b
        })
        return formatBtns
    }
}

module.exports = FormatManager
