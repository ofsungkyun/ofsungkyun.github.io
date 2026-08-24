# Codex Website Workflow

This document is the operating procedure for maintaining Sungkyun Im's al-folio academic website. Run commands from `C:\Projects\ofsungkyun.github.io` unless a task explicitly requires another location.

## Workflow at a glance

- Cold start: `AGENTS.md bootstrap -> load this workflow -> interpret shortcuts`
- Start: `작업 시작 -> Quick Resume -> remote-aware Session Start -> restore localhost -> Work`
- During work: `Inspect -> Plan -> Modify -> Validate -> Review diff`
- Review and publication: `Session End / explicit review -> commit 진행 -> push 진행 -> continue work or 작업 종료`
- End: `작업 종료 -> Session End -> approved Commit Procedure when needed -> remote-state report -> Session Shutdown`

Commit and push are always separate approval stages. A commit never implies a push, and an end-work request never implies a push.

Production flow:

`local main -> origin/main -> GitHub Actions -> Deploy site -> gh-pages -> GitHub Pages production`

Production URL: <https://ofsungkyun.github.io/>

## Command Shortcuts

These commands are aliases and entry points for the detailed procedures below. They do not replace, shorten, or bypass any safety check. `commit 진행` and `push 진행` are separate explicit approvals; only `push 진행` authorizes the reviewed non-force source push and its resulting automatic deployment verification. Manual deployment actions and workflow reruns require separate authorization.

### `작업 시작` / `Start work`

Interpret either command as authorization to run this sequence:

`confirm bootstrap -> Quick Resume -> remote-aware Session Start -> restore the local development environment -> verify localhost`

1. Confirm that the root `AGENTS.md` bootstrap and this workflow are loaded for the current session.
2. Confirm the repository path, expected `main` branch, attached HEAD, and working-tree state.
3. Run `git fetch origin` without integrating changes, then calculate `origin/main...HEAD` ahead/behind counts.
4. Apply the divergence policy below. Stop for conflicts, an unexpected branch, a detached HEAD, unexplained staged/unstaged/untracked changes, a behind state, or a diverged state.
5. If Git is safe for work, restore the Docker development environment. This shortcut authorizes starting Docker Desktop when necessary and starting this repository's al-folio Docker Compose service.
6. Inspect the Compose service and Jekyll logs, then verify <http://localhost:8080/> and material HTTP, asset, build, or container errors.
7. If all required checks pass, report `Ready to work`.

Divergence policy after the fetch:

- Ahead `0`, behind `0`: start work normally.
- Ahead greater than `0`, behind `0`: report the local-only commits. Work may start when the working tree is clean and no other problem exists, but do not push.
- Ahead `0`, behind greater than `0`: stop before work and report that remote commits must be reviewed. Do not pull or integrate automatically.
- Ahead greater than `0`, behind greater than `0`: stop before work and report the diverged state. Do not merge, rebase, or reset automatically.

This shortcut authorizes `git fetch origin`, environment restoration, and safety checks only. It does not authorize repository file changes, commits, pushes, pulls, merges, rebases, resets, branch changes, Git configuration changes, or credential changes.

### `commit 진행` / `Proceed with commit`

Interpret either phrase as approval to run the complete Commit Procedure only for the exact changes presented in the immediately preceding Session End report or another explicit review.

1. Confirm that the proposed checkpoint commit message and reviewed file set match the user's approval before staging.
2. Stop if any unexpected file or diff appears.
3. Stage only the reviewed paths, rerun `git diff --check`, inspect the staged file list and complete staged diff, and create the approved checkpoint commit.
4. Report the resulting working tree, local HEAD, and ahead/behind counts relative to the locally available `origin/main` tracking ref.
5. Do not push. A separate `push 진행` / `Proceed with push` approval is required.
6. If the user had already invoked `작업 종료` / `End work`, resume that end-work sequence after the successful commit; report any local-only commit before deciding whether shutdown is safe.

### `push 진행` / `Proceed with push`

Interpret either phrase as approval to run the complete Push Procedure for the already reviewed local-only commit or commits.

1. Confirm that the branch is `main` and the working tree is clean.
2. Run `git fetch origin`, recalculate divergence, and list the local-only commits.
3. Push only when ahead is greater than `0`, behind is `0`, the working tree is clean, and the refreshed remote contains no unexpected change.
4. Push `main` to `origin/main` without force. Do not push any other ref or modify `gh-pages` directly.
5. Fetch and verify the local/remote HEADs and `0/0` divergence after the push, including whether an unexpected bot commit appeared on remote `main`.
6. Automatically monitor the push-triggered GitHub Actions workflows that apply to the changed paths: Deploy site, CodeQL Advanced, Upgrade contract checks, Prettier code formatter, Personal site smoke test, and Broken links — deployed site (`Check for broken links on site`), which follows a successful deployment.
7. Do not trigger manual-only workflows: Render a CV, Axe accessibility (`Axe accessibility testing`), Visual Regression (`Visual regression checks`), or Update Citations (`Update Google Scholar Citations`).
8. After a successful Deploy site run, verify the generated `gh-pages` update and the HTTP response from <https://ofsungkyun.github.io/>.
9. If CI or deployment fails, report the evidence and stop. Do not make an unrequested fix or rerun a workflow automatically.

This shortcut does not authorize force push, pull, merge, rebase, reset, amend, workflow reruns, direct `gh-pages` changes, GitHub Settings changes, branch changes, Git configuration changes, or credential changes.

### `작업 종료` / `End work`

Interpret either command as authorization to run this sequence:

`Session End -> approved Commit Procedure when needed -> remote-state assessment -> Session Shutdown`

1. Run the complete Session End procedure, including changed-file, diff, validation, build/browser applicability, security/privacy, localhost, and Git-state checks.
2. If expected uncommitted changes remain, do not commit automatically. Report `COMMIT recommended` or `COMMIT deferred`, propose a commit message when appropriate, stop the end-work sequence, and wait for `commit 진행` / `Proceed with commit`.
3. If the working tree is clean, inspect local `main` against the available `origin/main` tracking ref:
   - Ahead `0`, behind `0`: proceed to safe shutdown.
   - Ahead greater than `0`, behind `0`: clearly report the unpushed local commit or commits. Do not push. The user may end without pushing; explain that those commits exist only in this local repository until pushed.
   - Behind greater than `0` or diverged: report that remote review is required and state whether shutdown can preserve the current local state safely. Do not integrate automatically.
4. When the repository state is safe for shutdown, stop this repository's Docker Compose service gracefully and confirm that it stopped.
5. Do not quit Docker Desktop itself.
6. Report whether Codex can be closed without losing repository files or commits.

This shortcut does not authorize an automatic commit, push, pull, fetch, merge, rebase, reset, branch change, Git configuration change, credential change, or quitting Docker Desktop.

Shortcut precedence and separation are therefore:

- `작업 시작` -> bootstrap confirmation -> fetch-aware Quick Resume -> Session Start
- `commit 진행` -> reviewed checkpoint commit only; no push
- `push 진행` -> safe non-force push -> CI/deployment verification
- `작업 종료` -> Session End -> commit approval when needed -> remote-state report -> Session Shutdown; no automatic push

## 1. Quick Resume

Use this entry point to restore the local development environment with minimal instructions. Quick Resume does not replace or skip any Session Start safety check.

1. Confirm that the repository is `C:\Projects\ofsungkyun.github.io` and that the cold-start bootstrap has loaded `AGENTS.md` and this workflow.
2. Complete the full [Session Start](#2-session-start) procedure and inspect Git before changing files or starting services.
3. When Quick Resume was invoked by `작업 시작` / `Start work`, use that shortcut's authorization to run `git fetch origin` and apply its divergence policy. Otherwise, fetch only with separate user authorization.
4. Stop and report if there are conflicts, an unexpected branch, a detached HEAD, unexplained staged/unstaged/untracked changes, a behind state, or a diverged state.
5. If the Git state permits work, check Docker Desktop, Docker Engine, Docker Compose, and the al-folio Compose service.
6. If Docker Desktop is stopped, follow the user's authorization and the existing workflow rules before starting it. Do not start it silently.
7. When Docker is available and local execution is authorized, start the al-folio service with `docker compose up -d` and inspect its logs.
8. Verify <http://localhost:8080/>, including its HTTP response and material build or asset errors.
9. If all required checks pass, report `Ready to work`. Do not modify any repository file during Quick Resume.

### Quick resume prompt

```text
Resume the website project at C:\Projects\ofsungkyun.github.io using the Quick Resume procedure. Apply AGENTS.md and docs/codex-workflow.md, complete every Session Start safety check, run git fetch origin without integrating changes, apply the documented divergence policy, restore the authorized local Docker development environment, verify http://localhost:8080/, and report "Ready to work" when it is safe. Do not pull, merge, rebase, reset, push, change branches, or modify any repository file.
```

## 2. Session Start

Use this sequence before changing files:

1. Confirm the repository root with `git rev-parse --show-toplevel`.
2. Confirm the current branch with `git branch --show-current` and ensure HEAD is not detached.
3. Run `git status` and inspect staged, unstaged, untracked, and conflicted files separately.
4. Review recent work with `git log -3 --oneline` and record `git rev-parse HEAD`.
5. Confirm the origin URL with `git remote get-url origin`.
6. When `작업 시작` / `Start work` or another explicit instruction authorizes it, run `git fetch origin`. Otherwise, state that the following comparison uses only the locally available tracking ref and has not contacted GitHub.
7. Compare the local branch with `origin/main` using `git rev-list --left-right --count origin/main...HEAD`, list any local-only or remote-only commits, and apply the documented divergence policy.
8. Stop if the branch is unexpected or if there are conflicts, unexplained changes, a behind state, or a diverged state. An ahead-only clean state may proceed after reporting the unpushed commits.
9. Check Docker Desktop, Docker Engine, Docker Compose, and the al-folio Compose service without starting anything automatically.
10. If Docker Desktop is stopped, report that normal state and ask the user to start it or authorize starting it when local validation is required. The `작업 시작` shortcut supplies this authorization.
11. When Docker is available and local execution is authorized, run `docker compose up -d`, inspect `docker compose logs`, and verify <http://localhost:8080/>.
12. Decide whether the requested work can proceed safely and report either `Ready to resume` or `Review required before resuming`.

### Resume-work prompt

Copy and adapt this prompt when starting a session:

```text
Resume work on the academic website repository at:
C:\Projects\ofsungkyun.github.io

Before modifying anything, inspect the current repository and report:
- repository root and current branch
- git status, staged/unstaged/untracked files, and conflicts
- the three most recent commits and current HEAD
- origin URL; run git fetch origin without integrating changes; report local ahead/behind relative to the refreshed origin/main tracking ref
- Docker Desktop, Docker Engine, Docker Compose, and al-folio container status
- whether http://localhost:8080/ is available if the container is already running
- whether the site identity, empty baseurl, and hidden example-content navigation remain intact

Do not assume the previous session state is still current. Do not modify files, commit, push, pull, merge, rebase, reset, change branches, change Git settings, change credentials, or start Docker Desktop during this inspection. Stop and report any unexpected state, behind state, or divergence. Finish with either "Ready to resume" or "Review required before resuming" and explain why.
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
8. If uncommitted work remains, report `COMMIT recommended` or `COMMIT deferred` and stop before shutdown until the user decides.
9. When the working tree is clean, report local `main` versus the available `origin/main` tracking ref, including local-only commits, remote-only commits, or divergence. State whether a separate `push 진행` would be appropriate, but do not push.
10. Report whether the Docker container is running and may be stopped, but do not stop it automatically during Session End validation.
11. Finish with a clear assessment of whether it is safe to end the session and whether local-only commits would remain only on this PC.

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
- local main versus the available origin/main tracking ref when the working tree is clean, including any local-only commits
- whether a separate push is recommended, without pushing
- whether the session can end safely

Do not commit, push, pull, fetch, create or change branches, alter Git settings, alter credentials, stop Docker, or modify files. If validation cannot be performed, state "Unable to verify" and explain why.
```

## 5. Commit Procedure

Use a commit only after the user explicitly approves the exact changes shown in the immediately preceding Session End report or another explicit review:

1. Confirm the expected branch and run `git status`.
2. Run `git diff --stat`, `git diff --check`, and review the complete diff.
3. Compare the changed-file list with the approved scope. Stop if anything is unexpected.
4. Stage only the expected paths explicitly; avoid broad staging when unrelated work may exist.
5. Inspect `git diff --cached --name-only`, `git diff --cached --stat`, the complete staged diff, and rerun the applicable diff/format validation against the staged content.
6. Commit with the exact approved message.
7. Record the full commit hash, message, author, and included file count.
8. Confirm `git status` and whether the working tree is clean.
9. Record the new local HEAD and report ahead/behind relative to the locally available `origin/main` tracking ref.
10. Do not push. Require a separate `push 진행` / `Proceed with push` approval.

## 6. Push Procedure

Use a push only after the user explicitly invokes `push 진행` / `Proceed with push` for already reviewed and committed changes:

1. Confirm that the repository is `ofsungkyun/ofsungkyun.github.io`, the current branch is `main`, and HEAD is attached.
2. Confirm that the working tree is clean, including staged, unstaged, and untracked files.
3. Record local HEAD and the current `origin/main`, then run `git fetch origin`.
4. Recalculate `origin/main...HEAD` ahead/behind counts and review the local-only commits with `git log origin/main..HEAD`. Stop for an unexpected remote commit, behind state, divergence, unexpected local commit, or empty push set.
5. Proceed only when ahead is greater than `0`, behind is `0`, the working tree is clean, and every local-only commit is within the reviewed scope.
6. Push `main` to `origin/main` using a normal non-force push. Never push `gh-pages` or another branch from this procedure.
7. Fetch `origin` again, record local HEAD and `origin/main`, verify `0/0` divergence, and inspect any unexpected remote-main bot commit before continuing.
8. Monitor the GitHub Actions runs associated with the pushed commit. Account for path filters: applicable automatic workflows include Deploy site, CodeQL Advanced, Upgrade contract checks, Prettier code formatter, and Personal site smoke test; a successful Deploy site run triggers Broken links — deployed site (`Check for broken links on site`).
9. Do not dispatch the manual-only Render a CV, Axe accessibility (`Axe accessibility testing`), Visual Regression (`Visual regression checks`), or Update Citations (`Update Google Scholar Citations`) workflows.
10. After Deploy site succeeds, confirm that `origin/gh-pages` advanced as expected and verify <https://ofsungkyun.github.io/> plus material assets, links, navigation, metadata, and example-content/privacy exposure.
11. If any CI, deployment, `gh-pages`, or production check fails, report the exact evidence and stop. Do not amend, force push, integrate remote changes, modify files, change GitHub Settings, or rerun a workflow without new authorization.

The Push Procedure authorizes only the reviewed non-force `main -> origin/main` push and its read-only CI/deployment verification. It never authorizes pull, merge, rebase, reset, amend, force push, direct `gh-pages` modification, branch changes, Git configuration changes, credential changes, GitHub Settings changes, or workflow reruns.

## 7. Session Shutdown

Use this sequence only after Session End validation and any explicitly approved commit are complete. Its purpose is to leave both Git and the local development environment in a safe, durable state.

1. Run `git status` again and record the current branch.
2. Confirm that the working tree is clean, including staged, unstaged, and untracked files.
3. If any uncommitted change remains, stop the shutdown procedure and report the exact files. Do not discard, restore, or modify them.
4. Compare the local branch with the locally available `origin/main` tracking ref. Report ahead/behind counts and any local-only commits; make clear that this comparison does not contact GitHub unless a fetch was separately authorized.
5. When ahead is greater than `0` and behind is `0`, do not push automatically. The user may choose shutdown without pushing; clearly report that the local-only commits exist only in this repository on this PC until a separate `push 진행` succeeds.
6. When behind is greater than `0` or the branch is diverged, report that remote review is required. If the working tree and local commits are otherwise durable, explain whether shutdown can preserve them safely without implying that new work may start before remote review.
7. Check the al-folio Docker Compose service and container status.
8. When the user has requested session shutdown and the Git state is safe, stop this repository's Compose service gracefully with `docker compose down`.
9. Confirm that the repository's al-folio containers have stopped.
10. Do not quit Docker Desktop itself unless the user explicitly requests it.
11. Report whether Codex can be closed while preserving the repository files and commits safely.

During Session Shutdown, do not push, pull, change branches, alter Git settings or credentials, or make unexpected file changes.

### Shutdown prompt

```text
Prepare C:\Projects\ofsungkyun.github.io for shutdown using the Session Shutdown procedure. Confirm that the Git state is safe, report any local-only commits, and do not push. Only after the repository is safe, stop this repository's al-folio Docker Compose service and confirm that Codex can be closed without losing files or commits. Do not quit Docker Desktop.
```

## 8. Deployment Procedure

Use this as the minimum production-validation outline around an explicitly approved Push Procedure. Do not deploy merely because these checks pass, and do not collapse commit and push into one approval.

1. Confirm the repository is `ofsungkyun/ofsungkyun.github.io`, the intended branch is `main`, and the working tree is clean.
2. Confirm that all intended changes are committed and review commits not yet present in the local `origin/main` tracking ref.
3. Verify `_config.yml` uses `url: https://ofsungkyun.github.io` and an empty `baseurl`.
4. Audit the home page, navigation, metadata, publications, projects, CV, news, posts, teaching, books, repositories, and profile data for unintended al-folio examples or private information.
5. Start Docker only with authorization, run the al-folio service, inspect Jekyll logs, and test <http://localhost:8080/>.
6. Check CSS, JavaScript, images, static assets, internal links, navigation, and browser console errors.
7. Review `git status`, `git diff --check`, the commit list, remote URL, and ahead/behind state again.
8. Ask for the separate `push 진행` / `Proceed with push` approval for the reviewed local-only commit or commits.
9. Follow the complete Push Procedure, including refreshed divergence, GitHub Actions, generated `gh-pages`, and production checks.
10. Report any failure without making unrelated fixes, rerunning workflows, or changing GitHub Settings.

## 9. GitHub production architecture

- Source branch: `main`.
- Generated deployment branch: `gh-pages`.
- GitHub Pages source: `gh-pages` / `(root)`.
- Production URL: <https://ofsungkyun.github.io/>.
- The Deploy site workflow builds from source on `main` and creates or updates `gh-pages`.
- Never edit, commit to, or push `gh-pages` directly. Treat it as generated deployment output.
- A source push flows through `origin/main`, applicable GitHub Actions, Deploy site, `gh-pages`, and then GitHub Pages production.

## 10. Session boundaries and new-session guidance

- Continue using the same Codex project for this repository; a new project or reclone is not required merely because the conversation changes.
- A new Codex session is appropriate when a meaningful phase changes, such as initial deployment to maintenance/design, design audit to implementation, RenderCV/PDF work, or another large feature phase.
- Keep the current session for small, continuous changes when its reviewed scope and Git state remain clear.
- Every new session must start from the root `AGENTS.md` cold-start bootstrap, read this workflow, and reload the Command Shortcuts and procedures before substantive work.
- Never depend on conversation memory for operational safety. Repository documentation and the freshly inspected Git/remote state are the authoritative sources.
