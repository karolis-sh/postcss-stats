# postcss-stats

A simple 1 dependency PostCSS plugin to print stats to the console.

Uses [cssstats] under the hood.

[![npm version][version-badge]][version]
[![License: MIT][license-badge]][license]

[![code style: prettier][code-style-badge]][code-style]

## Installation

> npm install postcss-stats

## Usage

Just add the `postcss-stats` plugin:

```javascript
postcss()
  .use(postcssStats())
  .process(css);
```

And it will output the stats table to the console:

![sample output][sample-output]

## References

- <https://cssstats.com/>

## License

MIT

[sample-output]: /docs/sample-output.png
[cssstats]: https://github.com/cssstats/core
[version-badge]: https://badge.fury.io/js/postcss-stats.svg
[version]: https://www.npmjs.com/package/postcss-stats
[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[license]: https://opensource.org/licenses/MIT
[code-style-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[code-style]: https://github.com/prettier/prettier
