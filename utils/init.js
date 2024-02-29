const fs = require('fs');

const result = fs.readFileSync('data.json', 'utf-8')
const data = JSON.parse(result)
data.map((item, i) => {
  item.logo = `/teams/${item.name.split(' ').join('_')}.png`
  return item
})

fs.writeFile('data.json', JSON.stringify(data), () => {
  console.log('success');
})