# Codex Website Workflow

This document is the operating procedure for maintaining Sungkyun Im's al-folio academic website. Run commands from `C:\Projects\ofsungkyun.github.io` unless a task explicitly requires another location.

## Workflow at a glance

- Start: `Quick Resume -> Session Start -> Work`
- During work: `Inspect -> Plan -> Modify -> Validate -> Review diff`
- End: `Session End -> Commit Procedure when approved -> Session Shutdown`
- Deployment: run the Deployment Procedure only after separate, explicit user approval.

## Command Shortcuts

These commands are aliases and entry points for the detailed procedures below. They do not replace, shorten, or bypass any safety check. Deployment is outside these shortcuts and always requires separate, explicit user approval.

### `작업 시작` / `Start work`

Interpret either command as authorization to run this sequence:

`Quick Resume -> Session Start -> restore the local development environment -> verify localhost`

1. Run the complete Quick Resume procedure, including every Session Start safety check.
2. Stop immediately and report if Git has conflicts, an unexpected branch, a detached HEAD, or unexplained staged, unstaged, or untracked changes.
3. If the Git state is safe, restore the Docker development environment. For this shortcut, the user authorizes starting Docker Desktop when necessary and starting this repository's al-folio Docker Compose service.
4. Verify <http://localhost:8080/> and report material build, HTTP, asset, or container errors.
5. If the checks pass, report `Ready to work`.

This shortcut authorizes environment restoration and safety checks only. It does not authorize repository file changes, commits, pushes, pulls, fetch-and-integrate operations, branch changes, Git configuration changes, or credential changes.

### `작업 종료` / `End work`

Interpret either command as authorization to run this sequence:

`Session End -> user-approved Commit Procedure when needed -> Session Shutdown`

1. Run the complete Session End procedure, including diff, security, build, localhost, and Git-state validation.
2. If there are no changes, or all intended changes are already committed and the working tree is clean, continue to Session Shutdown, stop this repository's Docker Compose service gracefully, and report the result.
3. If expected but uncommitted changes remain, do not commit automatically. Report either `COMMIT recommended` or `COMMIT deferred`, explain the basis, propose an appropriate commit message, and wait for user approval. Do not proceed to Session Shutdown before that approval and a successful commit leave the working tree clean.
4. If there are unexpected changes, conflicts, security concerns, or validation failures, stop the end-work sequence and report them.

This shortcut authorizes Session End validation and, only when the repository is already in a safe clean state, Session Shutdown. It does not authorize an automatic commit, push, pull, branch change, Git configuration change, credential change, or quitting Docker Desktop.

### `commit 진행` / `Proceed with commit`

Interpret either phrase as approval to run the complete Commit Procedure only for the exact changes presented for review in the immediately preceding Session End report.

1. Confirm that the proposed commit message and reviewed file set match the user's approval before staging.
2. Stop if any unexpected file or diff appears.
3. Stage only the reviewed paths, run the staged-diff checks, commit with the approved message, and verify the resulting commit and working tree.
4. Do not push.
5. If the commit succeeds, the working tree is clean, and the user had already invoked `작업 종료` or `End work` for this session, continue with Session Shutdown and report the shutdown result.

Shortcut precedence is therefore:

- `작업 시작` -> Quick Resume -> Session Start
- `작업 종료` -> Session End -> user approval when a commit is needed -> Commit Procedure -> Session Shutdown
- Deployment -> separate explicit user approval; never implied by any shortcut above

## 1. Quick Resume

Use this entry point to restore the local development environment with minimal instructions. Quick Resume does not replace or skip any Session Start safety check.

1. Confirm that the repository is `C:\Projects\ofsungkyun.github.io`.
2. Complete the full [Session Start](#2-session-start) procedure and inspect the Git state before changing files or starting services.
3. Stop and report if there are conflicts, an unexpected branch, a detached HEAD, or unexplained staged, unstaged, or untracked changes.
4. If the Git state is safe, check Docker Desktop, Docker Engine, Docker Compose, and the al-folio Compose service.
5. If Docker Desktop is stopped, follow the user's authorization and the existing workflow rules before starting it. Do not start it silently.
6. When Docker is available and local execution is authorized, start the al-folio service with `docker compose up -d` and inspect its logs.
7. Verify <http://localhost:8080/>, including its HTTP response and material build or asset errors.
8. If all required checks pass, report `Ready to work`. Do not modify any file during Quick Resume.

### Quick resume prompt

```text
Resume the website project at C:\Projects\ofsungkyun.github.io using the Quick Resume procedure. Complete every Session Start safety check, restore the authorized local Docker development environment, verify http://localhost:8080/, and report "Ready to work" when it is safe. Do not modify site content or any repository file.
```

## 2. Session Start

Use this sequence before changing files:

1. Confirm the repository root with `git rev-parse --show-toplevel`.
2. Confirm the current branch with `git branch --show-current` and ensure HEAD is not detached.
3. Run `git status` and inspect staged, unstaged, untracked, and conflicted files separately.
4. Review recent work with `git log -3 --oneline` and record `git rev-parse HEAD`.
5. Confirm the origin URL with `git remote get-url origin`.
6. Compare the local branch with the locally available tracking ref using `git rev-list --left-right --count origin/main...HEAD`. State clearly that this does not contact GitHub unless a fetch was separately authorized.
7. Stop if the branch is unexpected or if there are conflicts or unexplained changes.
8. Check Docker Desktop, Docker Engine, Docker Compose, and the al-folio Compose service without starting anything automatically.
9. If Docker Desktop is stopped, report that normal state and ask the user to start it or authorize starting it when local validation is required.
10. When Docker is available and local execution is authorized, run `docker compose up -d`, inspect `docker compose logs`, and verify <http://localhost:8080/>.
11. Decide whether the requested work can proceed safely and report either `Ready to resume` or `Review required before resuming`.

### Resume-work prompt

Copy and adapt this prompt when starting a session:

```text
Resume work on the academic website repository at:
C:\Projects\ofsungkyun.github.io

Before modifying anything, inspect the current repository and report:
- repository root and current branch
- git status, staged/unstaged/untracked files, and conflicts
- the three most recent commits and current HEAD
- origin URL and local ahead/behind relative to the currently available origin/main tracking ref
- Docker Desktop, Docker Engine, Docker Compose, and al-folio container status
- whether http://localhost:8080/ is available if the container is already running
- whether the site identity, empty baseurl, and hidden example-content navigation remain intact

Do not assume the previous session state is still current. Do not modify files, commit, push, pull, change branches, change Git settings, change credentials, or start Docker Desktop during this inspection. Stop and report any unexpected state. Finish with either "Ready to resume" or "Review required before resuming" and explain why.
```

## 3. During Work

Follow this loop for each scoped task:

### Inspect

- Read `AGENTS.md` and the files directly related to the request.
- Check al-folio ownership in `docs/BOUNDARIES.md` before changing layouts, includes, styles, Liquid behavior, or plugin features.
- Identify current example content and ensure it is not confused with real academic data.

### Plan

- State the intended files, the smallest viable change, and the planned validation.
- Identify missing source information before authoring academic content.
- Keep dependency, runtime, and design work outside the plan unless explicitly requested.

### Modify

- Edit only the planned files.
- Preserve the al-folio structure and unrelated user changes.
- Never invent personal, professional, research, or publication facts.

### Validate

- Run focused syntax, formatting, or content checks appropriate to the changed files.
- When Docker is available, rebuild or restart the Compose service as needed and inspect Jekyll logs.
- Test <http://localhost:8080/>, local assets, relevant internal links, navigation, and browser console behavior.
- Record warnings separately from blocking errors.

### Review diff

- Run `git status`, `git diff --stat`, and `git diff --check`.
- Review `git diff` for every changed file.
- Confirm that no sensitive data, credentials, tokens, personal details not intended for publication, or bundled example facts were introduced.
- Do not stage or commit unless the user asks.

## 4. Session End

Use this sequence before ending work:

1. Run `git status` and record the current branch.
2. List every modified, staged, and untracked file.
3. Run `git diff --stat` and `git diff --check`.
4. Review the actual diff for scope, correctness, secrets, credentials, private contact information, and unintended academic claims.
5. Confirm the Docker/Jekyll build and inspect material warnings and errors when site files changed.
6. Check <http://localhost:8080/> and the affected pages, assets, links, navigation, and browser console when applicable.
7. Decide whether a checkpoint commit is appropriate, but do not create it without explicit approval.
8. State whether a push is needed, but do not push without explicit approval.
9. Report whether the Docker container is running and may be stopped, but do not stop it automatically.
10. Finish with a clear assessment of whether it is safe to end the session.

### End-work prompt

Copy and adapt this prompt when ending a session:

```text
Prepare an end-of-session report for:
C:\Projects\ofsungkyun.github.io

Perform status checks and validation only. Report:
- current branch, HEAD, and git status
- staged, unstaged, and untracked files
- changed-file list, git diff --stat, and git diff --check
- whether the diff contains secrets, credentials, unintended private information, unsupported academic claims, or exposed al-folio example content
- Docker Desktop, Engine, Compose, and al-folio container status
- Docker/Jekyll build result and material warnings/errors if site files changed
- localhost URL, HTTP result, and affected-page/asset/link/console validation
- whether a checkpoint commit is recommended
- whether the session can end safely

Do not commit, push, pull, fetch, create or change branches, alter Git settings, alter credentials, stop Docker, or modify files. If validation cannot be performed, state "Unable to verify" and explain why.
```

## 5. Commit Procedure

Use a commit only after the user explicitly approves it:

1. Confirm the expected branch and run `git status`.
2. Run `git diff --stat`, `git diff --check`, and review the complete diff.
3. Compare the changed-file list with the approved scope. Stop if anything is unexpected.
4. Stage only the expected paths explicitly; avoid broad staging when unrelated work may exist.
5. Inspect `git diff --cached --name-only`, `git diff --cached --stat`, and the staged diff.
6. Commit with the exact approved message.
7. Record the full commit hash, message, author, and included file count.
8. Confirm `git status` and whether the working tree is clean.
9. Report ahead/behind relative to the locally available `origin/main` tracking ref.
10. Do not push. Treat push as a separate action requiring explicit user approval.

## 6. Session Shutdown

Use this sequence only after Session End validation and any explicitly approved commit are complete. Its purpose is to leave both Git and the local development environment in a safe, durable state.

1. Run `git status` again and record the current branch.
2. Confirm that the working tree is clean, including staged, unstaged, and untracked files.
3. If any uncommitted change remains, stop the shutdown procedure and report the exact files. Do not discard, restore, or modify them.
4. Compare the local branch with the locally available `origin/main` tracking ref and report the number of local-only commits when the branch is ahead. Make clear that this comparison does not contact GitHub unless a fetch was separately authorized.
5. Do not push unpushed commits unless the user separately and explicitly requests a push. Local-only commits remain safely stored in the repository.
6. Check the al-folio Docker Compose service and container status.
7. When the user has requested session shutdown and the Git state is safe, stop this repository's Compose service gracefully with `docker compose down`.
8. Confirm that the repository's al-folio containers have stopped.
9. Do not quit Docker Desktop itself unless the user explicitly requests it.
10. Report whether Codex can be closed while preserving the repository files and commits safely.

During Session Shutdown, do not push, pull, change branches, alter Git settings or credentials, or make unexpected file changes.

### Shutdown prompt

```text
Prepare C:\Projects\ofsungkyun.github.io for shutdown using the Session Shutdown procedure. Confirm that the Git state is safe, report any local-only commits, and do not push. Only after the repository is safe, stop this repository's al-folio Docker Compose service and confirm that Codex can be closed without losing files or commits. Do not quit Docker Desktop.
```

## 7. Deployment Procedure

Use this as the minimum outline for the first GitHub Pages deployment. Do not deploy merely because these checks pass.

1. Confirm the repository is `ofsungkyun/ofsungkyun.github.io`, the intended branch is `main`, and the working tree is clean.
2. Confirm that all intended changes are committed and review commits not yet present in the local `origin/main` tracking ref.
3. Verify `_config.yml` uses `url: https://ofsungkyun.github.io` and an empty `baseurl`.
4. Audit the home page, navigation, metadata, publications, projects, CV, news, posts, teaching, books, repositories, and profile data for unintended al-folio examples or private information.
5. Start Docker only with authorization, run the al-folio service, inspect Jekyll logs, and test <http://localhost:8080/>.
6. Check CSS, JavaScript, images, static assets, internal links, navigation, and browser console errors.
7. Review `git status`, `git diff --check`, the commit list, remote URL, and ahead/behind state again.
8. Ask for explicit approval to push the reviewed commit or commits to `origin/main`.
9. After an authorized push, monitor the GitHub Actions deployment workflow and report any failure without making unrelated fixes.
10. Verify the production root at <https://ofsungkyun.github.io>, including assets, links, navigation, metadata, and absence of unintended example content.
