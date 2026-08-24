---
layout: page
permalink: /publications/
title: Publications
description: Selected publications and a complete record of journal articles and conference contributions.
nav: true
nav_order: 3
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications" markdown="1">

## Selected Publications

{% bibliography --group_by none --query @*[selected=true]* %}

## Journal Articles

{% bibliography --query @*[category=journal] %}

## International Conference Papers & Abstracts

{% bibliography --query @*[category=international_conference] %}

## Domestic Conference Presentations & Abstracts

{% bibliography --query @*[category=domestic_conference] %}

</div>
