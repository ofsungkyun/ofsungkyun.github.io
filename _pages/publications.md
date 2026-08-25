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

<section class="mb-5 pb-4 border-bottom" aria-labelledby="selected-publications">
  <h2 id="selected-publications" class="mb-4">Selected Publications</h2>

{% capture selected_publications %}
{% bibliography --group_by none --query @*[selected=true]* %}
{% endcapture %}
{{ selected_publications | replace: '<li>', '<li class="mb-4">' }}

</section>

<section class="mb-5" aria-labelledby="journal-articles">
  <h2 id="journal-articles" class="mb-4">Journal Articles</h2>

{% capture journal_articles %}
{% bibliography --query @*[category=journal] %}
{% endcapture %}
{{
    journal_articles
    | replace: '<h2 class="bibliography">', '<h3 class="bibliography h5 text-muted border-top pt-3 mt-4 mb-3 text-end">'
    | replace: '</h2>', '</h3>'
    | replace: '<li>', '<li class="mb-4">'
  }}

</section>

<section class="mb-5" aria-labelledby="international-conference-papers-abstracts">
  <h2 id="international-conference-papers-abstracts" class="mb-4">International Conference Papers &amp; Abstracts</h2>

{% capture international_conference_publications %}
{% bibliography --query @*[category=international_conference] %}
{% endcapture %}
{{
    international_conference_publications
    | replace: '<h2 class="bibliography">', '<h3 class="bibliography h5 text-muted border-top pt-3 mt-4 mb-3 text-end">'
    | replace: '</h2>', '</h3>'
    | replace: '<li>', '<li class="mb-4">'
  }}

</section>

<section aria-labelledby="domestic-conference-presentations-abstracts">
  <h2 id="domestic-conference-presentations-abstracts" class="mb-4">Domestic Conference Presentations &amp; Abstracts</h2>

{% capture domestic_conference_publications %}
{% bibliography --query @*[category=domestic_conference] %}
{% endcapture %}
{{
    domestic_conference_publications
    | replace: '<h2 class="bibliography">', '<h3 class="bibliography h5 text-muted border-top pt-3 mt-4 mb-3 text-end">'
    | replace: '</h2>', '</h3>'
    | replace: '<li>', '<li class="mb-4">'
  }}

</section>

</div>
