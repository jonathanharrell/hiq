---
layout: docs
title: Tables
description: Make your tables look nice and easy-to-read with HiQ. Default styles look good but can be easily customized to fit your own brand.
toc: true
group: guide
---

## Default Styling

Tables receive some light default styling in HiQ.

{% example html %}
<table>
    <thead>
        <tr>
            <th scope="col">Column 1</th>
            <th scope="col">Column 2</th>
            <th scope="col">Column 3</th>
            <th scope="col">Column 4</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Row 1 Cell 1</td>
            <td>Row 1 Cell 2</td>
            <td>Row 1 Cell 3</td>
            <td>Row 1 Cell 4</td>
        </tr>
        <tr>
            <td>Row 2 Cell 1</td>
            <td>Row 2 Cell 2</td>
            <td>Row 2 Cell 3</td>
            <td>Row 2 Cell 4</td>
        </tr>
        <tr>
            <td>Row 3 Cell 1</td>
            <td>Row 3 Cell 2</td>
            <td>Row 3 Cell 3</td>
            <td>Row 3 Cell 4</td>
        </tr>
    </tbody>
</table>
{% endexample %}

Remember that you can use `.has-text-truncated` to truncate the contents of a cell and display an ellipsis.

Use `<th>` for heading cells. These can be used within in `<thead>`, `<tbody>`, or `<tfoot>`.

{% example html %}
<table>
    <thead>
        <tr>
            <th scope="col">Column 1</th>
            <th scope="col">Column 2</th>
            <th scope="col">Column 3</th>
            <th scope="col">Column 4</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Row 1</th>
            <td>Row 1 Cell 1</td>
            <td>Row 1 Cell 2</td>
            <td>Row 1 Cell 3</td>
        </tr>
        <tr>
            <th scope="row">Row 2</th>
            <td>Row 2 Cell 1</td>
            <td>Row 2 Cell 2</td>
            <td>Row 2 Cell 3</td>
        </tr>
        <tr>
            <th scope="row">Row 3</th>
            <td>Row 3 Cell 1</td>
            <td>Row 3 Cell 2</td>
            <td>Row 3 Cell 3</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="col">Column 1</th>
            <th scope="col">Column 2</th>
            <th scope="col">Column 3</th>
            <th scope="col">Column 4</th>
        </tr>
    </tfoot>
</table>
{% endexample %}

{% include properties-table.html category="tables" %}

## Captions

A `<caption>` functions like a heading for a table. It helps users with screen readers to find a table and understand what it’s about and decide if they want to read it.

HiQ places captions after tables by default.

{% example html %}
<table>
    <caption>This is a caption for this table.</caption>
    <thead>
        <tr>
            <th scope="col">Column 1</th>
            <th scope="col">Column 2</th>
            <th scope="col">Column 3</th>
            <th scope="col">Column 4</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Row 1</th>
            <td>Row 1 Cell 1</td>
            <td>Row 1 Cell 2</td>
            <td>Row 1 Cell 3</td>
        </tr>
        <tr>
            <th scope="row">Row 2</th>
            <td>Row 2 Cell 1</td>
            <td>Row 2 Cell 2</td>
            <td>Row 2 Cell 3</td>
        </tr>
        <tr>
            <th scope="row">Row 3</th>
            <td>Row 3 Cell 1</td>
            <td>Row 3 Cell 2</td>
            <td>Row 3 Cell 3</td>
        </tr>
    </tbody>
</table>
{% endexample %}
