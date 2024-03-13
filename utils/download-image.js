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