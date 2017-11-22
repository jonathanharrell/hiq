---
layout: docs
title: Layout
description: Use HiQ containers to provide structure for your content and take advantage of HiQ's easy-to-use layout utilities.
toc: true
group: guide
---

## Box Sizing

For more straightforward sizing in CSS, we globally change the `box-sizing` value from `content-box` to `border-box` on every element, including `*::before` and `*::after`. This ensures that padding does not affect the final computed width of an element.

## Borders & Outlines

A base border-radius is defined globally with `--hiq-border-radius`. This is used on several elements, including `button`s, `input`s, and more, but can be overridden within each element.

All focusable elements have `outline` removed, but an outline is simulated using `box-shadow`. This can be customized with `--hiq-outline-width` and `--hiq-outline-color`.

## Containers

Containers can be used throughout your project to provide a frame for your content and bring consistency to how your views are sizing with respect to the browser.

<figure>
    <img src="/assets/img/diagrams/containers.svg" alt="Diagram demonstrating what the container variables control" />
</figure>

The basic container has a maximum width which you can define using a custom property and is inset from the edge of the viewport by another customizable amount.

```html
<div class="container"></div>
```

You can apply the `.is-fluid` modifier class to remove the max-width, causing the container to always stretch to fill the viewport.

```html
<div class="container is-fluid"></div>
```

{% include properties-table.html category="containers" %}

Mixins can be used when using the HiQ source files and running through a PostCSS setup (see the [Getting Started](/docs/guide/getting-started#usage) section).

You can make any element a container by using these PostCSS mixins:

```css
div {
  @mixin container;
}

/* Make the container fluid */
div {
  @mixin container;
  @mixin is-fluid;
}
```

## Margins

`margin-top` is removed from nearly all elements and only `margin-bottom` is applied, to create a more consistent and straightforward spacing scheme.

Most block-level elements will fallback to using the bottom margin defined by the `--hiq-block-element-margin-bottom` custom property. More specific bottom margins can be defined using additional custom properties like `--hiq-heading-margin-bottom` and `--hiq-paragraph-margin-bottom`. See a more complete list below and in the documentation for each element.

{% include properties-table.html category="margins" %}

## Flex Grid

For the most part, HiQ does not provide any grid utilities, due to the quickly improving support for the CSS grid spec. Ideally, most grids should be created using CSS grid properties. However, when supporting older browsers (namely IE11), it may be necessary to create some grids with flexbox.

HiQ provides a simple mixin for more easily creating a wrapped flex grid.

```css
@mixin flex-grid $flex-basis, $grid-gap;
```

Argument | Description
--- | ---
`flex-basis` | Defines the initial main size of each grid item.
`grid-gap` | Defines the gap between each grid item.

Example usage:

```css
div {
  @mixin flex-grid 30rem, 1rem;
}
```

In order the create the grid gap, this mixin is setting negative margin on the grid container and horizontal padding on each grid item.

Here's an example of the css that the mixin would generate:

```css
.grid-container {
  display: flex;
  flex-wrap: wrap;
  margin-right: -1rem;
  margin-left: -1rem;
}

.grid-container > * {
  flex: 1 1 30rem;
  padding-right: 1rem;
  padding-left: 1rem;
}
```

## Additional Utilities for Layout

There are several utility classes you can use to make certain common layout tasks quicker and easier. Keep in mind that you should probably only use these if the behavior defined by them will not change at different breakpoints.

Each of the layout utility classes has an associated mixin that can be used if you are using the HiQ source files with a PostCSS build.

### Setting Widths

```html
<!-- Stretches an element to the full width of its parent -->
<div class="is-full-width"></div>

<!-- Sets an element's max-width to 100% of its parent -->
<div class="is-max-full-width"></div>
```

```css
@mixin is-full-width;
@mixin is-max-full-width;
```

### Centering
`.is-centered` centers an element within its parent. The mixin can optionally set a max-width on the element.

```html
<div class="is-centered"></div>
```

```css
@mixin is-centered $max-width;
```

Example usage:

```css
div {
  @mixin is-centered 30rem;
}
```

### Floating

```html
<!-- Floats an element left -->
<div class="is-pulled-left"></div>

<!-- Floats an element right -->
<div class="is-pulled-right"></div>

<!-- Applies the clearfix hack -->
<div class="is-clearfix"></div>
```

```css
@mixin is-pulled-left;
@mixin is-pulled-right;
@mixin is-clearfix;
```

For more information on the clearfix hack and why it is needed when doing float-based layouts, [read this article](https://css-tricks.com/snippets/css/clear-fix/) from CSS-Tricks.

### Stretching

To stretch a child element to fill its parents, use the `.absolute-stretch` class or its related mixin. Note that the parent must have `position: relative` to size the children correctly.

```html
<div class="parent" style="position: relative;">
    <div class="child absolute-stretch"></div>
</div>
```

```css
.parent {
  position: relative;
}

.child {
  @mixin absolute-stretch;
}
```

### Touch Device Overflow

When content overflows the bounds of an element, scrolling on a touch device can feel slow or "sticky" by default. To enable smooth, momentum-based scrolling, use the `.overflow-touch` class or mixin on that element.

```html
<div class="overflow-touch"></div>
```

```css
.overflowing-element {
  @mixin overflow-touch;
}
```

### Visibility

To visually hide an element, but keep it accessible to screen readers, use the `.is-visually-hidden` class or mixin.

```html
<div class="element-to-hide is-visually-hidden"></div>
```

```css
.element-to-hide {
  @mixin is-visually-hidden;
}
```
