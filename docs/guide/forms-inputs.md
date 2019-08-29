# Forms & Inputs

## Basic Form Elements

Use the `fieldset` element to group related elements in a form. By default, HiQ removes the `border` from the element.

<CodeExample>
<form>
  <fieldset>
    <legend>Related Fields:</legend>
    <p>
        <label>Field 1:</label>
        <input type="text">
    </p>
    <p>
        <label>Field 2:</label>
        <input type="text">
    </p>
    <p>
        <label>Field 3:</label>
        <input type="text">
    </p>
  </fieldset>
</form>
</CodeExample>

```html
<form>
  <fieldset>
    <legend>Related Fields:</legend>
    <p>
        <label>Field 1:</label>
        <input type="text">
    </p>
    <p>
        <label>Field 2:</label>
        <input type="text">
    </p>
    <p>
        <label>Field 3:</label>
        <input type="text">
    </p>
  </fieldset>
</form>
```

The `legend` element represents a caption for the content of `fieldset` while the `label` element represents a caption for each `input`.

<PropertiesTable category="forms" />

## Input Mixin

A mixin defines the base styles for many input elements, including all textual inputs. You can use this mixin directly if you are using the HiQ source files with PostCSS.

```css
.element {
  @mixin input;
}
```

Numerous custom properties are available to customize the appearance of inputs:

<PropertiesTable category="inputs" />

<BrowserBugs category="inputs" />

## Input Validation

Border color on inputs with a `required` attribute is changed based on their validation state. This applies to inputs matching `:required:invalid` or `:required:valid` selectors. This can be easily overridden with custom properties (see the list of properties above).

<CodeExample>
<p>
    <label for="required">Invalid Required Input</label>
    <input type="text" required>
</p>
<p>
    <label for="required">Valid Required Input</label>
    <input type="text" required value="Input value">
</p>
</CodeExample>

```html
<p>
    <label for="required">Invalid Required Input</label>
    <input type="text" required>
</p>
<p>
    <label for="required">Valid Required Input</label>
    <input type="text" required value="Input value">
</p>
```

## Text Inputs

Styling for textual inputs:

<table class="input-table">
  <thead>
    <tr>
      <th>Element</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>&lt;input type="text"&gt;</code>
      </td>
      <td><input type="text" placeholder="Enter text" /></td>
    </tr>
    <tr>
      <td>
        <code>&lt;input type="password"&gt;</code>
      </td>
      <td><input type="text" placeholder="••••••••••" /></td>
    </tr>
    <tr>
      <td>
        <code>&lt;input type="email"&gt;</code>
      </td>
      <td><input type="email" placeholder="name@email.com" /></td>
    </tr>
    <tr>
      <td>
        <code>&lt;input type="url"&gt;</code>
      </td>
      <td><input type="url" placeholder="http://yoursite.com" /></td>
    </tr>
    <tr>
      <td>
        <code>&lt;input type="tel"&gt;</code>
      </td>
      <td><input type="tel" placeholder="(999) 999-9999" /></td>
    </tr>
    <tr>
      <td>
        <code>&lt;input type="search"&gt;</code>
      </td>
      <td><input type="search" placeholder="Enter search term" /></td>
    </tr>
    <tr>
      <td>
        <code>&lt;input type="number"&gt;</code>
      </td>
      <td><input type="number" placeholder="1234" /></td>
    </tr>
    <tr>
      <td>
        <code>&lt;input readonly&gt;</code>
      </td>
      <td><input type="text" placeholder="Enter text" readonly /></td>
    </tr>
    <tr>
      <td>
        <code>&lt;input disabled&gt;</code>
      </td>
      <td><input type="text" placeholder="Enter text" disabled /></td>
    </tr>
  </tbody>
</table>

## Temporal Inputs

Styling for date- and time-based inputs:

<table class="input-table">
  <thead>
    <tr>
      <th>Element</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>&lt;input type="date"&gt;</code>
      </td>
      <td><input type="date" placeholder="mm/dd/yyyy" /></td>
    </tr>
    <tr>
      <td>
        <code>&lt;input type="time"&gt;</code>
      </td>
      <td><input type="time" placeholder="--:-- --" /></td>
    </tr>
    <tr>
      <td>
        <code>&lt;input type="month"&gt;</code>
      </td>
      <td><input type="month" placeholder="Enter month" /></td>
    </tr>
    <tr>
      <td>
        <code>&lt;input type="week"&gt;</code>
      </td>
      <td><input type="week" placeholder="Enter week" /></td>
    </tr>
    <tr>
      <td>
        <code>&lt;input type="datetime-local"&gt;</code>
      </td>
      <td><input type="datetime-local" placeholder="Enter date and time" /></td>
    </tr>
  </tbody>
</table>

## Textareas

The `textarea` element provides a multi-line text input control.

<CodeExample>
<p>
    <label for="textarea">Textarea</label>
    <textarea id="textarea" placeholder="Enter text"></textarea>
</p>
</CodeExample>

```html
<p>
    <label for="textarea">Textarea</label>
    <textarea id="textarea" placeholder="Enter text"></textarea>
</p>
```

<PropertiesTable category="textareas" />

## Selects

The `select` element represents a control that provides a menu of options. Use `optgroup` to group related options.

<CodeExample>
<p>
    <label for="select">Select</label>
    <select id="select">
        <optgroup label="Option Group">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
        </optgroup>
    </select>
</p>
</CodeExample>

```html
<p>
    <label for="select">Select</label>
    <select id="select">
        <optgroup label="Option Group">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
        </optgroup>
    </select>
</p>
```

A custom dropdown caret is created with an inline svg used as a `background-image`.

If multiple options should be selectable, use the `multiple` attribute on the `select` element.

<CodeExample>
<p>
    <label for="multi-select">Multi-select</label>
    <select multiple id="multi-select">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
    </select>
</p>
</CodeExample>

```html
<p>
    <label for="multi-select">Multi-select</label>
    <select multiple id="multi-select">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
    </select>
</p>
```

<PropertiesTable category="selects" />

## Datalists

An "autocomplete" feature can be provided on inputs using the `datalist` element. This is supported in most browsers, with the noticeable exception of Safari.

<CodeExample>
<p>
    <label for="datalist">Datalist</label>
    <input list="options" id="datalist" placeholder="Type 'o' to see matching options" />
    <datalist id="options">
        <option value="Option 1" />
        <option value="Option 2" />
        <option value="Option 3" />
    </datalist>
</p>
</CodeExample>

```html
<p>
    <label for="datalist">Datalist</label>
    <input list="options" id="datalist" placeholder="Type 'o' to see matching options" />
    <datalist id="options">
        <option value="Option 1" />
        <option value="Option 2" />
        <option value="Option 3" />
    </datalist>
</p>
```


## Checkboxes

Place checkbox inputs inside a div with the class `.checkbox` and the `label` element AFTER the input to get the proper custom styling provided by HiQ. HiQ hides the `input` element and use `before` and `after` pseudo-elements to style the checkbox and checkmark.

<CodeExample>
<fieldset>
    <legend>Checkboxes</legend>
    <div class="checkbox">
        <input type="checkbox" name="checkbox" id="check-option1" value="option1" />
        <label for="check-option1">Option 1</label>
    </div>
    <div class="checkbox">
        <input type="checkbox" name="checkbox" id="check-option2" value="option2" />
        <label for="check-option2">Option 2</label>
    </div>
    <div class="checkbox">
        <input type="checkbox" name="checkbox" id="check-option3" value="option3" disabled />
        <label for="check-option3">Option 3</label>
    </div>
</fieldset>
</CodeExample>

```html
<fieldset>
    <legend>Checkboxes</legend>
    <div class="checkbox">
        <input type="checkbox" name="checkbox" id="check-option1" value="option1" />
        <label for="check-option1">Option 1</label>
    </div>
    <div class="checkbox">
        <input type="checkbox" name="checkbox" id="check-option2" value="option2" />
        <label for="check-option2">Option 2</label>
    </div>
    <div class="checkbox">
        <input type="checkbox" name="checkbox" id="check-option3" value="option3" disabled />
        <label for="check-option3">Option 3</label>
    </div>
</fieldset>
```

<PropertiesTable category="checkboxes" />

## Radio Buttons

Place radio inputs inside a div with the class `.radio` and the `label` element AFTER the input to get the proper custom styling provided by HiQ. HiQ hides the `input` element and use `before` and `after` pseudo-elements to style the radio button and radio fill.

<CodeExample>
<fieldset>
    <legend>Radio Buttons</legend>
    <div class="radio">
        <input type="radio" name="radio" id="radio-option1" value="option1" />
        <label for="radio-option1">Option 1</label>
    </div>
    <div class="radio">
        <input type="radio" name="radio" id="radio-option2" value="option2" />
        <label for="radio-option2">Option 2</label>
    </div>
    <div class="radio">
        <input type="radio" name="radio" id="radio-option3" value="option3" disabled />
        <label for="radio-option3">Option 3</label>
    </div>
</fieldset>
</CodeExample>

```html
<fieldset>
    <legend>Radio Buttons</legend>
    <div class="radio">
        <input type="radio" name="radio" id="radio-option1" value="option1" />
        <label for="radio-option1">Option 1</label>
    </div>
    <div class="radio">
        <input type="radio" name="radio" id="radio-option2" value="option2" />
        <label for="radio-option2">Option 2</label>
    </div>
    <div class="radio">
        <input type="radio" name="radio" id="radio-option3" value="option3" disabled />
        <label for="radio-option3">Option 3</label>
    </div>
</fieldset>
```

<PropertiesTable category="radio-buttons" />

## Range Inputs

Range inputs let users specify a numeric value within a specified range. The styling for range inputs is complex across browsers. HiQ takes care of that and provides some simple variables to customize the appearance of range inputs for your own projects.

<CodeExample>
<p>
    <label for="range">Range</label>
    <input type="range" id="range" min="100" max="500" step="10" value="50%">
</p>
</CodeExample>

```html
<p>
    <label for="range">Range</label>
    <input type="range" id="range" min="100" max="500" step="10">
</p>
```

<PropertiesTable category="range-inputs" />

<BrowserBugs category="range-inputs" />

## File Inputs

File inputs let users choose one or more files from their device storage. HiQ styles file inputs in Webkit browsers to appear as buttons.

<CodeExample>
<p>
    <label for="file">Upload File</label>
    <input type="file" id="file">
</p>
</CodeExample>

```html
<p>
    <label for="file">Upload File</label>
    <input type="file" id="file">
</p>
```

<BrowserBugs category="file-inputs" />

## Color Inputs

Color inputs let users specify a color by using a visual color picker or by entering the color into a text field, depending on the browser.

<CodeExample>
<p>
    <label for="color">Color</label>
    <input type="color" id="color">
</p>
</CodeExample>

```html
<p>
    <label for="color">Color</label>
    <input type="color" id="color">
</p>
```
