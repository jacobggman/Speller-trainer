const fs = require('fs');
const mongoose = require('mongoose');
const Word = require('./model/Word')

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connect to MongoDB'))
    .catch((err) => console.log(err));

fs.readFile('./words.txt', 'utf8', async function (err, data) {
    if (err) {
        return console.log(err);
    }
    var words = data.split("\n");

    console.log('inserting words into database...');
    for (var i = 0; i < words.length; i++) {
        const word = new Word({
            text: words[i].replace("\r", ""),
            index: i,
        })
        try {
            await word.save();
            console.log(word);
        } catch (error) {

        }

    }
    console.log('DONE');
    process.exit();

});
