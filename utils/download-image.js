export const downloadImage = async (url, dest, name) => {
  const response = await axios.get(url, { responseType: 'stream' });
  const writer = fs.createWriteStream(`./statics/${dest}/${name}.png`);
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      resolve();
      console.log(`${name} finished.`)
    });
    writer.on('error', (error) => {
      reject();
      console.log(`${name} error: ${error.message}`);
    });
  })
}
