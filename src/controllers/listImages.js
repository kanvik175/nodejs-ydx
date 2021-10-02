const db = require('../entities/Database');

module.exports = (req, res) => {
  res.json(db.getList());
}