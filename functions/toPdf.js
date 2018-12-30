const fs = require('fs');
const path = require('path');
const util = require('util');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const readFile = util.promisify(fs.readFile);


const obj = {
  templateHtml: async(fileName, reqData) => {
    try {
      const data = reqData;

      const templatePath = path.resolve('public', 'htmls', `${fileName}.html`);
      const content = await readFile(templatePath, 'utf8');

      const template = handlebars.compile(content);

      return template(data);
    } catch (error) {
      throw new Error('Cannot create HTML template.');
    }
  },

  createPdf: async(fileName, data) => {
    const html = await this.htmlToPdf.templateHtml(fileName, data);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);

    await page.pdf({path: path.resolve('public', 'pdfs', `${fileName}.pdf`), format:'A4'});
    return browser.close();
  }
};

module.exports.htmlToPdf = obj;