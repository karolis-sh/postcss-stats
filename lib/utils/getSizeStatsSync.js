const brotliSize = require('brotli-size');
const gzipSize = require('gzip-size');
const prettyBytes = require('pretty-bytes');

const getSize = require('./getSize');

module.exports = (string) => {
  const bytes = getSize(string);
  const gzipBytes = gzipSize.sync(string);
  const brotliBytes = brotliSize.sync(string);

  return {
    bytes,
    readableSize: prettyBytes(bytes),
    gzipBytes,
    gzipReadableSize: prettyBytes(gzipBytes),
    brotliBytes,
    brotliReadableSize: prettyBytes(brotliBytes),
  };
};
