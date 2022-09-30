const mongoose = require('mongoose');

const Joi = require('joi');

const uriValidator = require('../utils/uriValidator')

const linkValidator = (link) => {
    const schema = Joi.object({
        uri: Joi.string().min(10).required(),
    })

    let result = schema.validate(link);

    if (!result.error && uriValidator(link.uri)) {
        return true
    }
    return false
}

const { Schema } = mongoose;

const linkSchema = new Schema({
    uri: { type: String, required: true },
    uuid: { type: String, required: true },
    data: Object,
}, { timestamps: true });

const Link = mongoose.model('Link', linkSchema);

module.exports.Link = Link
module.exports.linkValidator = linkValidator