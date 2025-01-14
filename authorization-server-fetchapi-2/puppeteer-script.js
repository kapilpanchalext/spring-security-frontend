import puppeteer from 'puppeteer';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: {
    width: 1920,
    height: 1080
  },
  devtools: true,
  args: ['--remote-debugging-port=9222'],
  dumpio: true,
  slowMo: 500
});
const page = await browser.newPage();

// Navigate the page to a URL.
// await page.goto('http://localhost:3000');
page.on('console', msg => console.log('PAGE LOG:', msg.text()));
await page.evaluate(() => {
  debugger;
  window.addEventListener("beforeunload", () => {
    console.log("Navigating to: ", window.location.href);
  });
  window.location.href = "http://localhost:3000";
});

// Set screen size.
await page.setViewport({width: 1920, height: 1080});

// await browser.close();