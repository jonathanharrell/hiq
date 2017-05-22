# Hi-Q
A simple CSS foundation with responsive typography and input styling, built with [PostCSS](https://github.com/postcss/postcss) and [cssnext](http://cssnext.io/). See the [demo page](https://github.com/jonathanharrell/hiq/blob/master/dist/hiq.css).

<img src="https://raw.githubusercontent.com/jonathanharrell/hiq/master/hiq.png" alt="HiQ" width="250" height="250" />

In the age of Flexbox, CSS grid, and other exciting layout features, there is less and less need for a bloated CSS framework. What we do need is a simple foundation on top of which to build our own styles. Enter HiQ.

* It's small – the current build is only 27KB!
* It's semantic – we only use classes where absolutely necessary so you can more easily write your own styles.
* It's forward-thinking – built with future CSS features like custom properties.
* It's grid-less – who needs a grid framework anymore? We don't.

## Install

```sh
npm install hiq
```

Or download/clone the repo.

## Usage

You can use the fully compiled and minified CSS version:

```html
<link rel="stylesheet" href="node_modules/hiq/hiq.min.css">
```
```css
@import 'node_modules/hiq/hiq.min.css';
```


Or the version with custom properties intact, so you can override with your own values and do cool things like theme switching (RECOMMENDED):

```html
<link rel="stylesheet" href="node_modules/hiq/hiq.css">
```
```css
@import 'node_modules/hiq/hiq.css';
```

Keep in mind that with this version, styles will only fully work in browsers that support custom properties. To solve this, you may incorporate this file into your own postcss build.

## Customization

Any custom properties defined in this library may be overwritten simply by placing your own property values after the unminified version.

```css
@import 'node_modules/hiq/hiq.css';

:root {
  --color-primary: red;
}
```

All custom properties can be found in the `variables.css` file.

### Containers

Containers are simple wrappers around your content:

```html
<div class="container"></div>
```

Containers have a max width and padding on the left and right side. These exist as custom properties:

```css
:root {
  --max-container-width: 80em;
  --container-horizontal-padding: 5vw;
}
```


NOTE: The default padding is responsive, relative to the viewport width.

### Typography

Typography is truly responsive, meaning that it is not simply redefined at various breakpoints, but is a function of viewport width. You can define a min and max font size, and a min and max browser width, below and above which the font size will stop changing.

```css
:root {
  --min-font-size: 1rem;
  --max-font-size: 1.15rem;

  --lower-font-range: 26rem;
  --upper-font-range: 80rem;
}
```


NOTE: Due to current restrictions with the calc() function and custom properties, unitless values must also be provided.

NOTE: Due to current limitations with custom media queries and custom properties, the raw value for the upper font range is also needed in a custom media query definition:

```css
@custom-media --upper-font-range (width >= 80rem);
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
