---
layout: docs
title: Meters & Progress
description: HiQ makes customizing the appearance of meter and progress elements easier than ever. Just pass in a few custom properties and you're good to go.
toc: true
group: guide
---

## Meters

Use the `<meter>` element to represent either a scalar value within a known range or a fractional value.

{% example html %}
<meter value="5" min="0" max="10">5 out of 10</meter>
{% endexample %}

{% include properties-table.html category="meters" %}

## Progress Bars

Use the `<progress>` element to represent the completion progress of a task as a progress bar.

{% example html %}
<progress value="50" max="100">progress</progress>
{% endexample %}

If a progress bar has no value defined on it, it will display an indeterminate loading animation.

{% example html %}
<progress>indeterminate progress</progress>
{% endexample %}

{% include properties-table.html category="progress" %}
