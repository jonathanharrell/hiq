# Interactive Elements

## Dialogs

Use the `<dialog>` element for a dialog box or other interactive component, such as an alert.

<CodeExample>
<dialog id="dialog">
    <form method="dialog">
        <p>This is a dialog</p>
        <button value="cancel">Close dialog</button>
    </form>
</dialog>
<button id="showDialog" onClick="document.getElementById('dialog').showModal()">Show dialog</button>

</CodeExample>

```html
<dialog id="dialog">
    <form method="dialog">
        <p>This is a dialog</p>
        <button value="cancel">Close dialog</button>
    </form>
</dialog>
<button id="showDialog">Show dialog</button>
```

```js
document.getElementById('showDialog').addEventListener("click", () => {
  document.getElementById('dialog').showModal()
})
```

<PropertiesTable category="dialogs" />

::: warning
The dialog element currently has limited browser support.
:::
