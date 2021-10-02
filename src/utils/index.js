exports.prettyJsonToString = (json) => {
  const res = JSON.stringify(json, null, '\t');
  console.log(res);
  return res;
}