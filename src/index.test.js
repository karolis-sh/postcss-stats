import postcss from 'postcss';

import postcssStats from '.';

const SIMPLE_CSS = `
.foo {
  color: tomato;
}

.bar .baz {
  color: hotpink;
}
`;

describe('postcss-stats', () => {
  it('should not modify the output', async () => {
    const result = await postcss()
      .use(postcssStats())
      .process(SIMPLE_CSS, { from: undefined });

    expect(result.css).toEqual(SIMPLE_CSS);
  });
});
