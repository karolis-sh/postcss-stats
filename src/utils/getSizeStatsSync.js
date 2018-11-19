import prettyBytes from 'pretty-bytes';
import gzipSize from 'gzip-size';
import brotliSize from 'brotli-size';

import getSize from './getSize';

const getSizeStatsSync = string => {
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

export default getSizeStatsSync;
