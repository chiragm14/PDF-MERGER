const express = require('express');
const path = require('path');
const multer = require('multer');
const { mergePdfs } = require('./merge');

const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/' });

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).send('Please upload two PDF files.');
    }

    const file1Path = path.join(__dirname, req.files[0].path);
    const file2Path = path.join(__dirname, req.files[1].path);

    const resultFileName = await mergePdfs(file1Path, file2Path);

    res.redirect(`/static/${resultFileName}.pdf`);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});









// const express = require('express')
// // import express from 'express';

// const path = require('path')
// const app = express()
// const port = 3000

// const {mergePdfs} = require('./merge')

// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

// app.use('/static', express.static('public'))

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname,"templates/index.html"))
// })

// app.post('/merge', upload.array('pdfs', 2), async(req, res, next)=> {
//     console.log(req.files)

//     d = await mergePdfs(path.join(__dirname, req.files[0].path),path.join(__dirname, req.files[1].path))

//     res.redirect(`http://localhost:3000/static/${d}.pdf`)

//    //res.send({data:req.files})
//     // req.body will contain the text fields, if there were any
//   })

// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`)
// })