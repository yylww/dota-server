const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.dota2.com/heroes');

  // Wait for SPA content to load (you may need to adjust this)
  await page.waitForSelector('.herogridpage_GridList_3LrTP');

  // 获取网页的HTML内容
  const html = await page.content();
  // 使用cheerio加载HTML内容，并提取数据
  const $ = cheerio.load(html);
  const arr = []
  $('.herogridpage_HeroIcon_7szOn').each((i, ele) => {
    const imgUrl = $(ele).css('background-image').split('"')[1];
    arr[i] = imgUrl
  })
  await browser.close();
  for (const url of arr) {
    await downloadImage(url);
  }
})()

async function downloadImage(url) {
  const imageName = url.split('heroes/')[1];
  const response = await axios.get(url, { responseType: 'stream' });
  const writer = fs.createWriteStream(`./statics/heroes/${imageName}`);
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      resolve();
      console.log(`${imageName} finished.`)
    });
    writer.on('error', (error) => {
      reject();
      console.log(`${imageName} error: ${error.message}`);
    });
  })
}
