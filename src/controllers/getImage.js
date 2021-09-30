module.exports = (req) => {
  const { id } = req.params;
  console.log(`get image by id ${id}`);
}