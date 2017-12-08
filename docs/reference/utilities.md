---
layout: docs
title: Utilities
description: HiQ provides a number of PostCSS-powered custom selectors and mixins that will make styling your project much easier. Easily find out about them using the complete reference.
toc: true
group: reference
---

HiQ provides numerous custom selectors, mixins and utility classes to make styling your project easier and faster. See below for a complete reference.

## Custom Selectors

Behind-the-scenes, HiQ uses custom selectors, made possible by the [postcss-custom-selectors](https://github.com/postcss/postcss-custom-selectors) plugin. If you use the HiQ source files with PostCSS, these are also available to you.

<table class="utilities-table">
    <thead>
        <tr>
            <th>Selector</th>
            <th>Selected Elements</th>
        </tr>
    </thead>
    <tbody>
        {%- for selector in site.data.custom-selectors -%}
            <tr id="{{ selector.name }}">
                <td class="name"><code>{{ selector.name }}</code></td>
                <td class="description">{{ selector.description }}</td>
            </tr>
        {%- endfor -%}
    </tbody>
</table>

## Mixins

HiQ mixins are available for you to use if you use the source files with PostCSS. Most mixins are also available as classes. Keep in mind that you should typically only use HiQ utility classes if that utility will apply at all breakpoints.

<table class="utilities-table">
    <thead>
        <tr>
            <th>@mixin/.class</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        {%- for mixin in site.data.mixins -%}
            <tr id="{{ mixin.name }}">
                <td class="mixin-class">
                    <code class="mixin">{{ mixin.name }}</code>
                    {%- if mixin.class -%}
                        <br/><code class="class">.{{ mixin.class }}</code>
                    {%- endif -%}
                </td>
                <td class="description">{{ mixin.description }}</td>
            </tr>
        {%- endfor -%}
    </tbody>
</table>
