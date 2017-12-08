# HiQ
A simple CSS foundation with responsive typography and input styling, built with [PostCSS](https://github.com/postcss/postcss).

View the [documentation](https://jonathanharrell.github.io/hiq/).

In the age of Flexbox, CSS grid, and other exciting layout features, there is less and less need for a bloated CSS framework. What we do need is a simple foundation on top of which to build our own styles. Enter HiQ.

## Install

Start using HiQ by using npm to install the package or use the Github repository to get the latest development version.

```bash
npm install hiq
```

## Usage

### Basic

If you have your own PostCSS setup, you can import the source css file directly:

Import the compiled minified version in your CSS

```css
@import 'node_modules/hiq/dist/hiq.min.css';
```

### Advanced

Import the source version and process your CSS using PostCSS. This will give you access to the utility mixins that HiQ provides. Note that source files use the `.pcss` file extension.

```css
@import 'node_modules/hiq/pcss/hiq.pcss';
```

In order to compile the HiQ source files correctly, several PostCSS plugins are required. To install them run this command:

```bash
npm install --save-dev postcss-easy-import postcss-mixins postcss-custom-selectors postcss-nesting autoprefixer postcss-custom-media postcss-discard-comments
```

Setup your postcss configuration (`postcss.config.js`) like this (order matters):

```js
module.exports = {
    plugins: [
        require('postcss-easy-import')({ extensions: '.pcss' }),
        require('postcss-mixins'),
        require('postcss-custom-selectors'),
        require('postcss-nesting'),
        require('autoprefixer'),
        require('postcss-custom-media'),
        require('postcss-discard-comments') // optional
    ]
}
```

For more information on using PostCSS read the [PostCSS documentation](https://github.com/postcss/postcss#usage) usage section.

## Theming

HiQ is built with custom properties and is easy to theme according to your own brand. Refer to the [custom property reference](/docs/reference/custom-properties), grab the properties you want to change, and include them in your project.

These can be included anywhere, before or after HiQ!

```css
@import 'node_modules/hiq/dist/hiq.min.css';

:root {
  --hiq-button-border-color: lightgray;
  --hiq-button-background-color: lightgray;
  --hiq-button-text-color: black;
}
```

If you want your custom property definitions to apply globally, you should define them on the root element using `:root`. Otherwise, you can scope them to whatever element you wish.

For example, if you are creating a button variant, you could define the custom properties on a specific class:

```css
button.is-primary {
  --hiq-button-border-color: blue;
  --hiq-button-background-color: blue;
  --hiq-button-text-color: white;
}
```

## v1

Looking for the old docs? Check out the v1 documentation [here](https://hiq.jonathan-harrell.com/).

