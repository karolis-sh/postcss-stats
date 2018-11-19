import postcss from 'postcss';
import postcssReplace from 'postcss-replace';

import { PLUGIN_NAME } from './constants';
import postcssStats from '.';

describe('postcss-stats', () => {
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
    expect(result.warnings().length).toBe(0);
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

    const messages = result.messages.filter(
      item => item.plugin === PLUGIN_NAME
    );

    const sizeStats = {
      bytes: expect.any(Number),
      readableSize: expect.any(String),
      gzipBytes: expect.any(Number),
      gzipReadableSize: expect.any(String),
      brotliBytes: expect.any(Number),
      brotliReadableSize: expect.any(String),
    };

    expect(messages.length).toBe(1);
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
  });
});
