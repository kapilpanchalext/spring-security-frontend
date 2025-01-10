import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
  headless: false,
  // defaultViewport: {
  //   width: 1920,
  //   height: 1080
  // },
  devtools: true,
});
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto('http://localhost:3000');

// Set screen size.
await page.setViewport({width: 1080, height: 1024});


// await browser.close();