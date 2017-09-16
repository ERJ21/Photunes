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

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
	res.render(__dirname + '/index.html');
});

app.post('/', (req, res) => {
	if(validator.isURL(req.body.url)) {
		console.log(req.body.url)
		getReccomendedText(req.body.url, res)
	}
});

async function getReccomendedText(url, res) { 
	puppeteer.launch({headless: true}).then(async browser => {
	  const page = await browser.newPage();
	  await page.goto("https://www.google.com/imghp");
	  await page.keyboard.down('Shift');
	  for(var i=0; i<2; i++) {
			await page.press('Tab');
		}
		await page.keyboard.up('Shift');
		await page.press('Enter');
		await page.type(url);
		await page.mouse.click(700, 450);

		await page.on('load', async (...args) => {
			const data = await page.evaluate(() => {
	      const tds = Array.from(document.querySelectorAll('._gUb'))
	      return tds.map(td => td.textContent)
	    });
	    res.json(data[0])
			await browser.close();
		})
	})
}

app.listen(3000, () => {
  console.log('%s Express server listening on port %d', '✓', 3000);
});
/*
const browser = await puppeteer.launch({headless: false}); // default is true
const page = await browser.newPage();

function reverseSearch(url) {
	page.goto("https://www.google.com/imghp?sbi=1");
	page.type(url);
	page.press('Enter');
}
_gUb
reverseSearch('https://www.w3schools.com/css/trolltunga.jpg')

function getReccomendedText(url) { 
	(async() => {
	puppeteer.launch({headless: true}).then(async browser => {
	  const page = await browser.newPage();
	  await page.goto("https://www.google.com/imghp");
	  await page.keyboard.down('Shift');
	  for(var i=0; i<2; i++) {
			await page.press('Tab');
		}
		await page.keyboard.up('Shift');
		await page.press('Enter');
		await page.type(url);
		await page.mouse.click(700, 450);

		await page.on('load', async (...args) => {
			const data = await page.evaluate(() => {
	      const tds = Array.from(document.querySelectorAll('._gUb'))
	      return tds.map(td => td.textContent)
	    });
			console.log(data[0]);
			await browser.close();
		})
	});
})();
*/

