module.exports = (string) =>
  string != null ? Buffer.byteLength(string, 'utf8') : 0;
