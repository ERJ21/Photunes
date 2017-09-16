const puppeteer = require('puppeteer');
  var code = Number(process.argv[2]);

async function getReccomendedText(url) { 
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
			await browser.close();
			console.log(data[0])
			process.exit()
		})
	})
}

getReccomendedText(process.argv[2])