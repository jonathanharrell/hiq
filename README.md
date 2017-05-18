# Hi-Q
A simple CSS foundation with responsive typography and input styling, built with PostCSS.


In the age of Flexbox, CSS grid, and other exciting layout features, there is less and less need for a bloated CSS framework. What we do need is a simple foundation on top of which to build our own styles. Enter HiQ.

* It's small – the current build is only 11KB!
* It's semantic – we only use classes where absolutely necessary so you can more easily write your own styles.
* It's forward-thinking – built with future CSS features like custom properties.
* It's grid-less – who needs a grid framework anymore? We don't.

## Install

```sh
npm install hiq
```

Or download/clone the repo.

## Usage

You can use the fully compiled CSS version:

```html
<link rel="stylesheet" href="node_modules/hiq/hiq.css">
```
```css
@import 'node_modules/hiq/hiq.css';
```

Or the version with custom properties intact, so you can override with your own values and do cool things like theme switching (RECOMMENDED):

```html
<link rel="stylesheet" href="node_modules/hiq/hiq-next.css">
```
```css
@import 'node_modules/hiq/hiq-next.css';
```

## Customization
