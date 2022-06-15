const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqid = require('uniqid')
var path = require('path')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname + '/public')))

app.use('/jquery', express.static(path.join(__dirname + '/node_modules/jquery/dist/')))

mongoose.connect('mongodb://localhost/urlshorter').
then(function() {
    console.log('Connected to MongoDb')
}).catch(function(err) {
    console.log(err)
})


const UrlShorterSchema = new Schema({
    url_id: { type: String, required: true },
    url: { type: String, required: true }
});

const UrlShorter = mongoose.model('UrlShorter', UrlShorterSchema)


app.post('/short', async function(req, res) {
    console.log(req.body.url)
    var urlshort = new UrlShorter({
        url_id: uniqid.process(),
        url: req.body.url
    })
    await urlshort.save()
    res.json({
        urlShorter: urlshort,
        success: true,
        message: 'Operation done successfully!!'
    })
})

app.get('/ly/:id', async function(req, res) {
    console.log(req.params.id);
    const urlshort = await UrlShorter.find({ url_id: req.params.id })
    console.log(urlshort[0].url);
    res.status(200).redirect(`${urlshort[0].url}`)
})

app.listen(3000)

async function insertParameter() {
    const param = new UrlParameter({ id: 1 })
    await param.save()
    console.log('bien enregistré');
}

async function getParameter() {
    const param = await UrlParameter.findOne({ name: 'Parameter' })
    return param.id
}

async function incrementParameter(currentParam) {
    currentParam++
    await UrlParameter.updateOne({ name: 'Parameter' }, { id: currentParam })
    console.log('Bien modifié');
}


//insertParameter()
//getParameter()
//incrementParameter(3)

/*
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
*/