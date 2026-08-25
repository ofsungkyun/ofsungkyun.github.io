# Codex Website Workflow

This document is the concrete operating procedure for maintaining Sungkyun Im's al-folio academic website under [`docs/codex-operating-policy.md`](codex-operating-policy.md). Run commands from the registered worktree root returned by `git rev-parse --show-toplevel`. Repository identity comes from Git metadata and the configured remote when relevant, not from a fixed filesystem path.

## Workflow at a glance

- Cold start: `AGENTS.md bootstrap -> load Operating Policy v1 -> load this workflow -> interpret shortcuts`
- Start: `작업 시작 -> Quick Resume -> remote-aware Session Start -> restore localhost -> Work`
- During work: `Inspect -> Plan -> Modify -> Validate -> Self-review -> corrective retry <= 2`
- Review and publication: `Policy checkpoint or explicit manual commit -> human review -> main integration approval -> push approval -> production verification`
- End: `작업 종료 -> Session End -> applicable Commit Procedure when needed -> remote-state report -> Session Shutdown`

Task Spec approval conditionally authorizes one Policy checkpoint commit when every policy and procedure precondition passes. Every other commit uses the explicit/manual approval path. A checkpoint, main integration, and push are distinct stages: a commit never implies integration or push, integration requires a Human Gate and is fast-forward-only under the normal workflow, and push requires a later separate Human Gate. An end-work request never implies any of them.

Production flow:

`local main -> origin/main -> GitHub Actions -> Deploy site -> gh-pages -> GitHub Pages production`

Production URL: <https://ofsungkyun.github.io/>

## Command Shortcuts

These commands are aliases and entry points for the detailed procedures below. They do not replace, shorten, or bypass any safety check. `commit 진행` is the explicit/manual commit path; a Policy-authorized checkpoint follows the same staged-content safeguards without a second approval. Main integration is a separate Human Gate. `push 진행` is a later separate approval; only it authorizes the reviewed non-force source push and its resulting automatic deployment verification. Manual deployment actions and workflow reruns require separate authorization.

### `작업 시작` / `Start work`

Interpret either command as authorization to run this sequence:

`confirm bootstrap -> Quick Resume -> remote-aware Session Start -> restore the local development environment -> verify localhost`

1. Confirm that the root `AGENTS.md` bootstrap, Operating Policy v1, and this workflow are loaded for the current session.
2. Confirm the registered worktree root, the Task Spec's expected task branch or an explicitly intended `main`, attached HEAD, and working-tree state.
3. Run `git fetch origin` without integrating changes, then calculate `origin/main...HEAD` ahead/behind counts.
4. Apply the divergence policy below. Stop for conflicts, an unexpected branch, a detached HEAD, unexplained staged/unstaged/untracked changes, a behind state, or a diverged state. A documented excluded baseline change may remain only under the policy's verification and staging restrictions.
5. If Git is safe for work, restore the Docker development environment. This shortcut authorizes starting Docker Desktop when necessary and starting this repository's al-folio Docker Compose service.
6. Inspect the Compose service and Jekyll logs, then verify <http://localhost:8080/> and material HTTP, asset, build, or container errors.
7. If all required checks pass, report `Ready to work`.

Divergence policy after the fetch:

- Ahead `0`, behind `0`: start work normally.
- Ahead greater than `0`, behind `0`: report the local-only commits. Work may start when the working tree is clean and no other problem exists, but do not push.
- Ahead `0`, behind greater than `0`: stop before work and report that remote commits must be reviewed. Do not pull or integrate automatically.
- Ahead greater than `0`, behind greater than `0`: stop before work and report the diverged state. Do not merge, rebase, or reset automatically.

This shortcut authorizes `git fetch origin`, environment restoration, and safety checks only. Repository file changes and a conditional checkpoint require a separately approved Task Spec. This shortcut does not authorize main integration, pushes, pulls, merges, rebases, resets, branch changes, Git configuration changes, or credential changes.

### `commit 진행` / `Proceed with commit`

Interpret either phrase as approval to run the explicit/manual path of the complete Commit Procedure only for the exact changes presented in the immediately preceding Session End report or another explicit review. A qualifying Policy-authorized checkpoint does not require this phrase.

1. Confirm that the proposed commit message and reviewed file set match the user's approval before staging.
2. Stop if any unexpected file or diff appears.
3. Stage only the reviewed paths, rerun `git diff --check`, inspect the staged file list and complete staged diff, and create the approved commit.
4. Report the resulting working tree, local HEAD, and ahead/behind counts relative to the locally available `origin/main` tracking ref.
5. Do not push. A separate `push 진행` / `Proceed with push` approval is required.
6. If the user had already invoked `작업 종료` / `End work`, resume that end-work sequence after the successful commit; report any local-only commit before deciding whether shutdown is safe.

### `push 진행` / `Proceed with push`

Interpret either phrase as approval to run the complete Push Procedure for already reviewed commits that have passed the Main Integration Procedure and now exist only on local `main`.

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

`Session End -> applicable Commit Procedure when needed -> remote-state assessment -> Session Shutdown`

1. Run the complete Session End procedure, including changed-file, diff, validation, build/browser applicability, security/privacy, localhost, and Git-state checks.
2. If expected uncommitted changes remain, use the Policy-authorized checkpoint path only when the approved Task Spec and every checkpoint condition apply. Otherwise report `COMMIT recommended` or `COMMIT deferred`, propose a commit message when appropriate, stop the end-work sequence, and wait for `commit 진행` / `Proceed with commit`.
3. If the worktree is clean except for any documented excluded baseline, inspect the current branch against the available `origin/main` tracking ref:
   - On an isolated task branch with a validated checkpoint, report `READY FOR HUMAN REVIEW`; do not integrate or push.
   - On `main`, ahead `0` and behind `0` permits safe shutdown.
   - On `main`, ahead greater than `0` and behind `0` requires reporting the unpushed local commits. Do not push; explain that they remain local until a separate push succeeds.
   - A behind or diverged state requires remote review. State whether shutdown can preserve the current local state safely, and do not integrate automatically.
4. When the repository state is safe for shutdown, stop this repository's Docker Compose service gracefully and confirm that it stopped.
5. Do not quit Docker Desktop itself.
6. Report whether Codex can be closed without losing repository files or commits.

This shortcut does not itself authorize a checkpoint, push, pull, fetch, main integration, merge, rebase, reset, branch change, Git configuration change, credential change, or quitting Docker Desktop. A previously approved Task Spec may independently authorize a qualifying Policy checkpoint.

Shortcut precedence and separation are therefore:

- `작업 시작` -> bootstrap confirmation -> fetch-aware Quick Resume -> Session Start
- `commit 진행` -> explicit/manual reviewed commit path only; no integration or push
- `push 진행` -> safe non-force push -> CI/deployment verification
- `작업 종료` -> Session End -> applicable commit path when needed -> remote-state report -> Session Shutdown; no automatic integration or push

## 1. Quick Resume

Use this entry point to restore the local development environment with minimal instructions. Quick Resume does not replace or skip any Session Start safety check.

1. Confirm the current registered worktree with `git rev-parse --show-toplevel` and `git worktree list --porcelain`, and confirm that the cold-start bootstrap has loaded `AGENTS.md`, Operating Policy v1, and this workflow.
2. Complete the full [Session Start](#2-session-start) procedure and inspect Git before changing files or starting services.
3. When Quick Resume was invoked by `작업 시작` / `Start work`, use that shortcut's authorization to run `git fetch origin` and apply its divergence policy. Otherwise, fetch only with separate user authorization.
4. Stop and report if there are conflicts, a branch that does not match the approved Task Spec or intended maintenance context, a detached HEAD, unexplained staged/unstaged/untracked changes, a behind state, or a diverged state. Handle a documented excluded baseline or the policy's narrowly defined automatic Orca `package-lock.json` baseline under the operating policy instead of treating it as task output.
5. If the Git state permits work, check Docker Desktop, Docker Engine, Docker Compose, and the al-folio Compose service.
6. If Docker Desktop is stopped, follow the user's authorization and the existing workflow rules before starting it. Do not start it silently.
7. When Docker is available and local execution is authorized, start the al-folio service with `docker compose up -d` and inspect its logs.
8. Verify <http://localhost:8080/>, including its HTTP response and material build or asset errors.
9. If all required checks pass, report `Ready to work`. Do not modify any repository file during Quick Resume.

### Quick resume prompt

```text
Resume the website project from the current registered Git worktree using the Quick Resume procedure. Apply AGENTS.md, docs/codex-operating-policy.md, and docs/codex-workflow.md; complete every Session Start safety check; run git fetch origin without integrating changes; apply the documented divergence policy; restore the authorized local Docker development environment; verify http://localhost:8080/; and report "Ready to work" when it is safe. Do not pull, merge, rebase, reset, push, change branches, or modify any repository file.
```

## 2. Session Start

Use this sequence before changing files:

1. Confirm the current registered worktree root with `git rev-parse --show-toplevel` and inspect `git worktree list --porcelain` when worktree identity or main-worktree location matters.
2. Confirm the current branch with `git branch --show-current`, compare it with the approved Task Spec or intended maintenance context, and ensure HEAD is not detached.
3. Record `git rev-parse HEAD`, run `git status`, and inspect staged, unstaged, untracked, and conflicted files separately. Verify any Task Spec baseline exception and apply the automatic Orca `package-lock.json` baseline rule only as defined in [`docs/codex-operating-policy.md`](codex-operating-policy.md), without modifying the baseline file.
4. Review recent work with `git log -3 --oneline`.
5. Confirm the origin URL with `git remote get-url origin` when remote identity is relevant to the task or a remote-aware shortcut.
6. When `작업 시작` / `Start work` or another explicit instruction authorizes it, run `git fetch origin`. Otherwise, state that the following comparison uses only the locally available tracking ref and has not contacted GitHub.
7. Compare the local branch with `origin/main` using `git rev-list --left-right --count origin/main...HEAD`, list any local-only or remote-only commits, and apply the documented divergence policy.
8. Stop if the branch is not the approved task branch or explicitly intended `main`, or if there are conflicts, unexplained changes, a behind state, or a diverged state. An ahead-only state may proceed after reporting the unpushed commits when all remaining changes are either clean or documented excluded baselines.
9. Check Docker Desktop, Docker Engine, Docker Compose, and the al-folio Compose service without starting anything automatically.
10. If Docker Desktop is stopped, report that normal state and ask the user to start it or authorize starting it when local validation is required. The `작업 시작` shortcut supplies this authorization.
11. When Docker is available and local execution is authorized, run `docker compose up -d`, inspect `docker compose logs`, and verify <http://localhost:8080/>.
12. Decide whether the requested work can proceed safely and report either `Ready to resume` or `Review required before resuming`.

### Resume-work prompt

Copy and adapt this prompt when starting a session:

```text
Resume work on the academic website repository from the current registered Git worktree.

Before modifying anything, inspect the current repository and report:
- registered worktree root, current branch, and whether they match the approved Task Spec or intended maintenance context
- git status, staged/unstaged/untracked files, and conflicts
- the three most recent commits and current HEAD
- origin URL; run git fetch origin without integrating changes; report local ahead/behind relative to the refreshed origin/main tracking ref
- Docker Desktop, Docker Engine, Docker Compose, and al-folio container status
- whether http://localhost:8080/ is available if the container is already running
- whether the site identity, empty baseurl, and hidden example-content navigation remain intact

Do not assume the previous session state is still current. Do not modify files, commit, push, pull, merge, rebase, reset, change branches, change Git settings, change credentials, or start Docker Desktop during this inspection. Stop and report any unexpected state, unapproved baseline, behind state, or divergence. Finish with either "Ready to resume" or "Review required before resuming" and explain why.
```

## 3. During Work

Follow this loop for each approved Task Spec. The AUTO scope and Human Gates come from Operating Policy v1; this section does not broaden the approved files or actions.

### Inspect

- Read `AGENTS.md` and the files directly related to the request.
- Check al-folio ownership in `docs/BOUNDARIES.md` before changing layouts, includes, styles, Liquid behavior, or plugin features.
- Identify current example content and ensure it is not confused with real academic data.

### Plan

- State the intended files, the smallest viable change, and the planned validation.
- Identify missing source information before authoring academic content.
- Keep dependency, runtime, and design work outside the plan unless explicitly requested.
- Stop for a Human Gate if the viable solution requires an unapproved file, gated change, materially different alternative, or scope expansion.

### Modify

- Edit only the planned files.
- Preserve the al-folio structure and unrelated user changes.
- Never invent personal, professional, research, or publication facts.
- Do not modify, stage, or absorb a documented excluded baseline change into the task.

### Validate

- Run focused syntax, formatting, or content checks appropriate to the changed files.
- When Docker is available, rebuild or restart the Compose service as needed and inspect Jekyll logs.
- Test <http://localhost:8080/>, local assets, relevant internal links, navigation, and browser console behavior.
- Record warnings separately from blocking errors.

### Self-review

- Run `git status`, `git diff --stat`, and `git diff --check`.
- Review `git diff` for every changed file.
- Confirm that no sensitive data, credentials, tokens, personal details not intended for publication, or bundled example facts were introduced.
- Compare every task change with the approved files, acceptance criteria, and task-specific constraints. Reverify any excluded baseline evidence.
- When every Policy checkpoint condition passes, follow the Policy-authorized path in the Commit Procedure. Otherwise do not stage or commit without the explicit/manual approval path.

### Corrective iterations

1. The initial implementation is followed by self-review and the full validation required by the Task Spec or change type.
2. If a scoped correction is needed, perform corrective iteration 1 and rerun the full required validation and self-review.
3. If another scoped correction is needed, perform corrective iteration 2 and rerun the full required validation and self-review.
4. Do not perform a third automatic corrective iteration. If a required criterion remains unresolved, stop with `HUMAN DECISION REQUIRED`.
5. A validation that is not required by the Task Spec or change type may be omitted and does not consume a corrective iteration or block a checkpoint.

## 4. Session End

Use this sequence before ending work:

1. Run `git status` and record the current branch.
2. List every modified, staged, and untracked file.
3. Run `git diff --stat` and `git diff --check`.
4. Review the actual diff for scope, correctness, secrets, credentials, private contact information, and unintended academic claims.
5. Confirm the Docker/Jekyll build and inspect material warnings and errors when site files changed.
6. Check <http://localhost:8080/> and the affected pages, assets, links, navigation, and browser console when applicable.
7. Decide whether uncommitted task work qualifies for the Policy-authorized checkpoint path. Create it only through the Commit Procedure when every Policy condition passes.
8. If the work does not qualify for an automatic checkpoint, report `COMMIT recommended` or `COMMIT deferred` and stop before shutdown until the user decides whether to invoke the explicit/manual path.
9. When the worktree is clean except for any documented excluded baseline, report the current branch versus the available `origin/main` tracking ref, including local-only commits, remote-only commits, or divergence. For a task branch checkpoint, report that main integration awaits a Human Gate. Only an already integrated local `main` may be a candidate for a later separate push.
10. Report whether the Docker container is running and may be stopped, but do not stop it automatically during Session End validation.
11. Finish with a clear assessment of whether it is safe to end the session and whether local-only commits would remain only on this PC.

### End-work prompt

Copy and adapt this prompt when ending a session:

```text
Prepare an end-of-session report for the current registered Git worktree.

Perform status checks and validation only. Report:
- current branch, HEAD, and git status
- staged, unstaged, and untracked files
- changed-file list, git diff --stat, and git diff --check
- whether the diff contains secrets, credentials, unintended private information, unsupported academic claims, or exposed al-folio example content
- Docker Desktop, Engine, Compose, and al-folio container status
- Docker/Jekyll build result and material warnings/errors if site files changed
- localhost URL, HTTP result, and affected-page/asset/link/console validation
- whether a checkpoint commit is recommended
- current branch versus the available origin/main tracking ref when the worktree is clean except for any documented excluded baseline, including any local-only commits
- whether main integration or a later separate push is the next applicable Human Gate, without performing either
- whether the session can end safely

Do not commit, push, pull, fetch, create or change branches, alter Git settings, alter credentials, stop Docker, or modify files. If validation cannot be performed, state "Unable to verify" and explain why.
```

## 5. Commit Procedure

There are two commit authorization paths:

- **Policy-authorized checkpoint:** Approval of the active Task Spec authorizes exactly one checkpoint commit when every condition in `docs/codex-operating-policy.md` and this procedure passes. No second commit approval is required.
- **Explicit/manual commit:** `commit 진행` / `Proceed with commit` authorizes the exact changes and message shown in the immediately preceding Session End report or another explicit review. Use this path when no approved Task Spec checkpoint applies.

Both paths use the same safeguards:

1. Confirm the expected isolated task branch, attached HEAD, and active Task Spec; run `git status` and record the pre-commit HEAD.
2. Run `git diff --stat` and `git diff --check`, review the complete task diff, and confirm every required acceptance criterion and validation result. An unavailable validation blocks the checkpoint only when the Task Spec or change type requires it.
3. Compare the changed-file list with the approved scope. Separately reverify any documented excluded baseline by its recorded evidence. Stop if another file, unexpected staged file, or unexpected untracked file appears.
4. Stage only the explicitly approved paths by name. Never use `git add .`, `git add -A`, or another broad staging command when unrelated or excluded work exists.
5. Inspect `git diff --cached --name-only`, `git diff --cached --stat`, and the complete staged diff. Confirm every staged path is approved, every intended task change is staged, and every excluded baseline is unstaged.
6. Rerun applicable diff, format, syntax, or content validation against the staged content. Confirm that no unresolved Human Gate remains.
7. For a Policy checkpoint, create exactly one concise task checkpoint commit. For the explicit/manual path, use the exact approved message.
8. Record the full commit hash, message, author, included file count, and parent commit. Confirm the approved commit was not amended or otherwise rewritten.
9. Run `git status`, record the new task-branch HEAD, and report any documented excluded baseline or other remaining worktree state.
10. Report ahead/behind relative to the locally available `origin/main` tracking ref and state whether that ref was refreshed.
11. Do not integrate `main` and do not push. A checkpoint ends with `READY FOR HUMAN REVIEW`; main integration and push require their own later Human Gates.

## 6. Main Integration Procedure

Use this procedure only after the user reviews the checkpoint commit and explicitly approves integrating that exact task branch and commit into `main`. This approval includes one pre-integration `git fetch origin`; it does not authorize push.

1. Record the approved task branch and checkpoint hash. Confirm that the checkpoint is still the task-branch HEAD and that its commit and file list match the reviewed result. Do not rewrite it.
2. Run `git worktree list --porcelain` and use the registered Git metadata to identify the worktree whose branch is `refs/heads/main`. Do not invoke Orca CLI or Orca skills merely to locate or operate the worktree.
3. In the registered main worktree, confirm the repository root, attached `main` HEAD, clean staged/unstaged/untracked state, current HEAD, and expected `origin` URL. Stop for an identity mismatch, unexpected commit, or dirty main worktree.
4. Run exactly one `git fetch origin` under the integration approval. Record the refreshed `origin/main` and do not fetch again within this integration attempt.
5. Compare `main` with `origin/main`. Proceed only when they are identical and the refreshed remote has no unexpected commit or divergence. Also confirm that the approved task checkpoint is a descendant of `main` and that the proposed integration contains only the reviewed task commits.
6. From the registered main worktree, integrate the approved task branch with `git merge --ff-only <approved-task-branch>` or an equivalent fast-forward-only operation.
7. If fast-forward-only integration fails, stop with `HUMAN DECISION REQUIRED`. Do not fall back to a merge commit, rebase, reset, or cherry-pick.
8. Confirm that `main` now points to the approved checkpoint, the main worktree is clean, and the task branch and approved commit were not rewritten.
9. Report the integrated HEAD and local `main` ahead/behind relative to the refreshed `origin/main`. Do not push; require a separate `push 진행` / `Proceed with push` approval.

## 7. Push Procedure

Use a push only after the reviewed checkpoint has been integrated into local `main` through the Main Integration Procedure and the user separately invokes `push 진행` / `Proceed with push` for the resulting local-only `main` commit or commits:

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

## 8. Session Shutdown

Use this sequence only after Session End validation and any applicable Policy-authorized or explicit/manual commit are complete. Its purpose is to leave both Git and the local development environment in a safe, durable state.

1. Run `git status` again and record the current branch.
2. Confirm that the worktree is clean or contains only documented excluded baseline changes, with no staged or untracked file.
3. If any uncommitted change other than a documented and reverified excluded baseline remains, stop the shutdown procedure and report the exact files. Do not discard, restore, or modify them.
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
Prepare the current registered Git worktree for shutdown using the Session Shutdown procedure. Confirm that the Git state is safe, report any local-only commits, and do not integrate or push. Only after the repository is safe, stop this repository's al-folio Docker Compose service and confirm that Codex can be closed without losing files or commits. Do not quit Docker Desktop.
```

## 9. Deployment Procedure

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

## 10. GitHub production architecture

- Source branch: `main`.
- Generated deployment branch: `gh-pages`.
- GitHub Pages source: `gh-pages` / `(root)`.
- Production URL: <https://ofsungkyun.github.io/>.
- The Deploy site workflow builds from source on `main` and creates or updates `gh-pages`.
- Never edit, commit to, or push `gh-pages` directly. Treat it as generated deployment output.
- A source push flows through `origin/main`, applicable GitHub Actions, Deploy site, `gh-pages`, and then GitHub Pages production.

## 11. Session boundaries and new-session guidance

- Use one isolated registered worktree for each implementation task. A new clone is not required merely because the conversation changes, and worktree lifecycle management remains outside pure Git procedures unless the user requests it.
- A new Codex session is appropriate when a meaningful phase changes, such as initial deployment to maintenance/design, design audit to implementation, RenderCV/PDF work, or another large feature phase.
- Keep the current session for small, continuous changes when its reviewed scope and Git state remain clear.
- Every new session must start from the root `AGENTS.md` cold-start bootstrap, read Operating Policy v1 and this workflow, and reload the Command Shortcuts and procedures before substantive work.
- Never depend on conversation memory for operational safety. Repository documentation and the freshly inspected Git/remote state are the authoritative sources.
