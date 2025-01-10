import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
  headless: false, 
  devtools: true,
  env:'dev'
});
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto('https://google.com/');

// Set screen size.
await page.setViewport({width: 1080, height: 1024});

// Type into search box.
// await page.locator('.devsite-search-field').fill('automate beyond recorder');

// Wait and click on first result.
// await page.locator('.devsite-result-item-link').click();

// Locate the full title with a unique string.
// const textSelector = await page
//   .locator('text/Customize and automate')
//   .waitHandle();
// const fullTitle = await textSelector?.evaluate(el => el.textContent);

// Print the full title.
// console.log('The title of this blog post is "%s".', fullTitle);


// const images = await page.$$eval('img', elements => elements.map((element) => {
//   src: element.src;
//   alt: element.alt;
// }));

// const links = await page.$$eval('a', elements => elements.map((element) => {
//   src: element.href;
//   alt: element.textContent;
// }));

// const imageCount = images.length;
// const linkCount = links.length;

// console.log(imageCount);
// console.log(linkCount);


await page.setRequestInterception(true);
page.on('request', interceptedRequest => {
  const url = interceptedRequest.url();
  if (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg')) {
    interceptedRequest.abort();
    console.log('Request Aborted: ', url);
  } else {
    interceptedRequest.continue();
    console.log('Request Continue');
    console.dir(JSON.stringify(interceptedRequest));
    console.log(interceptedRequest.headers({secretKey: 'secretValue'}));
  }
});


// await browser.close();

// const puppeteer = require('puppeteer');
// (async () => {

//   try {
//     const browser = await puppeteer.launch({
//       headless: false,
//       defaultViewport: {
//         width: 1920,
//         height: 1080
//       }
//     });
//     const page = await browser.newPage();
//     await page.goto('https://google.com/');
//     // await browser.close();
//   } catch (error) {
//     console.dir(error);
//   }
// });

// const puppeteer = require('puppeteer');

// async function run(){
//   try {
//     // Launch the browser and open a new blank page
// const browser = await puppeteer.launch({
//   headless: false, 
//   devtools: true,
//   env:'dev'
// });
// const page = await browser.newPage();

// // Navigate the page to a URL.
// await page.goto('https://google.com/');

// // const title = await page.title();
// // console.log('The title is "%s".', title);

// // const heading = await page.$eval('li', element => element.textContent);
// // console.log('The heading is "%s".', heading);

// // Set screen size.
// await page.setViewport({width: 1080, height: 1024});

// // Type into search box.
// await page.locator('.devsite-search-field').fill('automate beyond recorder');

// // Wait and click on first result.
// await page.locator('.devsite-result-item-link').click();

// // Locate the full title with a unique string.
// const textSelector = await page
//   .locator('text/Customize and automate')
//   .waitHandle();
// const fullTitle = await textSelector?.evaluate(el => el.textContent);

// // Print the full title.
// console.log('The title of this blog post is "%s".', fullTitle);


// const images = await page.$$eval('img', elements => elements.map((element) => {
//   src: element.src;
//   alt: element.alt;
// }));
// console.dir(images);

// const links = await page.$$eval('a', elements => elements.map((element) => {
//   src: element.href;
//   alt: element.textContent;
// }));
// console.dir(links);

// const imageCount = images.length;
// const linkCount = links.length;

// console.log(imageCount);
// console.log(linkCount);

// await browser.close();
//   } catch (error) {
//     console.dir(error);
//   }
// }

// run();