const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://liquipedia.net/dota2/Portal:Teams');

  // Wait for SPA content to load (you may need to adjust this)
  await page.waitForSelector('.lp-container-fluid');

  // 获取网页的HTML内容
  const html = await page.content();
  // 使用cheerio加载HTML内容，并提取数据
  const $ = cheerio.load(html);
  const data = [];
  $('.lp-container-fluid').first().find('.team-template-team-standard').each((i, ele) => {
    const name = $(ele).find('.team-template-text').text();
    const img = $(ele).find('.team-template-image-icon').find('img').attr('src');
    data[i] = {
      name: name.split(' ').join('_'),
      logo: `https://liquipedia.net${img}`,
      players: [],
    };
  });
  for (const item of data) {
    await page.goto(`https://liquipedia.net/dota2/${item.name}`);

    // Wait for SPA content to load (you may need to adjust this)
    await page.waitForSelector('.main-content');

    // 获取网页的HTML内容
    const html = await page.content();
    // 使用cheerio加载HTML内容，并提取数据
    const $ = cheerio.load(html);
    const players = []
    $('.roster-card').first().find('.Player').each((i, ele) => {
      const id = $(ele).find('.ID').find('a').text()
      const name = $(ele).find('.Name').text().split('(')[1].split(')')[0]
      const position = $(ele).find('.Position').text().split('Position:')[1].trimStart()
      players[i] = { id, name, position }
    })
    item.players = players
  }
  // console.log(data)
  fs.writeFile('data.json', JSON.stringify(data), () => {
    console.log('success')
  })
  await browser.close();
})()

async function downloadImage(url, name) {
  const imageName = `${name}.png`;
  const response = await axios.get(url, { responseType: 'stream' });
  const writer = fs.createWriteStream(`./statics/teams/${imageName}`);
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
