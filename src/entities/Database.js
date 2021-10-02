const { EventEmitter } = require('events');
const { existsSync } = require('fs');
const { writeFile } = require('fs/promises');
const { dbDumpFile } = require('../config');
const Image = require('../entities/Image');
const { prettyJsonToString } = require('../utils');

class Database extends EventEmitter {
  constructor() {
    super();

    this.list = {};
  }

  async init() {
    if (!existsSync(dbDumpFile)) {
      return false;
    }

    const dump = require(dbDumpFile);

    if (typeof dump === 'object') {
      this.list = {};

      for (let id in dump) {
        const { size, uploadedAt } = dump[id];

        this.list[id] = new Image(id, uploadedAt, size);
      }
    }
  }

  insert(image) {
    this.list[image.id] = image;

    this.emit('changed');
  }

  remove(id) {
    const image = this.list[id];

    if (!image) {
      return false;
    }

    delete this.list[id];
    image.removeFile();
    this.emit('changed');

    return true;
  }

  findOne(id) {
    return this.list[id];
  }

  getList() {
    return Object.values(this.list);
  }

  toJSON() {
    return this.list;
  }
}

const db = new Database();

db.init();

db.on('changed', async () => {
  try {
    await writeFile(dbDumpFile, prettyJsonToString(db))
  } catch(e) {
    console.log(e.message);
  }
})

module.exports = db;