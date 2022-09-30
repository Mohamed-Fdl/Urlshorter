const express = require('express')

const uniqId = require('uniqid')

const router = express.Router()

const { Link, linkValidator } = require('../models/Link')

const clientMessage = require('../utils/clientMessage')


router.post('/short', (req, res) => {
    if (!linkValidator(req.body)) {
        clientMessage(res, 400, false, 'Bad request.You must send uri', null)
        return
    }

    const uri = req.body.uri
    const uuid = uniqId()

    let link = new Link({
        uri,
        uuid
    })

    link.save().then(() => {
            clientMessage(res, 200, true, 'Link successfully created', link)
            return
        })
        .catch((err) => {
            clientMessage(res, 200, false, 'An error occured', err)
            return
        })
})

router.get('/ly/:uuid', async(req, res) => {

    Link.findOne({ uuid: req.params.uuid }).then((link, err) => {
            clientMessage(res, 200, true, `Getting link : ${link.uuid}`, link)
            return
        })
        .catch((err) => {
            clientMessage(res, 200, false, 'An error occured', err)
            return
        })
})


module.exports = router