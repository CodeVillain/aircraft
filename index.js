const XLSX = require('xlsx');
const fs = require('fs');

const inputDir = './input';
const outputDir = './output';

const excels = fs.readdirSync(inputDir).map(file => ({ filename: file, content: XLSX.readFile(`${inputDir}/${file}`) }));

excels.forEach(excel => {
  const data = XLSX.utils.sheet_to_json(excel.content.Sheets[excel.content.SheetNames[0]]);

  const stream = fs.createWriteStream(`${outputDir}/${excel.filename.replace('xlsx', 'txt')}`);

  stream.once('open', () => {
    data.forEach(row => {
      stream.write(`A is ${row.a}; B is ${row.b}; C is ${row.c}\n`);
    });

    stream.end();
  });
});
