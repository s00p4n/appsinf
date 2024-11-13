var express = require('express');
var app = express ();
const bodyParser = require('body-parser');
const { DB, connectDB } = require('./server')
app.listen(8080);
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();
console.log('http://localhost:8080/');


app.get('/', async (req, res) => {
    const item = await DB.find();
    res.render('principale',{item});
});

app.get('/principale/signaler/', (req, res) => {
    res.render('signaler');});

app.get('/principale/login/', (req, res) => {
    res.render('login');});

app.post('/add', async (req, res) => {
    try {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
        const year = currentDate.getFullYear();
        const out = `${day}/${month}/${year}`;

        const incident = new DB({
            Adresse: req.body.adresse,
            Description: req.body.description,
            Date: out
        });
        await incident.save();
        const item = await DB.find();
        res.render('principale', {item});
    } catch (err) {
        console.error('PAS OK', err);
        res.status(500).render('principale', { item});
    }
});
