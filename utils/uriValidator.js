const uriValidator = (uri) => {
    var expression = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
    var regex = new RegExp(expression);
    if (uri.match(regex)) {
        return true
    } else {
        return false
    }
}

module.exports = uriValidator