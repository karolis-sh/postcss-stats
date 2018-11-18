const getSize = string =>
  string != null ? Buffer.byteLength(string, 'utf8') : 0;

export default getSize;
