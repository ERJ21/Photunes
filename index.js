'use strict';
const express = require('express');
// file nav easier
const path = require('path');
// parsing req and res
const bodyParser = require('body-parser');
const http = require('http');
const json = require('json')
const puppeteer = require('puppeteer');
var validator = require('validator');
var spawn = require('child_process').spawn;

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
	res.render(__dirname + '/index.html');
});

app.post('/', (req, res) => {
	if(validator.isURL(req.body.url)) {
		//var result = doTheThing(req.body.url, 0)
		//console.log(result)
		//res.json(result);
		doTheThing(req.body.url, 0, res)
	}
});

function doTheThing(url, num, res) {
	console.log(num)
	if(num<5) {
		console.log('spawning child');
		var child = spawn('node', ['puppet.js', url]) 

		child.stdout.on('data', function(data) {
			if(data === undefined) {
				doTheThing(url, num+1, res);
			}
			else {
				console.log('responding to ' + url + ' with ' + data);
				console.log(data.toString());
				res.json(data.toString())
			}
		});
	}
	else {
		res.json('rick roll')
	}
}

app.listen(3000, () => {
  console.log('%s Express server listening on port %d', '✓', 3000);
});