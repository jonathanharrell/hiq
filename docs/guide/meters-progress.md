# Meters & Progress

## Meters

Use the `<meter>` element to represent either a scalar value within a known range or a fractional value.

<CodeExample>
<meter min="0" max="100" low="25" high="75" optimum="100" value="10"></meter>
<meter min="0" max="100" low="25" high="75" optimum="100" value="50"></meter>
<meter min="0" max="100" low="25" high="75" optimum="100" value="80"></meter>

</CodeExample>

```html
<meter min="0" max="100" low="25" high="75" optimum="100" value="10"></meter>
<meter min="0" max="100" low="25" high="75" optimum="100" value="50"></meter>
<meter min="0" max="100" low="25" high="75" optimum="100" value="80"></meter>
```

<PropertiesTable category="meters" />

<BrowserBugs category="meters" />

## Progress Bars

Use the `<progress>` element to represent the completion progress of a task as a progress bar.

<CodeExample>
<progress value="50" max="100">progress</progress>

</CodeExample>

```html
<progress value="50" max="100">progress</progress>
```

If a progress bar has no value defined on it, it will display an indeterminate loading animation.

<CodeExample>
<progress>indeterminate progress</progress>

</CodeExample>

```html
<progress>indeterminate progress</progress>
```

<PropertiesTable category="progress" />

<BrowserBugs category="progress" />
