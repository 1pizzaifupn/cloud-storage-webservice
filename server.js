require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080;
const fileupload = require('express-fileupload');
const StorageService = require('./StorageService');

app.use(fileupload());
app.use(express.json());


app.post('/', async (req, res) => {
  const storageService = new StorageService();

  if (!req.files || !req.files.file) {
    return res.status(400).send({ message: "File is empty. Please upload a file!" });
  }
  
  const file = req.files.file;

  const fileName = await storageService.writeFile(file);
  res.json({ 
     status: 'success',
        message: 'Gambar berhasil diunggah',
        data: {
          pictureUrl: `https://storage.googleapis.com/gs-app/${fileName}`,
        },
   });
})

app.get('/', async (req, res) => {
  const storageService = new StorageService();
  const files = await storageService.listFiles();

  const fileNameUrl = files.map((file) => {
    return `https://storage.googleapis.com/gs-app/${file}`;
  });

  res.json({
    status: 'success',
    message: 'Daftar gambar berhasil didapatkan',
    data: {
      fileNameUrl,
    },
  });
});

app.delete('/', async (req, res) => {
  const storageService = new StorageService();
  console.log()
  const { fileName } = req.body;

  if (!fileName) {
    return res.status(400).send({ message: "File name is empty. Please provide a file name!" });
  }

  try {
  await storageService.deleteFile(fileName);
  } catch (error) {
    return res.status(404).send({ message: "File not found!" });
  }
  
  res.json({
    status: 'success',
    message: 'Gambar berhasil dihapus',
  });
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})