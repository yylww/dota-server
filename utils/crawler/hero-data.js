
const axios = require('axios');
const fs = require('fs');

(async () => {
  const res = await axios.get('https://www.dota2.com/datafeed/herolist?language=schinese')
  const arr = res.data.result.data.heroes
  const data = arr.map((item, index) => {
    const name = item.name.split('hero_')[1]
    return {
      cname: item.name_loc,
      name,
      avatar: `/heroes/${name}.png`
    }
  })
  fs.writeFile('data.json', JSON.stringify(data), () => {
    console.log('success')
  })
})()


