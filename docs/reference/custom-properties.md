---
layout: docs
title: Custom Property Reference
description: ...
toc: true
group: reference
redirect_from: "/docs/reference/"
---

<form>
    <input type="text" class="search-properties" placeholder="Search properties...">
</form>

<table class="properties-table">
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        {%- for property in site.data.custom-properties -%}
            <tr id="{{ property.name }}">
                <td class="name">{{ property.name }}</td>
                <td class="description">{{ property.description }}</td>
            </tr>
        {%- endfor -%}
    </tbody>
</table>
