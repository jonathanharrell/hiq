# Theming

## Custom Properties

Theming with HiQ is easy, since the framework is built using custom properties. All custom properties defined globally by HiQ are namespaced with `--hiq-*`.

All you need to do is set these custom properties to your own values. This can be done in a few ways:

### Global overrides

Define custom properties on the root element to affect the global scope. These can be defined before or after the import of HiQ itself.

```css
@import 'node_modules/hiq/dist/hiq.min.css';

:root {
  --hiq-button-background-color: lightgray;
}
```

#### Dark mode support

You can override global values within a media query to support native dark mode.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --hiq-color-gray-1: hsl(220, 10%, 98%);
  }
}
```

### Scoped overrides

Define custom properties on particular selectors to limit their scope. These locally-scoped custom properties will not have the `hiq-` prefix.

```css
button.is-primary {
  --button-background-color: blue;
}
```

### Inline overrides

Pass in the custom property values using the `style` attribute in your html. You might feel that this has similarities to dreaded inline styling, but you can also think of it as something more like `props` in React and similar JavaScript frameworks.

```html
<button style="--button-background-color: blue">Button</button>
```

## Color

Every color used throughout HiQ is defined as a custom property. We favor using color keywords and colors defined using the HSL scale. We find that these are more human-readable than hex codes or RGB values.

### Gray Palette

All gray values are built from a single gray palette composed of eight gradations, ranging from `gray-1` to `gray-8`. These are created from HSL values of the same hue and saturation, where only the lightness is modified. By default, the gradations run from darkest to lightest, but you can alter this if, say, you are implementing a dark theme override.

<PropertiesTable category="gray-palette" />

### Semantic Palette

There are four colors defined in HiQ that convey semantic meaning:

<PropertiesTable category="semantic-palette" />

### Adding Additional Colors

You will likely need additional colors. We recommend creating custom properties on the `:root` element every time you find it necessary to create a new value. This will allow you to reuse the color globally.

```css
:root {
  --color-accent: teal;
}
```

### Applied Colors

The manner in which colors are applied is also customizable. A set of custom properties defines the colors applied to certain structural and typographic elements. Additional color-related properties will be found in the documentation for each component.

<PropertiesTable category="applied-colors" />

## Recommendations

HiQ establishes some conventions for class naming, modifier classes, media queries, etc. that you may find helpful to follow when customizing and extending the framework. But please feel free to follow your own conventions.

HiQ is specifically designed to be lightweight and work with any naming convention or organization scheme.

### Modifiers

There are two types of modifier classes. `is-*` signifies that the properties of an element itself have been modified. `has-*` signifies that the content within an element has been modified.

For example, consider the difference between these two classes:

```html
<div class="is-stretched">This div stretches to fill its parent</div>
<div class="has-text-truncated">This div has text that is truncated with an ellipsis</div>
```

If the properties of the element itself are affected, we use `is-*`. If the contents of that element have been affected, we use `has-*`.

### Media Queries

HiQ has fluid typography built in. Behind-the-scenes, we use two custom media queries that are defined using the [custom media queries PostCSS plugin](https://github.com/postcss/postcss-custom-media). If you are using your own PostCSS setup, we recommend using this plugin and defining your own media queries this way. This will make them easily reusable throughout your project.

Here are some example media queries:

```css
@custom-media --mobile-only (width < 35rem);
@custom-media --tablet (width >= 35rem);
@custom-media --tablet-only (width >= 35rem) and (width < 54rem);
@custom-media --tablet-down (width < 54rem);
@custom-media --desktop (width >= 54rem);

.my-component {
  width: 100%;
  
  @media (--tablet) {
    width: 50%;
  }
  
  @media (--desktop) {
    width: 25%;
  }
}
```

### z-index

`z-index` values can quickly get out of hand, so we recommend setting them up as a system of custom properties.

```css
:root {
  --zindex-dropdown: 1000;
  --zindex-navbar: 1010;
  --zindex-modal: 1020;
  --zindex-tooltip: 1030;
}
```

### Animation Controls

As part of your theme customizations, you can alter the details of how certain properties transition through `--hiq-speed` and `--hiq-easing`. For example, these values affect the transition of button colors on `hover`.

You can use these values when creating your own transitions and animations, as well as defining your own. We recommend keeping these animation controls defined as custom properties for reuse:

```css
:root {
  --menu-easing: cubic-bezier(0.4, 0.0, 0.2, 1);
}
```

<PropertiesTable category="animation-controls" />
