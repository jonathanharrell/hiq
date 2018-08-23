# Getting Started

## Installation

Start using HiQ by using npm to install the package or use the Github repository to get the latest development version.

``` bash
yarn add hiq # OR npm install hiq
```

## Usage

There are a few different ways you can include HiQ in your project.

### Basic

Import the compiled minified version in your CSS:

```css
@import 'node_modules/hiq/dist/hiq.min.css';
```

### Advanced

Import the source version and process your CSS using PostCSS. This will give you access to the utility mixins that HiQ provides. Note that source files use the `.pcss` file extension.

```css
@import 'node_modules/hiq/pcss/hiq.pcss';
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

You may also want to include the following optional plugins (also installed with HiQ):

```js
require('postcss-easy-import')({ extensions: '.pcss' }),
require('postcss-nested'),
require('autoprefixer'),
require('postcss-discard-comments')
```

For more information on using PostCSS read the [PostCSS documentation](https://github.com/postcss/postcss#usage) usage section.

## Individual Files

Any of the HiQ CSS files can be imported independently. For example, if you want only the button styles, import the buttons file, after the basic utility files:

```css
@import 'node_modules/hiq/pcss/utility/*.pcss';
@import 'node_modules/hiq/pcss/elements/buttons.pcss';
```

If you go with this approach, we recommend importing at least the base styles first and then including additional files after that. The base files will give you the typographic scale and basic structural styles. This is not required, however.

```css
@import 'node_modules/hiq/pcss/utility/*.pcss';
@import 'node_modules/hiq/pcss/base/*.pcss';
@import 'node_modules/hiq/pcss/typography/*.pcss';

@import 'node_modules/hiq/pcss/base/buttons.pcss';
```

## Theming


HiQ is built with custom properties and is easy to theme according to your own brand. Refer to the [custom property reference](/reference/), grab the properties you want to change, and include them in your project.

These can be included anywhere, before or after HiQ!

```css
@import 'node_modules/hiq/dist/hiq.min.css';

:root {
  --hiq-button-border-color: lightgray;
  --hiq-button-background-color: lightgray;
  --hiq-button-text-color: black;
}
```

Ideally, you would include your custom properties within a `variables.css` file.

```css{4}
@import 'node_modules/hiq/dist/hiq.min.css';

/* your own custom property definitions */
@import 'variables.css';
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

You can also redefine custom properties within media queries:

```css
@media (min-width: 800px) {
  --hiq-container-horizontal-gap: 3rem;
}
```

### Custom Property Fallback Chain

HiQ is designed in such a way that elements will use the most specific custom property that you have defined, and fallback to more generic properties, until finally falling back to a static value.

Take this button as an example:

```css
button {
  background-color:
    /* use the button background color variable, if defined */
    var(--hiq-button-background-color,
      /* otherwise use the primary color variable, if defined */
      var(--hiq-color-primary,
        /* otherwise fallback to a static color value */
        hsl(210, 100%, 50%)
      )
    );
}
```

This way, you have the freedom to be as specific with your custom property definitions as you want, without actually being required to define any custom properties at all.

## Browser Support

The HiQ distribution build will work in any browsers that support custom properties. See the [Can I Use page](https://caniuse.com/#feat=css-variables) for the full browser listing.

You can use the source files and a PostCSS build to support browsers that don’t provide custom property support (more information below).

### Vendor Prefixes

The compiled version of HiQ comes with vendor prefixes included. If you want greater control over which prefixes are used, you can import the HiQ source files and run them through your own PostCSS setup.

We recommend using [autoprefixer](https://github.com/postcss/autoprefixer) and defining the browsers you wish to support using [browserslist](https://github.com/ai/browserslist).

### Custom Property Fallbacks

If you are supporting older browsers that do not support custom properties, you can run your css through PostCSS and use the PostCSS custom properties plugin. This will compute the [custom properties](https://github.com/postcss/postcss-custom-properties) at compile time.

Note that if you do this, you will lose some of the benefits of custom properties, including the ability to dynamically change them with JavaScript or override them within scoped selectors or media queries. To preserve custom properties for the browsers that do support them, configure the PostCSS custom properties plugin like this:

```js{5-7}
module.exports = {
    plugins: [
        // other plugins here

        require('postcss-custom-properties')({
            preserve: true
        })
    ]
}
```

This will result in both the original custom property and the computed property being included in the final css output:

```css
button {
  background-color: hsl(210, 100%, 50%);
  background-color: var(--gray-lighter);
}
```

The custom property is included second and, therefore, will override the static value if the browser supports custom properties.

