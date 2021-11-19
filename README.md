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

Import the compiled minified version in your CSS:

```css
@import '~hiq/dist/hiq.min.css';
```

### Advanced

Import the source version and process your CSS using PostCSS. This will give you access to the utility mixins that HiQ provides. Note that source files use the `.css` file extension.

```css
@import '~hiq/css/hiq.css';
```

To take full advantage of the PostCSS features in HiQ, you will need to configure your `postcss.config.js` to include these plugins (already installed with HiQ):

```js
module.exports = {
    plugins: [
        require('postcss-mixins'),
        require('postcss-custom-selectors'),
        require('postcss-custom-media')
    ]
};
```

For more information on using PostCSS, read the [PostCSS documentation](https://github.com/postcss/postcss#usage) usage section.

## Theming

HiQ is built with custom properties and is easy to theme according to your own brand. Refer to the [custom property reference](https://jonathanharrell.github.io/hiq/reference/custom-properties/), grab the properties you want to change, and include them in your project.

These can be included anywhere, before or after HiQ!

```css
@import '~hiq/dist/hiq.min.css';

:root {
  --hiq-button-border-color: lightgray;
  --hiq-button-background-color: lightgray;
  --hiq-button-text-color: black;
}
```

If you want your custom property definitions to apply globally, you should define them on the root element using `:root`. Otherwise, you can scope them to whatever element you wish.

For example, if you are creating a button variant, you could define the locally scoped custom properties on a specific class:

```css
button.is-primary {
  --button-border-color: blue;
  --button-background-color: blue;
  --button-text-color: white;
}
```
