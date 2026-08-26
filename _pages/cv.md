---
layout: default
permalink: /cv/
title: CV
nav: true
nav_order: 4
cv_format: rendercv # options: rendercv, jsonresume
description: Curriculum vitae of Sungkyun Im, including education, research experience, projects, publications, awards, patents, and research methods.
toc:
  sidebar: left
---

{% assign cv_feature_enabled = site.al_folio.features.cv.enabled | default: true %}

{% if site.plugins contains 'al_folio_cv' and cv_feature_enabled and page.cv_format == 'rendercv' and site.data.cv and site.data.cv.cv %}
{% assign cv = site.data.cv.cv %}

  <nav class="d-sm-none mt-3" aria-label="CV section navigation">
    <details>
      <summary class="font-weight-medium">Jump to section</summary>
      <ul class="mb-0 mt-2">
        <li><a href="#contact-information">Contact Information</a></li>
        {% for section_pair in cv.sections %}
          {% assign section_title = section_pair[0] %}
          <li>
            <a href="#{{ section_title | slugify }}">{{ section_title }}</a>
          </li>
        {% endfor %}
      </ul>
    </details>
  </nav>

  <div class="post">
    <header class="post-header">
      <h1 class="post-title">
        {{ page.title }}
        {% if page.cv_pdf %}
          <a
            {% if page.cv_pdf contains '://' %}
              href="{{ page.cv_pdf }}"
            {% else %}
              href="{{ page.cv_pdf | relative_url }}"
            {% endif %}
            target="_blank"
            rel="noopener noreferrer"
            class="float-right"
          >
            <i class="fa-solid fa-file-pdf"></i>
          </a>
        {% endif %}
      </h1>
      {% if page.description %}
        <p class="post-description">{{ page.description }}</p>
      {% endif %}
    </header>

    <article>
      <div class="cv">
        {% if cv.name or cv.label or cv.location or cv.email or cv.phone or cv.website %}
          <section class="mt-4" aria-labelledby="contact-information">
            <h2 id="contact-information" class="h3 font-weight-medium border-bottom pb-2 mb-3">Contact Information</h2>
            <table class="table table-cv table-sm table-borderless mb-0">
              {% if cv.name %}
                <tr>
                  <td class="p-1 pr-2 font-weight-bold"><b>Name</b></td>
                  <td class="p-1 pl-2 font-weight-light">{{ cv.name }}</td>
                </tr>
              {% endif %}
              {% if cv.label %}
                <tr>
                  <td class="p-1 pr-2 font-weight-bold"><b>Professional Title</b></td>
                  <td class="p-1 pl-2 font-weight-light">{{ cv.label }}</td>
                </tr>
              {% endif %}
              {% if cv.email %}
                <tr>
                  <td class="p-1 pr-2 font-weight-bold"><b>Email</b></td>
                  <td class="p-1 pl-2 font-weight-light">{{ cv.email }}</td>
                </tr>
              {% endif %}
              {% if cv.phone %}
                <tr>
                  <td class="p-1 pr-2 font-weight-bold"><b>Phone</b></td>
                  <td class="p-1 pl-2 font-weight-light">{{ cv.phone }}</td>
                </tr>
              {% endif %}
              {% if cv.address %}
                <tr>
                  <td class="p-1 pr-2 font-weight-bold"><b>Location</b></td>
                  <td class="p-1 pl-2 font-weight-light">
                    {% if cv.address.street %}{{ cv.address.street }}, {% endif %}
                    {% if cv.address.city %}{{ cv.address.city }}, {% endif %}
                    {% if cv.address.region %}{{ cv.address.region }} {% endif %}
                    {% if cv.address.postalCode %}{{ cv.address.postalCode }}{% endif %}
                  </td>
                </tr>
              {% endif %}
              {% if cv.website %}
                <tr>
                  <td class="p-1 pr-2 font-weight-bold"><b>Website</b></td>
                  <td class="p-1 pl-2 font-weight-light">
                    <a href="{{ cv.website }}" target="_blank">{{ cv.website }}</a>
                  </td>
                </tr>
              {% endif %}
            </table>
          </section>
        {% endif %}

        {% if cv.summary %}
          <section class="mt-5" aria-labelledby="professional-summary">
            <h2 id="professional-summary" class="h3 font-weight-medium border-bottom pb-2 mb-3">Professional Summary</h2>
            <p class="font-weight-light">{{ cv.summary | markdownify | remove: '<p>' | remove: '</p>' }}</p>
          </section>
        {% endif %}

        {% for section_pair in cv.sections %}
          {% assign section_title = section_pair[0] %}
          {% assign section_entries = section_pair[1] %}
          <section class="mt-5" aria-labelledby="{{ section_title | slugify }}">
            <h2 id="{{ section_title | slugify }}" class="h3 font-weight-medium border-bottom pb-2 mb-3">{{ section_title }}</h2>
            {% if section_title == 'Research Projects' %}
              <p class="font-weight-light mb-2"><strong>Role:</strong> Researcher on all listed projects unless otherwise noted.</p>
            {% endif %}
            <ul class="card-text font-weight-light list-group list-group-flush">
              {% if section_title == 'Profile' %}
                <li class="list-group-item px-0 py-3">
                  Human factors researcher studying human states, user experience, and human–technology interaction through physiological and behavioral measures. Research
                  interests span psychophysiological assessment, human factors and UX, and human–AI interaction.
                </li>
              {% elsif section_title == 'Professional Experience' %}
                <li class="list-group-item px-0 py-3">
                  <strong class="d-block mb-1">Incoming Postdoctoral Researcher</strong>
                  <span class="d-block">MUSE Lab., Hanyang University</span>
                  <em class="d-block mt-1">Expected start: September 2026.</em>
                </li>
                <li class="list-group-item px-0 py-3">
                  <strong class="d-block mb-1">Researcher</strong>
                  <span class="d-block">Korea Automobile Testing & Research Institute (KATRI), Korea Transportation Safety Authority</span>
                  <em class="d-block mt-1">July 2013–April 2016</em>
                  <ul class="mb-0 mt-2 pl-3">
                    <li>
                      Contributed to the project “Development of Certification Standard and Test Procedure for the Motor Vehicle Tuning,” focusing on automotive lighting
                      systems.
                    </li>
                    <li>Conducted self-certification compliance investigations for motor vehicles and vehicle parts, focusing on automotive lighting systems.</li>
                  </ul>
                </li>
              {% elsif section_title == 'Academic Background' %}
                <li class="list-group-item px-0 py-3">
                  <strong class="d-block mb-1">Ph.D. in Industrial and Management Engineering</strong>
                  <span class="d-block">Hanyang University · September 2017–August 2026</span>
                  <span class="d-block mt-2"
                    ><strong>Dissertation:</strong> Machine Learning-Based Classification of High-Risk Gaming Disorder Groups Using EEG Relative Power Following In-Game
                    Kill/Death Events: Exploration of Neurophysiological Candidate Parameters.</span
                  >
                  <span class="d-block mt-1"><strong>Advisors:</strong> Jeongeun Park and Jung-Yong Kim.</span>
                </li>
                <li class="list-group-item px-0 py-3">
                  <strong class="d-block mb-1">Bachelor's degree in Mechanical Engineering</strong>
                  <span class="d-block">Hanyang University ERICA · March 2007–August 2013</span>
                  <span class="d-block mt-1"><strong>Second Major:</strong> Design Engineering.</span>
                </li>
              {% elsif section_title == 'Research Interests' %}
                <li class="list-group-item px-0 py-3">Human Factors & User Experience</li>
                <li class="list-group-item px-0 py-3">Psychophysiological Assessment</li>
                <li class="list-group-item px-0 py-3">Human–AI Interaction</li>
              {% elsif section_title == 'Research Projects' %}
                {% for entry in section_entries %}
                  {% assign project_parts = entry.bullet | split: '**' %}
                  {% assign project_metadata = project_parts[2] %}
                  {% assign type_parts = project_metadata | split: '). Type / sponsor category: ' %}
                  {% assign category_and_fields = type_parts[1] | split: '. Fields: ' %}
                  <li class="list-group-item px-0 py-2">
                    <div><strong>{{ project_parts[1] }}</strong> — <em>{{ type_parts[0] | remove_first: ' (' }}</em></div>
                    <div class="small text-muted">{{ category_and_fields[0] }} · {{ category_and_fields[1] }}</div>
                  </li>
                {% endfor %}
              {% elsif section_title == 'Journal Articles' or section_title == 'International Conference Papers & Abstracts' or section_title == 'Domestic Conference Presentations & Abstracts' %}
                {% for entry in section_entries %}
                  {% assign rendered_bullet = entry.bullet | markdownify | remove: '<p>' | remove: '</p>' %}
                  {% assign highlighted_authors = rendered_bullet
                    | replace: 'Sungkyun Im', '<strong>Sungkyun Im</strong>'
                    | replace: '임성균', '<strong>임성균</strong>'
                  %}
                  <li class="list-group-item px-0 py-3">{{ highlighted_authors }}</li>
                {% endfor %}
              {% elsif section_title == 'Methods & Technical Expertise' %}
                <li class="list-group-item px-0 py-2">
                  <strong class="d-block mb-1">Physiological & Behavioral Measurement</strong>
                  EEG · ECG/HRV · EMG · Eye Tracking · Questionnaires
                </li>
                <li class="list-group-item px-0 py-2">
                  <strong class="d-block mb-1">Experimental & User Research</strong>
                  Experimental Design · User Studies · Usability & UX Evaluation · Psychophysiological Evaluation
                </li>
                <li class="list-group-item px-0 py-2">
                  <strong class="d-block mb-1">Quantitative Analysis</strong>
                  Psychophysiological Signal Analysis · Statistical Modeling · Machine Learning
                </li>
              {% else %}
                {% for entry in section_entries %}
                  {% if entry.bullet %}
                    {% assign rendered_bullet = entry.bullet | markdownify | remove: '<p>' | remove: '</p>' %}
                    <li class="list-group-item px-0 py-3">{{ rendered_bullet | replace: '<strong>', '<strong class="d-block mb-1">' }}</li>
                  {% elsif entry.label %}
                    <li class="list-group-item px-0 py-2">
                      <strong>{{ entry.label }}:</strong> {{ entry.details }}
                    </li>
                  {% endif %}
                {% endfor %}
              {% endif %}
            </ul>
          </section>
        {% endfor %}
      </div>
    </article>

  </div>
{% elsif site.plugins contains 'al_folio_cv' and cv_feature_enabled %}
  {% al_folio_cv_render %}
{% else %}
  <div class="post">
    <header class="post-header">
      <h1 class="post-title">{{ page.title }}</h1>
      <p class="post-description">CV rendering is unavailable.</p>
    </header>
    <article>
      <p>Enable the <code>al_folio_cv</code> plugin and set <code>al_folio.features.cv.enabled: true</code> to render this page.</p>
    </article>
  </div>
{% endif %}
