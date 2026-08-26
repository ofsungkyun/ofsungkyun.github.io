---
layout: page
title: Projects
permalink: /projects/
nav: true
nav_order: 2
---

Research and applied projects spanning human factors and user experience, psychophysiological assessment, data-driven analysis, and human–AI interaction.

{% assign all_projects = site.data.projects.all_projects | sort: "all_order" %}

<div class="mb-4">
{% for project in all_projects %}
  <article class="mb-4" aria-labelledby="{{ project.id }}">
    <h2 class="h5 mb-2" id="{{ project.id }}"><span class="text-muted">{{ project.period }}</span> — {{ project.title }}</h2>
    <p class="mb-2"><strong>Korean title:</strong> {{ project.original_title }}</p>
    <p class="mb-1"><strong>Fields:</strong> {{ project.fields | join: " · " }}</p>
    <p class="mb-0"><strong>Sponsor:</strong> {{ project.sponsor }}</p>
  </article>
{% endfor %}
</div>

## Disclosure

Project descriptions include only publicly shareable information. Confidential details, funding amounts, and internal results are omitted.
