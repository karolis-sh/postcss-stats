const chalk = require('chalk');
const cssStatsPlugin = require('cssstats');
const postcss = require('postcss');

const { PLUGIN_NAME, CSSSTATS_PLUGIN_NAME } = require('./constants');
const getSizeStatsSync = require('./utils/getSizeStatsSync');
const getStatsTable = require('./utils/getStatsTable');

const plugin = postcss.plugin(PLUGIN_NAME, () => (root, result) => {
  const { css, messages } = postcss().use(cssStatsPlugin()).process(root);

  const { stats: cssStats } = messages.find(
    (item) => item.plugin === CSSSTATS_PLUGIN_NAME,
  );

  const stats = {
    input: {
      size: getSizeStatsSync(root.source.input.css),
    },
    output: {
      size: getSizeStatsSync(css),
      rules: cssStats.rules.total,
      selectors: cssStats.selectors.total,
      declarations: cssStats.declarations.total,
      uniqueDeclarations: cssStats.declarations.unique,
      mediaQueries: cssStats.mediaQueries.total,
      uniqueMediaQueries: cssStats.mediaQueries.unique,
    },
  };
  getStatsTable()
    .add(
      'size',
      `${chalk.bold(stats.output.size.readableSize)} (from ${
        stats.input.size.readableSize
      })`,
    )
    .add('gzip size', chalk.bold(stats.output.size.gzipReadableSize))
    .add('brotli size', chalk.bold(stats.output.size.brotliReadableSize))
    .add('rules', chalk.bold(stats.output.rules))
    .add('selectors', chalk.bold(stats.output.selectors))
    .add(
      'declarations',
      `${chalk.bold(stats.output.declarations)} (${
        stats.output.uniqueDeclarations
      } unique)`,
    )
    .add(
      'media queries',
      `${chalk.bold(stats.output.mediaQueries)} (${
        stats.output.uniqueMediaQueries
      } unique)`,
    )
    .output({
      before: root.source.input.file
        ? `👉 ${chalk.green(root.source.input.file)}\n`
        : '',
    });

  result.messages.push({ type: PLUGIN_NAME, plugin: PLUGIN_NAME, stats });
});

exports.default = plugin;
module.exports = exports.default;
module.exports.default = exports.default;
