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
{% assign all_projects = site.data.projects.all_projects | sort: "all_order" %}

<div class="row">
{% for project in featured_projects %}
  <div class="col-12 col-md-6 mb-4{% if forloop.last %} mx-auto{% endif %}">
    <article class="card h-100" aria-labelledby="featured-{{ project.id }}">
      <div class="card-body">
        <h3 class="card-title h5" id="featured-{{ project.id }}">{{ project.title }}</h3>
        <p class="card-subtitle text-muted mb-3"><strong>Period:</strong> {{ project.period }}</p>
        <dl class="mb-3">
          <div class="row mb-1">
            <dt class="col-sm-3">Type</dt>
            <dd class="col-sm-9 mb-0">{{ project.type }}</dd>
          </div>
          <div class="row">
            <dt class="col-sm-3">Fields</dt>
            <dd class="col-sm-9 mb-0">{{ project.fields | join: " · " }}</dd>
          </div>
        </dl>
        <p class="card-text mb-0">{{ project.summary }}</p>
      </div>
      <div class="card-footer bg-transparent">
        {% assign valid_related_projects = "" | split: "" %}
        {% for related_project_id in project.related_project_ids %}
          {% assign related_project_matches = all_projects | where: "id", related_project_id %}
          {% if related_project_matches.size == 1 %}
            {% assign valid_related_projects = valid_related_projects | concat: related_project_matches %}
          {% endif %}
        {% endfor %}
        {% if valid_related_projects.size > 1 %}
          <span>View related projects:</span>
          {% for related_project in valid_related_projects %}
            <a href="#{{ related_project.id }}">{{ related_project.period }} study</a>{% unless forloop.last %} · {% endunless %}
          {% endfor %}
        {% else %}
          <a href="#{{ project.id }}">View in all projects</a>
        {% endif %}
      </div>
    </article>
  </div>
{% endfor %}
</div>

## All Projects

<div class="mb-4">
{% for project in all_projects %}
  <article class="py-3 border-bottom" aria-labelledby="{{ project.id }}">
    <h3 class="h5 mb-2" id="{{ project.id }}"><span class="text-muted">{{ project.period }}</span> — {{ project.title }}</h3>
    <p class="mb-2"><strong>Korean title:</strong> {{ project.original_title }}</p>
    <dl class="row mb-0">
      <dt class="col-sm-2">Fields</dt>
      <dd class="col-sm-10 mb-1">{{ project.fields | join: " · " }}</dd>
      <dt class="col-sm-2">Sponsor</dt>
      <dd class="col-sm-10 mb-1">{{ project.sponsor }}</dd>
      <dt class="col-sm-2">Status</dt>
      <dd class="col-sm-10 mb-0">{{ project.status }}</dd>
    </dl>
  </article>
{% endfor %}
</div>

## Disclosure

Corporate and partner names are displayed only when public disclosure has been confirmed. Confidential project details, funding amounts, and internal results are not published.
