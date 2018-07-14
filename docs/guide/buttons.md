# Buttons

## Default Styling

Button styling is automatically applied to any elements matching the following selectors:
* `button`
* `[role='button']`
* `[type='button']`
* `[type='submit']`
* `[type='reset']`

In order to use an `a` element as a button, use `role="button"` to convey their purpose to screen readers and other assistive technologies.

<CodeExample>
<button>Button</button>
<button type="button">Button</button>
<button type="submit">Submit</button>
<button type="reset">Reset</button>
<a role="button">Link as button</a>
<button type="button" disabled>Disabled</button>

</CodeExample>

```html
<button>Button</button>
<button type="button">Button</button>
<button type="submit">Submit</button>
<button type="reset">Reset</button>
<a role="button">Link as button</a>
<button type="button" disabled>Disabled</button>
```

You can also style any element like a button by using the button mixin, if you are using the HiQ source files with PostCSS.

However, ideally any non-`button` element would receive `role="button"` to accurately convey its function to browsers.

```css
span {
  @mixin button;
}
```

Button styling can be customized through a number of custom properties targeted to each interaction state.

<PropertiesTable category="buttons" />

## Customization

We recommend creating new button variants by overriding the existing custom properties within the variant scope.

```css
button.is-primary {
  --hiq-button-border-color: blue;
  --hiq-button-background-color: blue;
  --hiq-button-text-color: white;
}
```

::: warning
Note that this will only work with browsers that fully support custom properties. If you need to support older browsers, you will probably want to create button variants with new custom properties or simple overrides.
:::

```css
/*
one option for older browsers:
define new custom properties
use PostCSS to compute values at compile time
*/
:root {
  --primary-button-border-color: blue;
  --primary-button-background-color: blue;
  --primary-button-text-color: white;
}

button.is-primary {
  border-color: var(--primary-button-border-color);
  background-color: var(--primary-button-background-color);
  color: var(--primary-button-text-color);
}

/* another option: simple overrides */
button.is-primary {
  border-color: blue;
  background-color: blue;
  color: white;
}
```
