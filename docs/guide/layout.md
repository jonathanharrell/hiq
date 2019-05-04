# Layout

## Box Sizing

For more straightforward sizing in CSS, we globally change the `box-sizing` value from `content-box` to `border-box` on every element, including `*::before` and `*::after`. This ensures that padding does not affect the final computed width of an element.

## Borders & Outlines

A base border-radius is defined globally with `--hiq-border-radius`. This is used on several elements, including `button`s, `input`s, and more, but can be overridden within each element.

All focusable elements have the `outline` property customized with `--hiq-outline-width` and `--hiq-outline-color`.

## Containers

Containers can be used throughout your project to provide a frame for your content and bring consistency to how your views are sizing with respect to the browser.

<figure>
    <img src="../assets/containers.svg" alt="Diagram showing how the sizing of containers is controlled by variables" />
</figure>

The basic container has a maximum width which you can define using a custom property and is inset from the edge of the viewport by another customizable amount.

```html
<div class="container"></div>
```

You can apply the `.is-fluid` modifier class to remove the max-width, causing the container to always stretch to fill the viewport.

```html
<div class="container is-fluid"></div>
```

<PropertiesTable category="containers" />

Mixins can be used when using the HiQ source files and running through a PostCSS setup (see the [Getting Started](/guide/) section).

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

<PropertiesTable category="margins" />

## Additional Utilities for Layout

There are a few utility classes you can use to make certain common layout tasks quicker and easier. Keep in mind that you should probably only use these if the behavior defined by them will not change at different breakpoints.

Each of the layout utility classes has an associated mixin that can be used if you are using the HiQ source files with a PostCSS build.

### Stretching

To stretch a child element to fill its parents, use the `.is-stretched` class or its related mixin. Note that the parent must have `position: relative` to size the children correctly.

```html
<div class="parent" style="position: relative;">
    <div class="child is-stretched"></div>
</div>
```

```css
.parent {
  position: relative;
}

.child {
  @mixin is-stretched;
}
```

### Overflow

```html
<div class="is-clipped"></div>
```

```css
.overflowing-element {
  @mixin is-clipped;
}
```

When content overflows the bounds of an element, scrolling on a touch device can feel slow or “sticky” by default. To enable smooth, momentum-based scrolling, use the `.overflow-touch` class or mixin on that element.

```html
<div class="overflow-touch"></div>
```

```css
.overflowing-element {
  @mixin overflow-touch;
}
```

### Resizability

You can use a mixin to make an element resizable.

```css
@mixin is-resizable $direction;
```

Argument | Description
--- | ---
`direction` | Defines the direction of resizability, either vertical or horizontal.

Example usage:

```css
.resizable-element {
  @mixin is-resizable vertical;
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

### Property Removal

There are two utilities designed for removing/resetting property values:

```css
/* resets all properties on an element to their initial values */
@mixin is-initial;

/* resets all properties on an element to inheritable values, or else initial values */
@mixin is-unset;
```
