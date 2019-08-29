# Code

## Inline code

Wrap inline snippets of code with `<code>`. Be sure to escape HTML angle brackets.

<CodeExample>
The <code>code</code> element represents a fragment of computer code.

</CodeExample>

```html
The <code>code</code> element represents a fragment of computer code.
```

<PropertiesTable category="inline-code" />

## Code blocks

The `<pre>` element defines preformatted text, usually used for multiple lines of code.

<CodeExample>
<pre><code>&lt;p&gt;This is a sample paragraph.&lt;/p&gt;
&lt;p&gt;This is another sample paragraph.&lt;/p&gt;
</code></pre>

</CodeExample>

```html
<pre><code>&lt;p&gt;This is a sample paragraph.&lt;/p&gt;
&lt;p&gt;This is another sample paragraph.&lt;/p&gt;
</code></pre>
```

<PropertiesTable category="code-blocks" />

## Variables

The `<var>` element represents a variable in a mathematical expression or programming context.

<CodeExample>
<var>a</var> + <var>b</var> = <var>c</var>

</CodeExample>

```html
<var>a</var> + <var>b</var> = <var>c</var>
```

## User input

Use the `<kbd>` element to indicate input that is typically entered via keyboard.

<CodeExample>
To install HiQ, enter <kbd>npm install hiq</kbd> in your terminal.<br>
To cancel the installation process, press <kbd><kbd>ctrl</kbd> + <kbd>c</kbd></kbd>.

</CodeExample>

```html
To install HiQ, enter <kbd>npm install hiq</kbd> in your terminal.<br>
To cancel the installation process, press <kbd><kbd>ctrl</kbd> + <kbd>c</kbd></kbd>.
```

<PropertiesTable category="user-input" />

## Sample output

The `<samp>` element identifies sample output from a computer program.

<CodeExample>
<samp>I am HiQ. I am a lightweight, progressive CSS framework.</samp>

</CodeExample>

```html
<samp>I am HiQ. I am a lightweight, progressive CSS framework.</samp>
```
