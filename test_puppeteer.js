const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  await page.goto('http://localhost:5173/dashboard');
  await page.waitForTimeout(2000);
  
  // click widget to open
  await page.click('button.fixed.bottom-6');
  await page.waitForTimeout(1000);
  
  // click new chat if home page
  const newChatBtn = await page.$('text/Start New Chat');
  if (newChatBtn) await newChatBtn.click();
  await page.waitForTimeout(1000);

  // click AI developer
  const devBtn = await page.$('text/AI Developer');
  if (devBtn) {
    console.log("Found AI Developer button, clicking...");
    await devBtn.click();
  } else {
    console.log("Could not find AI Developer button");
  }
  
  await page.waitForTimeout(2000);
  await browser.close();
})();
