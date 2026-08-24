---
layout: page
title: Projects
permalink: /projects/
nav: true
nav_order: 2
---

This page presents selected research and applied projects across physiological computing, human factors, user experience, data analysis, and Human–AI Interaction. Descriptions are limited to publicly supportable information; confidential client details, funding amounts, and internal results are omitted.

## Featured Projects

{% assign featured_projects = site.data.projects.featured_projects | sort: "featured_order" %}
{% for project in featured_projects %}

### {{ project.title }} {#featured-{{ project.id }}}

- **Period:** {{ project.period }}
- **Type:** {{ project.type }}
- **Fields:** {{ project.fields | join: " · " }}

{{ project.summary }}

[View in all projects](#{{ project.id }})

{% endfor %}

## All Projects

{% assign all_projects = site.data.projects.all_projects | sort: "all_order" %}
{% for project in all_projects %}

### {{ project.period }} — {{ project.title }} {#{{ project.id }}}

- **Korean title:** {{ project.original_title }}
- **Fields:** {{ project.fields | join: " · " }}
- **Sponsor:** {{ project.sponsor }}
- **Status:** {{ project.status }}

{% endfor %}

## Disclosure

Corporate and partner names are displayed only when public disclosure has been confirmed. Confidential project details, funding amounts, and internal results are not published.
