---
layout: docs
title: Custom Property Reference
description: HiQ is built using custom properties. Easily access information about any property using the complete reference.
toc: true
group: reference
redirect_from: "/docs/reference/"
---

HiQ is built on a series of custom properties, all of which you can customize to theme elements for your project. You can find the full list of custom properties used in HiQ below.

<form class="properties-search-form">
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
                <td class="name"><code>{{ property.name }}</code></td>
                <td class="description">{{ property.description }}</td>
            </tr>
        {%- endfor -%}
    </tbody>
</table>
