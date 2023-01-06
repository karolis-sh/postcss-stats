const path = require('path');

const postcssCssnano = require('cssnano');
const fse = require('fs-extra');
const postcss = require('postcss');
const postcssReplace = require('postcss-replace');

const postcssStats = require('.');
const { PLUGIN_NAME } = require('./constants');

const expectResult = (result) => {
  expect(result.warnings()).toHaveLength(0);
  const messages = result.messages.filter(
    (item) => item.plugin === PLUGIN_NAME,
  );

  const sizeStats = {
    bytes: expect.any(Number),
    readableSize: expect.any(String),
    gzipBytes: expect.any(Number),
    gzipReadableSize: expect.any(String),
    brotliBytes: expect.any(Number),
    brotliReadableSize: expect.any(String),
  };

  expect(messages).toHaveLength(1);
  expect(messages[0].stats).toEqual({
    input: {
      size: sizeStats,
    },
    output: {
      size: sizeStats,
      rules: expect.any(Number),
      selectors: expect.any(Number),
      declarations: expect.any(Number),
      uniqueDeclarations: expect.any(Number),
      mediaQueries: expect.any(Number),
      uniqueMediaQueries: expect.any(Number),
    },
  });
};

it('should not modify the output', async () => {
  const CSS_INPUT = `
    .foo {
      color: tomato;
    }

    .bar .baz {
      color: hotpink;
    }
    `;

  const result = await postcss()
    .use(postcssStats())
    .process(CSS_INPUT, { from: undefined });
  expect(result.css).toEqual(CSS_INPUT);
  expectResult(result);
});

it('should return a stats object', async () => {
  const CSS_INPUT = `
    .foo {
      content: "{{ author }}";
    }
    `;

  const result = await postcss()
    .use(postcssReplace({ data: { author: 'Me' } }))
    .use(postcssStats())
    .process(CSS_INPUT, { from: undefined });

  expect(result.css).not.toEqual(CSS_INPUT);
  expectResult(result);
});

// eslint-disable-next-line jest/expect-expect
it('should analyze normalize.css', async () => {
  const CSS_INPUT = (
    await fse.readFile(
      path.resolve(__dirname, './__tests__/data/normalize.css'),
    )
  ).toString();
  const result = await postcss()
    .use(postcssCssnano({ preset: 'default' }))
    .use(postcssStats())
    .process(CSS_INPUT, { from: undefined });
  expectResult(result);
});
