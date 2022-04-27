var express = require('express')
var bodyParser = require('body-parser');
var expressApp = express()
var emailService = require('./EmailService')
var port = 8188
expressApp.use(bodyParser.json());
expressApp.get('/', (req, res) => res.send('Email Service'))
expressApp.post('/sendemail', (req, res) => emailService.Index(req, res))
expressApp.listen(port, () => console.log('Email Service listening on port: '+port))