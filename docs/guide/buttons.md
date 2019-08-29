# Buttons

## Default Styling

Button styling is automatically applied to any elements matching the following selectors:
* `button`
* `[role='button']`
* `[type='button']`
* `[type='submit']`
* `[type='reset']`
* `.button`

In order to use an `a` element as a button, use `role="button"` to convey their purpose to screen readers and other assistive technologies. If you want to apply button styling to an `a` element, but retain the semantics of the anchor tag, use the `.button` class instead.

<CodeExample>
<button>Button</button>
<button type="button">Button</button>
<button type="submit">Submit</button>
<button type="reset">Reset</button>
<a role="button">Link as button</a>
<a class="button">Link with button styling</a>
<button type="button" disabled>Disabled</button>

</CodeExample>

```html
<button>Button</button>
<button type="button">Button</button>
<button type="submit">Submit</button>
<button type="reset">Reset</button>
<a role="button">Link as button</a>
<a class="button">Link with button styling</a>
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

We recommend creating new button variants by using locally scoped custom properties within the variant scope.

```css
button.is-primary {
  --button-border-color: blue;
  --button-background-color: blue;
  --button-text-color: white;
}
```
