# postcss-stats

A simple 1 dependency PostCSS plugin to print stats to the console.

Uses [cssstats] under the hood.

[![npm version][version-badge]][version]
[![Build Status][build-badge]][build]
[![License: MIT][license-badge]][license]

[![semantic-release][semantic-release-badge]][semantic-release]
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
[build-badge]: https://travis-ci.org/buz-zard/postcss-stats.svg?branch=master
[build]: https://travis-ci.org/buz-zard/postcss-stats
[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[license]: https://opensource.org/licenses/MIT
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release]: https://github.com/semantic-release/semantic-release
[code-style-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[code-style]: https://github.com/prettier/prettier
