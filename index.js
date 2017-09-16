'use strict';

const puppeteer = require('puppeteer');
var url = 'https://www.w3schools.com/css/trolltunga.jpg';

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
*/
})();
