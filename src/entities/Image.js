const { unlink } = require('fs/promises');
const { join } = require('path');
const { staticDir } = require('../config');

class Image {
  constructor(id, uploadedAt, size) {
    this.id = id;
    this.uploadedAt = uploadedAt;
    this.size = size;
  }

  getFilePathname() {
    return join(staticDir, `${this.id}.jpg`);
  }

  async removeFile() {
    try {
      const filePathname = this.getFilePathname();
      await unlink(filePathname);
    } catch (e) {
      console.log(e.message);
    }
  }

  toJSON() {
    return {
      id: this.id,
      uploadedAt: this.uploadedAt,
      size: this.size,
    }
  }
}

module.exports = Image;