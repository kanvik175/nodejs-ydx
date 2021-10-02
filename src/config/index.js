const { resolve } = require('path');

const PORT = 8080;
const staticDir = resolve(__dirname, '../../static');
const dbDir = resolve(__dirname, '../../db');
const dbDumpFile = resolve(dbDir, 'dump.json');

module.exports = {
  PORT,
  staticDir,
  dbDir,
  dbDumpFile,
}