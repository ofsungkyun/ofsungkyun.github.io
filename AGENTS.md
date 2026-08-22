# Agent Guidelines for Sungkyun Im's Academic Website

This file is the authoritative project-level entry point for agents working in this repository. Read it before inspecting, modifying, validating, committing, or deploying the site. Keep this file concise; use the linked architecture documents and workflow SOP for detailed procedures.

## 1. Project identity

- This repository is Sungkyun Im's personal academic website, based on al-folio v1.x and intended for deployment with GitHub Pages.
- Repository: <https://github.com/ofsungkyun/ofsungkyun.github.io>
- Production site: <https://ofsungkyun.github.io>
- This is a GitHub Pages user site. `_config.yml` must use `url: https://ofsungkyun.github.io` and keep `baseurl` present with an empty value.
- The default Docker development URL is <http://localhost:8080/>. Do not apply the upstream demo's `/al-folio/` project-page path to this site.
- Preserve the existing al-folio structure. Inspect the repository state and relevant files before editing, make only requested changes, and do not perform unsolicited refactoring, dependency updates, migrations, redesigns, or cleanup.

## 2. Academic content rules

- Never invent education, affiliation, title, employment, research experience, research results, publications, projects, awards, grants, or other professional facts.
- Use only information explicitly provided by the user or verifiably present in the repository.
- Never guess publication metadata, DOI, author order, author names, venue or journal names, volume, issue, pages, status, or publication year.
- Clearly distinguish real personal content from bundled al-folio example content.
- Do not expose example data in navigation, the home page, metadata, or production-facing content in a way that could be mistaken for Sungkyun Im's real information.
- Before publishing academic content, verify names, dates, links, identifiers, and attribution against the supplied source material.

## 3. Route your change

Use this table before editing. Read [`docs/BOUNDARIES.md`](docs/BOUNDARIES.md) when ownership is not obvious.

| Change | Primary location or owner |
| --- | --- |
| Dependency pin or bundled plugin activation | This repository: the relevant dependency in `Gemfile` **and** plugin registration in `_config.yml`; keep both lists aligned |
| Site identity, URL, feature flag, or site-wide configuration | This repository: `_config.yml`, subject to the plugin activation contract below |
| Personal content, bibliography, and data | This repository: `_pages`, `_posts`, `_projects`, `_news`, `_teachings`, `_books`, `_bibliography`, `_data`, and scoped assets |
| Project rules and long-form documentation | `AGENTS.md` for mandatory agent rules; `docs/` for detailed guidance |
| Cross-plugin integration or visual regression test | This repository: `test/integration_*.sh` or `test/visual/` |
| Base layout, shared include, publication/repository card, or common runtime primitive | `al_folio_core`; use a personal-site override only under the override policy below |
| Liquid tag, filter, generator, or rendered feature behavior | The gem that registers or owns it; consult the delegation table in `docs/ARCHITECTURE.md` |
| Search, comments, cookies, icons, CV, Distill, analytics, citations, images, math, charts, newsletter, email protection, RTL, or marimo runtime | The corresponding `al-*` feature gem listed in `docs/BOUNDARIES.md` |
| Component/unit test for gem-owned behavior | The owning gem repository, not this personal-site repository |
| New reusable feature without an owner | Propose a standalone plugin/owner first; do not embed a new shared runtime pipeline in this site by default |

If required information or ownership is uncertain, do not guess. Report the uncertainty and request direction when it materially affects the result.

## 4. al-folio ownership and feature contracts

### Runtime ownership

- This personal-site repository owns its content, site configuration, plugin wiring, documentation, and site-level/cross-plugin validation.
- `al_folio_core` is the configured theme runtime. It owns the base layouts and includes, shared CSS/JavaScript, common runtime primitives, publication/repository cards, and upgrade contracts.
- Each feature/plugin gem owns its tags, filters, generators, runtime assets, and feature-specific behavior. The authoritative area-to-gem mapping is [`docs/BOUNDARIES.md`](docs/BOUNDARIES.md).
- `al_folio_plugins` is a `Gemfile` dependency group, not a runtime owner or theme name. The individual gems inside it are the owners.
- Do not introduce unverified owner names. This repository uses `theme: al_folio_core`.

### Plugin activation contract and silent failures

Adding, removing, enabling, or disabling a plugin/feature may require all applicable layers:

1. A pinned dependency in the `Gemfile` `group :al_folio_plugins` block.
2. The corresponding registration in the `_config.yml` `plugins:` list.
3. The relevant site-wide feature flag or provider configuration in `_config.yml`.
4. The required page/front-matter opt-in, such as a feature key or `layout: cv` / `layout: distill`.

Changing only some layers can fail silently: the build may succeed while the feature renders nothing. When a feature does not appear, verify the dependency, plugin registration, site flag, page opt-in, and any required `third_party_libraries` entry/SRI hash in that order. Repository directories commonly use hyphens while gem/plugin IDs use underscores.

Keep the required `al_folio` v1 contract keys in `_config.yml`; run the upgrade audit when plugin wiring or those contract keys change. See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the authoritative contract and wrapper/tag/gem delegation details.

## 5. Personal-site override policy

- Do not override gem-owned layouts, includes, Sass, Liquid behavior, or feature runtime by default.
- If a personal-site requirement genuinely needs a local override, first inspect [`docs/BOUNDARIES.md`](docs/BOUNDARIES.md) and [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), confirm the owning gem, and keep the override to the smallest practical surface.
- Prefer configuration, front matter, data, or supported extension points over copying runtime files.
- Track intentional overrides and upstream drift with the documented commands when available:

  ```bash
  bundle exec al-folio upgrade overrides audit
  bundle exec al-folio upgrade overrides diff <path>
  bundle exec al-folio upgrade overrides accept <path>
  ```

- Review and commit `.al-folio-overrides.yml` when an intentional override is accepted.
- Do not unnecessarily recreate a starter-local Tailwind/CSS build, vendored runtime, icon-font bundle, or parallel JavaScript pipeline.
- `npm run lint:style-contract` reflects the upstream starter contract and may reject an otherwise legitimate personal-site override. Treat such a failure as a signal to review ownership and override intent, not as permission to bypass the check silently.

## 6. Git safety rules

- Do not run `git push` without the user's explicit request for that push.
- Do not run `git pull` or fetch-and-integrate changes without the user's explicit request.
- Do not create, switch, rename, merge, or rebase branches without the user's explicit request.
- Do not change global or repository-local Git configuration, remotes, credentials, or Git Credential Manager state without the user's explicit request.
- Do not use destructive Git commands such as `git reset --hard`, forced checkout, forced push, or history rewriting unless the user explicitly requests the exact operation and its consequences are understood.
- Preserve unrelated user changes. If unexpected changes, conflicts, untracked files, detached HEAD, or an unexpected branch are found, stop before staging or committing and report them.
- Before every commit, inspect `git status`, `git diff --stat`, and `git diff --check`.
- Stage only the expected files. Recheck the staged file list and staged diff before committing.
- Treat push as a separate operation requiring separate approval after a commit.

## 7. Validation and formatting rules

### Formatting

- The repository uses Prettier with `@shopify/prettier-plugin-liquid`, `printWidth: 150`, and the settings in `.prettierrc`.
- After dependencies are installed with `npm ci`, use `npm run lint:prettier` to check repository formatting.
- Do not invent formatting commands. If the configured command is unavailable, report that limitation and consult `package.json`, `.prettierrc`, and `docs/CONTRIBUTING.md`.

### Select validation by change type

Do not run the entire suite for every edit. Use the smallest relevant set and report anything that could not be verified.

| Change type | Expected validation |
| --- | --- |
| Documentation only | `git diff --check`; inspect links, commands, scope, and changed-file list |
| Content or site configuration | `git diff --check`; `npm run lint:prettier` when available; `bundle exec jekyll build` or Docker/Jekyll build; verify <http://localhost:8080/> and affected pages/assets/links |
| Plugin or dependency wiring | Confirm `Gemfile` and `_config.yml` agree; run `bundle install` only when authorized; run `bundle exec al-folio upgrade audit`; run the affected `test/integration_*.sh` scripts |
| Layout/style/runtime override | Formatting check, Jekyll/Docker build, relevant integration tests, `bundle exec al-folio upgrade overrides audit`, and review of `.al-folio-overrides.yml`; use `npm run lint:style-contract` as the ownership diagnostic described above |
| Visual behavior | Browser verification and `npm run test:visual`; install the documented Playwright browsers first only when required and authorized |
| Upgrade or override maintenance | `bundle exec al-folio upgrade audit`, `bundle exec al-folio upgrade overrides audit`, `bundle exec al-folio upgrade report`, and `bash test/integration_upgrade_cli.sh` when the change touches that workflow |

The documented cross-plugin tests are:

```bash
bash test/integration_comments.sh
bash test/integration_plugin_toggles.sh
bash test/integration_distill.sh
bash test/integration_bootstrap_compat.sh
bash test/integration_upgrade_cli.sh
bash test/integration_css_minify.sh
bash test/integration_new_plugins.sh
```

After changing site files, prefer the Docker-based al-folio environment when available. Check the build result, HTTP response, local CSS and JavaScript, images/static assets, relevant internal links, navigation, and browser console. Report build errors, asset failures, broken links, console errors, and material warnings with evidence.

If validation fails, diagnose within the requested scope. Do not expand into dependency upgrades, broad fixes, or unrelated refactoring without approval. If Docker Desktop is stopped, report that state; start it only when the task authorizes local execution or the user approves starting it.

## 8. Deployment rules

- Deploy to GitHub Pages only when the user explicitly requests deployment.
- Before deployment, confirm the current branch, clean working tree, intended commits, repository remote, and local-versus-`origin/main` status.
- Verify that real content and bundled example content are clearly separated and that no example content is unintentionally exposed.
- Confirm `url: https://ofsungkyun.github.io` and an empty `baseurl` before production deployment.
- Complete a local production-relevant build and root-URL smoke test before pushing deployable changes when the environment permits.
- After an authorized push, verify the GitHub Actions deployment result and smoke-test <https://ofsungkyun.github.io>.

## 9. Communication rules

- At the start of a task, briefly state the planned scope and validation approach.
- At completion, summarize modified files, important decisions, validation results, Git status, and remaining risks.
- Mark unavailable or unverifiable information as `Unable to verify`.
- Support important judgments with concrete evidence such as file paths, configuration values, command output, build logs, or browser checks.
- Separate confirmed facts from inferences, and label consequential inferences clearly.

## 10. Project workflow

[`docs/codex-workflow.md`](docs/codex-workflow.md) is the authoritative SOP for session start, work, validation, session end, commits, and deployment. Link to it rather than copying its reusable prompts into this file.

## 11. Further reading and conditional upstream contribution

- [`docs/BOUNDARIES.md`](docs/BOUNDARIES.md) — authoritative area-to-gem ownership table and test ownership.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — feature gating, dependency/registration contract, v1 config contract, delegation, and local overrides.
- [`docs/INSTALL.md`](docs/INSTALL.md) — personal-site setup, Docker, build, deployment, and upgrade procedures.
- [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) — upstream starter contribution and validation guidance.
- [`docs/README.md`](docs/README.md) — documentation index.

When intentionally contributing a generally useful fix upstream, route starter wiring/docs/content/cross-plugin tests to the al-folio starter and route gem-owned runtime/component behavior to the owning gem. Do not treat ordinary personal-site work as an upstream PR by default.
