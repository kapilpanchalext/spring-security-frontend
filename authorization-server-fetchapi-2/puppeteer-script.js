// import puppeteer from 'puppeteer';
// // Or import puppeteer from 'puppeteer-core';

// // Launch the browser and open a new blank page
// const browser = await puppeteer.launch({
//   headless: false,
//   // defaultViewport: {
//   //   width: 1920,
//   //   height: 1080
//   // },
//   devtools: true,
// });
// const page = await browser.newPage();

// // Navigate the page to a URL.
// await page.goto('http://localhost:3000');

// // Set screen size.
// await page.setViewport({width: 1080, height: 1024});

// await browser.close();

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    args: [
      // '--disable-extensions-except=./extension/',
      // '--load-extension=./extension/',
    ]
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', {waitUntil: 'networkidle0'});

  await page.evaluate(()=>{
    const rootElement = document.querySelector('#root').childNodes[0];
    __REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent.selectNode(rootElement);
  })

  await page.waitFor(1000);

  const data = await page.evaluate(()=>{
    return $r;
  })

  console.log(data)
})();