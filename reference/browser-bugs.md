---
layout: docs
title: Browser Bugs
description: Reference any existing browser bugs related to the HiQ framework.
toc: true
group: reference
---

Reference the complete list of browser bugs related to the HiQ framework. Note that most of these are general bugs not directly tied to HiQ styles.

<table class="browser-bugs-table">
    <thead>
        <tr>
            <th>Bug</th>
            <th>Browsers</th>
        </tr>
    </thead>
    <tbody>
        {%- for bug in site.data.browser-bugs -%}
            <tr id="{{ bug.description }}">
                <td>{{ bug.description }}</td>
                <td>{{ bug.browsers }}</td>
            </tr>
        {%- endfor -%}
    </tbody>
</table>
