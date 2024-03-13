const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
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
    let regionId = 0;
    if (i < 6) {
      regionId = 1
    } else if (i < 15) {
      regionId = 2
    } else if (i < 23) {
      regionId = 3
    } else if (i < 36) {
      regionId = 4
    } else if (i < 43) {
      regionId = 5
    } else if (i < 53) {
      regionId = 6
    } else if (i < 57) {
      regionId = 7
    }
    data[i] = {
      name,
      logo: `/teams/${name.split(' ').join('_')}.png`,
      regionId, 
      players: [],
    };
  });
  for (const item of data) {
    await page.goto(`https://liquipedia.net/dota2/${item.name.split(' ').join('_')}`);

    // Wait for SPA content to load (you may need to adjust this)
    await page.waitForSelector('.main-content');

    // 获取网页的HTML内容
    const html = await page.content();
    // 使用cheerio加载HTML内容，并提取数据
    const $ = cheerio.load(html);
    const players = []
    $('.roster-card').first().find('.Player').each((i, ele) => {
      const nickname = $(ele).find('.ID').find('a').text()
      const name = $(ele).find('.Name').text().split('(')[1].split(')')[0]
      const position = $(ele).find('.Position').text().split('Position:')[1].trimStart()
      players[i] = { nickname, name, position }
    })
    item.players = players
  }
  // console.log(data)
  fs.writeFile('data.json', JSON.stringify(data), () => {
    console.log('success')
  })
  await browser.close();
})()
