# HiQ
A simple CSS foundation with responsive typography and input styling, built with [PostCSS](https://github.com/postcss/postcss) and [cssnext](http://cssnext.io/).

View the [documentation](https://hiq.jonathan-harrell.com/).

Use the [theme builder](https://hiq.jonathan-harrell.com/theme-builder/structure).

<img src="https://raw.githubusercontent.com/jonathanharrell/hiq/master/hiq.png" alt="HiQ" width="250" height="250" />

In the age of Flexbox, CSS grid, and other exciting layout features, there is less and less need for a bloated CSS framework. What we do need is a simple foundation on top of which to build our own styles. Enter HiQ.

## Install

```sh
npm install hiq
```

Or download/clone the repo.

## Usage

### Recommended

If you have your own PostCSS setup, you can import the source css file directly:

```css
@import 'node_modules/hiq/css/hiq.pcss';
```

Note that in this case, you will need to configure your `postcss.config.js` file to include the following plugins:

```js
module.exports = {
    plugins: [
        require('postcss-easy-import')({extensions: '.pcss'}),
        require('postcss-mixins'),
        require('postcss-cssnext')
    ]
}
```

### Alternatives

You can use the full or minified versions as links, or CSS imports:

```html
<link rel="stylesheet" href="hiq.css">
<link rel="stylesheet" href="hiq.min.css">
```
```css
@import 'node_modules/hiq/dist/hiq.css';
@import 'node_modules/hiq/dist/hiq.min.css';
```

