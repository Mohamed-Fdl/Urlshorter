require('dotenv').config()

const mongoose = require('mongoose');

async function main() {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = () => {
    main().then(() => {
        console.log('Connected to database')
    }).catch(err => console.log(err));
}