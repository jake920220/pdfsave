const express = require('express');
const router = express.Router();
const pdfModule = require('../functions/toPdf');

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log("qt");
  pdfModule.htmlToPdf.test();
  console.log(pdfModule.htmlToPdf);
  // res.render('index', { title: 'Express' });
});

router.get('/test/:fileName', async (req, res, next) => {
  const fileName = req.params.fileName;
  await pdfModule.htmlToPdf.createPdf(fileName);
  res.send("done");
});

module.exports = router;