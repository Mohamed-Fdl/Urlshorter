module.exports = (res, statusCode, statusBoll, message, data) => {
    res.status(statusCode).send({
        error: statusBoll,
        message,
        data
    })
}