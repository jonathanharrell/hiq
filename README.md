# HiQ
A simple CSS foundation with responsive typography and input styling, built with [PostCSS](https://github.com/postcss/postcss) and [cssnext](http://cssnext.io/). Now also available for Sass.

See the [demo page](https://jonathanharrell.github.io/hiq/).

<img src="https://raw.githubusercontent.com/jonathanharrell/hiq/master/hiq.png" alt="HiQ" width="250" height="250" />

In the age of Flexbox, CSS grid, and other exciting layout features, there is less and less need for a bloated CSS framework. What we do need is a simple foundation on top of which to build our own styles. Enter HiQ.

* It's small – the current build is only 29KB!
* It's semantic – we only use classes where absolutely necessary so you can more easily write your own styles.
* It's forward-thinking – built with future CSS features like custom properties.
* It's grid-less – who needs a grid framework anymore? We don't.

## Documentation

* [Install](#install)
* [Usage](#usage)
* [Customization](#customization)
* [Containers](#containers)
* [Utility](#utility)
* [Typography](#typography)
* [Color](#color)
* [Sass](#sass)

## Install

```sh
npm install hiq
```

Or download/clone the repo.

## Usage

You can use the full or minified versions as links, or CSS imports:

```html
<link rel="stylesheet" href="node_modules/hiq/hiq.css">
<link rel="stylesheet" href="node_modules/hiq/hiq.min.css">
```
```css
@import 'node_modules/hiq/hiq.css';
@import 'node_modules/hiq/hiq.min.css';
```

If you have your own PostCSS setup, you can import the source css file directly:

```css
@import 'node_modules/hiq/css/hiq.css';
```

Note that in this case, you will need to configure your postcss.config.js file to include the following plugins:

```js
module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-mixins'),
        require('postcss-cssnext')
    ]
}
```

## Customization

Any custom properties defined in this library may be overwritten simply by placing your own property values after the imported stylesheet.

```css
@import 'node_modules/hiq/hiq.css';

:root {
  --color-primary: red;
}
```

All custom properties can be found in the `variables.css` file.

### Containers

Containers are simple wrappers around your content. Adding the `.is-fluid` class will cause the container to stretch across the full browser width.

```html
<div class="container"></div>
<div class="container is-fluid"></div>
```

Containers have a max width and padding on the left and right side. These exist as custom properties:

```css
:root {
  --max-container-width: 80em;
  --container-horizontal-padding: 5vw;
}
```


NOTE: The default padding is responsive, relative to the viewport width.

Containers can also be applied to any element in PostCSS through mixins.

```css
.element {
  @mixin container;
  @mixin is-fluid;
}
```

### Utility

Utility classes provide an easy way to achieve common tasks, such as visually hiding an element but allowing it to remain in the DOM so that screen readers can access it:

```html
<div class="visually-hidden"></div>
<ul class="list-unstyled"></ul>
```

These are also available as mixins:

```css
.element {
  @mixin visually-hidden;
  @mixin list-unstyled;
}
```

### Typography

Typography is truly responsive, meaning that it is not simply redefined at various breakpoints, but is a function of viewport width. You can define a min and max font size, and a min and max browser width, below and above which the font size will stop changing. Font sizes must currently be provided as unitless pixel values.

```css
:root {
  --unitless-min-font-size: 16;
  --unitless-max-font-size: 20;

  --unitless-lower-font-range: 460;
  --unitless-upper-font-range: 1200;
}
```


NOTE: Due to current limitations with custom media queries and custom properties, the pixel value for the upper font range is also needed in a custom media query definition:

```css
@custom-media --upper-font-range (width >= 1200px);
```


Further font sizes are created simply using rems, which refer back to the responsive base font size:

```css
:root {
  --font-size-1: 2.75rem;
  --font-size-2: 2.25rem;
  --font-size-3: 1.75rem;
  --font-size-4: 1.5rem;
  --font-size-5: 1rem;
  --font-size-6: 0.875rem;
}
```

### Color

Color is defined with a palette of grays and a semantic palette:

```css
:root {
  --color-primary: #3f51b5;
  --color-success: #4caf50;
  --color-warning: #ff5722;
  --color-error: #f44336;
}
```

Colors are then applied to various elements with additional custom properties.

### Sass

HiQ can also be used with Sass. In this case, import the main Sass file directly:

```scss
@import 'node_modules/hiq/scss/hiq';
```

If you need to override variables, include them BEFORE importing the library:

```scss
$color-primary: red;

@import 'node_modules/hiq/scss/hiq';
```
