'use strict';

var express = require('express'),
    compression = require('compression');

var app = module.exports = express(),
    router = express.Router();

// wyłączenie nagłówka
app.disable('x-powered-by');

// włączenie kompresji transmisji
app.use(compression());

// serwowanie plików statycznych
app.use(express.static(__dirname + '/../www/'));

// analiza parametrów
router.param('controller', function (req, res, next, controller) {

    // TODO: obsługa parametrów
    console.log('par:controller:', controller);

    req.ctrlName = controller;

    next();
});

// obsługa ścieżki do kontrolera
router.all('/:controller', function (req, res, next) {

    // TODO: akcja kontrolera
    console.log('ctl:', req.ctrlName, req.ctlAction);

    next();
});

// cordova.css podczas tworzenia wykonuje akcje onDeviceReady
router.all('/cordova.js', function (req, res, next) {

    res
        .set('Content-Type', 'application/javascript')
        .status(200)
        .end('/*webserver*/setTimeout("var event=new Event(\'deviceready\');document.dispatchEvent(event);",500);');
});

// domyslna ścieżka
router.all(/.*/i, function (req, res, next) {

    // TODO: kod tutaj
    console.log('fallback:404');

    res.status(404).end('404: strona nie istnieje bo nie ma pliku index.html lub nie znaleziono kontrolera.' + (req.ctrlName ? '\r\n[ctl:' + req.ctrlName + ']' : ''));
});

// przekierowanie wszystkich zapytań do routera
app.all(/.*/i, router);
app.all('/', router);

// wystartowanie Webserwera
app.listen(1337, function () {

    console.log('Express Webserver started');
});