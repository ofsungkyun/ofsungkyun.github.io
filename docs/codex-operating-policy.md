# Orca/Codex Operating Policy v1

## 1. Purpose and authority

This document is the single source of truth for the operating model used to execute approved repository implementation tasks. The root `AGENTS.md` is the project-level authority and entry point; this policy defines authorization boundaries and task lifecycle; `docs/codex-workflow.md` defines the concrete Git, validation, commit, integration, push, deployment, and shutdown procedures.

Higher-priority platform and user instructions take precedence. Within this repository, apply the root `AGENTS.md`, then this policy, then the concrete workflow and other linked documentation. If instructions conflict or the authorized scope is unclear, stop at the applicable Human Gate instead of guessing.

One implementation task uses one isolated Git worktree. Git metadata and the task's approved Task Spec identify that worktree, branch, baseline, and authorized change set; a fixed filesystem path is not part of repository identity.

## 2. Role model

- ChatGPT is the Planner, Architect, and independent Reviewer.
- An Orca worktree plus Codex is the Executor for an approved Task Spec.
- Multi-agent Orca orchestration is deferred by default. Do not introduce it into an ordinary task unless the user separately requests it.

## 3. Task authorization semantics

Approval of a Task Spec creates a closed AUTO scope. Codex may perform the AUTO actions in this policy only to achieve the stated objective, only in the approved files or paths, and only under the task-specific constraints and acceptance criteria.

Dependency, plugin, configuration, privacy, disclosure, academic, factual, content, credential, or similar gated changes are pre-authorized only when the Task Spec specifically lists the exact change. A general implementation request or a broad file path does not implicitly authorize them. A newly discovered gated action, file, fact, disclosure, dependency, alternative, or scope expansion requires a new Human Gate.

Main integration and push/deployment remain stage-specific Human Gates after checkpoint review. They are never implied by Task Spec approval or by a checkpoint commit. An absolutely prohibited operation cannot be authorized through a Task Spec or later approval.

A Task Spec may document an excluded baseline change that predates the task. Such a baseline may remain only when its path and identifying evidence are recorded, it is not modified by the task, and it is not staged or committed. Reverify it before checkpoint commit. Excluded baseline changes are not part of the task change set.

## 4. Required minimal Task Spec

Every approved implementation task must define:

1. **Task name** — the stable identifier for the worktree, review, and checkpoint.
2. **Objective** — the concrete outcome to achieve.
3. **Approved files or scope** — a closed set of files or narrowly bounded paths Codex may modify.
4. **Acceptance criteria** — the observable conditions required for completion.
5. **Task-specific constraints** — facts, sources, prohibited changes, baseline exceptions, required validation, and other task-only limits.

The Task Spec does not need to repeat this policy's default lifecycle, retry budget, Git prohibitions, or commit/push separation.

## 5. AUTO and Human Gate model

| Classification        | Action                                      | Boundary                                                                                                                                                                                          |
| --------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AUTO                  | Inspect                                     | Inspect repository files, relevant local state, and Git metadata without expanding scope.                                                                                                         |
| AUTO                  | Plan                                        | Choose the smallest implementation and validation plan within the approved scope.                                                                                                                 |
| AUTO                  | Edit                                        | Modify only approved files or paths.                                                                                                                                                              |
| AUTO                  | Format                                      | Use existing repository tooling without installing or updating dependencies.                                                                                                                      |
| AUTO                  | Build and test                              | Use the existing environment and the smallest required validation set.                                                                                                                            |
| AUTO                  | Browser and responsive validation           | Run when required by the Task Spec or change type.                                                                                                                                                |
| AUTO                  | Regression checks                           | Run the relevant existing checks for the changed behavior.                                                                                                                                        |
| AUTO                  | Self-review                                 | Review scope, complete diffs, staged content, facts, privacy, credentials, and regressions.                                                                                                       |
| AUTO                  | Corrective retry                            | Perform no more than two corrective iterations under Section 7.                                                                                                                                   |
| AUTO                  | Conditional checkpoint commit               | Create exactly one task-branch checkpoint only when every condition in Section 6 passes.                                                                                                          |
| HUMAN GATE            | Scope expansion                             | Obtain approval before broadening the objective or solution.                                                                                                                                      |
| HUMAN GATE            | Modification outside approved scope         | Obtain approval before editing another file or path.                                                                                                                                              |
| HUMAN GATE            | Material academic or factual change         | Obtain approval when the Task Spec did not explicitly authorize the exact change and source.                                                                                                      |
| HUMAN GATE            | Privacy or disclosure change                | Obtain approval when the Task Spec did not explicitly authorize the exact disclosure effect.                                                                                                      |
| HUMAN GATE            | Dependency, plugin, or configuration change | Obtain approval when the Task Spec did not explicitly authorize the exact change.                                                                                                                 |
| HUMAN GATE            | Repository, tool, or system configuration   | Obtain explicit approval for the exact action.                                                                                                                                                    |
| HUMAN GATE            | Credentials                                 | Obtain explicit approval; never expose or infer secret values.                                                                                                                                    |
| HUMAN GATE            | Materially different alternatives           | Ask the user when alternatives require a preference or materially change the result.                                                                                                              |
| HUMAN GATE            | Main integration                            | Integrate only after review and specific approval under the workflow.                                                                                                                             |
| HUMAN GATE            | Push or deployment                          | Require a separate approval after main integration.                                                                                                                                               |
| HUMAN GATE            | Retry-budget exhaustion                     | Stop after two corrective iterations and request a decision.                                                                                                                                      |
| ABSOLUTELY PROHIBITED | Force push                                  | Never force push.                                                                                                                                                                                 |
| ABSOLUTELY PROHIBITED | Destructive reset                           | Never use a destructive reset to discard or rewrite work.                                                                                                                                         |
| ABSOLUTELY PROHIBITED | Silent rewrite of approved commits          | Never amend, rebase, replace, or otherwise rewrite an approved commit without a separately reviewed policy change and explicit authorization; do not use rewriting as an automatic recovery step. |

## 6. Validation and checkpoint semantics

A Policy-authorized checkpoint commit is allowed automatically only when all of the following are true:

1. Every task-specific acceptance criterion passes.
2. Every validation required by the Task Spec or change type passes.
3. The task change set, after excluding any documented and reverified baseline exception, contains exactly the approved files.
4. No unexpected staged or untracked file exists.
5. Only explicitly approved paths are staged, and the complete staged diff and staged-name list have been reviewed.
6. Self-review finds no unresolved correctness, regression, factual, privacy, disclosure, credential, or ownership issue.
7. No unresolved Human Gate exists.

Validation is requirement-driven, not universal. A validation that the Task Spec and change type do not require may be omitted and its absence does not block checkpoint commit. Docker or browser validation blocks a checkpoint only when it is required for that task.

If required validation fails, diagnose and use the corrective budget when a scoped fix is available. If required validation cannot be performed, do not create a checkpoint commit; report `HUMAN DECISION REQUIRED` with the missing evidence and reason.

The checkpoint commit contains only the approved task change set, exists only on the task branch, and does not authorize main integration or push.

## 7. Corrective retry budget

The automatic sequence is:

`initial implementation -> self-review -> corrective iteration 1 -> full required re-validation -> corrective iteration 2 -> full required re-validation`

The initial implementation is not a corrective iteration. Each corrective iteration must remain within the approved scope and must rerun the full validation required for the task, not only the previously failing command. There is no third automatic corrective iteration.

After the second corrective iteration fails or leaves a required criterion unresolved, stop and report `HUMAN DECISION REQUIRED`.

## 8. Terminal statuses

Use exactly one of these statuses when ending an implementation task:

- `READY FOR HUMAN REVIEW` — a validated checkpoint commit exists on the task branch and main integration awaits human approval.
- `HUMAN DECISION REQUIRED` — user judgment is required for scope, a gate, a materially different alternative, a validation waiver, or retry-budget exhaustion.
- `BLOCKED` — no safe executable path exists because of the environment, a conflict, or missing required information.

Intermediate operational messages such as readiness to start, validation progress, or commit recommendations are not terminal task statuses.

## 9. Git operating principles

For pure Git inspection, commit, integration, or push tasks, Git metadata is the source of truth. Do not invoke Orca CLI or Orca skills merely to inspect, commit, integrate, or push. Use Orca lifecycle management only when the user actually requests an Orca lifecycle operation.

### Checkpoint commit

- A Task Spec authorizes one automatic checkpoint only when Section 6 is satisfied.
- The checkpoint is created only on the isolated task branch.
- Stage approved paths explicitly; never use broad staging when excluded or unrelated work exists.
- A checkpoint does not authorize main integration or push.

### Main integration

- Main integration is always a Human Gate after checkpoint review.
- Integration approval authorizes exactly one `git fetch origin` immediately before integration for remote freshness and divergence checking.
- Stop for an unexpected remote change, unexpected commit, behind state, divergence, dirty main worktree, or identity mismatch.
- Use `git merge --ff-only` or an equivalent fast-forward-only operation from the registered main worktree.
- If fast-forward-only integration is impossible, report `HUMAN DECISION REQUIRED`. Do not fall back to a merge commit, rebase, reset, or cherry-pick.

### Push

- Push is a separate Human Gate after main integration.
- Push only reviewed `main` commits to `origin/main` with a normal non-force push.
- Preserve the CI, generated `gh-pages`, deployment, and production verification defined in `docs/codex-workflow.md`.

## 10. Docker policy

AUTO actions are limited to inspecting currently available Docker state and using an already-running Docker Desktop, Docker Engine, or repository Compose environment when required for an approved task.

Starting Docker Desktop itself requires a Human Gate unless the Task Spec or an applicable workflow shortcut explicitly pre-authorized it. Docker installation, update, settings changes, and system-level Docker changes always require a Human Gate.

Docker availability is not a universal checkpoint requirement. Apply Section 6 according to the Task Spec and change type.

## 11. Default lifecycle

`Task Spec approved -> Inspect -> Plan -> Implement -> Validate -> Self-review -> Corrective Retry <= 2 -> Checkpoint Commit -> READY FOR HUMAN REVIEW -> Main Integration Gate -> approved fetch + fast-forward-only integration -> Push Gate -> non-force push -> Production Verification -> Close`

Stop at the first unresolved Human Gate or absolute prohibition. Main integration and push remain separate decisions even when all earlier stages succeed.
