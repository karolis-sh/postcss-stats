import postcss from 'postcss';

const stats = postcss.plugin('postcss-stats', () => () => {
  // Do stuff
});

export default stats;
