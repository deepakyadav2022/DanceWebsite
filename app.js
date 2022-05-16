// INCLUDE MODULES
const express = require('express'); const app = express();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contact-dance');
}

//DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('contact', contactSchema);

// CREATE PORT NO.
const port = 80;

// EXPRESS SPECIFIC CONFIGURATION
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// PUG SPECIFIC CONFIGURATION
app.set('view engine', 'pug'); // set the template engine as pug
app.set('views', path.join(__dirname, 'templates')); // set the view directory

// PUG ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send(`This item has been saved to the database`);
    }).catch(()=>{
        res.status(400).send(`This item was not saved to the database`);
    });
});

// Listening to Server
app.listen(port, ()=>{
    console.log(`This application started successfully on port: ${port}`);
});