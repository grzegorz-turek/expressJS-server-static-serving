var express = require('express');
//var bodyParser = require('body-parser'); // DZIAŁA BEZ TEGO
var fs = require('fs');
var app = express();
var stringifyFile;

//app.use(bodyParser.json()); // DZIAŁA BEZ TEGO
app.use(express.static('assets'));

app.get('/', function(req, res) {
    console.log('Hello world in console');
    res.sendFile('/index.html'); 
})

app.get('/userform', function(req, res) {
    const response = {
        first_n: req.query.first_name,
        last_n: req.query.last_name
    }
    //res.json(response);
    res.send(response); //TO TEŻ DZIAŁA, A JEST STANDARDOWE
})

app.get('/getNote', function(req, res) {
    fs.readFile('./test.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

app.get('/updateNote/:note', function(req, res) {
    fs.readFile('./test.json', 'utf-8', (err, data) => {
        if (err) throw err;
        stringifyFile = data;
        stringifyFile = stringifyFile + req.params.note;
        fs.writeFile('./test.json', stringifyFile, (err) => {
            if (err) throw err;
            res.send(stringifyFile);
        });
    });
});

var server = app.listen(3000, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Aplikacja nasłuchuje na http://' + host + ':' + port);
});

app.use(function (req, res, next) {
    res.status(404).send('Fatal Error! Nosing found');
    if (res.statusCode === 404) {
        console.log('Server requested for nonexistant resources');
    }
});