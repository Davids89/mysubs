---
name: fill-mr-details
description: Find, create, update, or audit GitHub pull requests for this repository by inspecting branch commits, diffs, tests, issue context, and existing PR summaries. Use when the user asks to fill MR details, PR details, pull request description, merge request description, GitHub PR body, create a PR/MR, or verify that a PR summary explains every branch change.
---

# Fill MR Details

Use this skill to find an existing GitHub PR for the current branch, fill it with review-ready details, or create it if none exists. When a PR already has a body, audit it against the complete branch diff and update it only where information is missing, stale, or misleading.

## Gather Context

Gather context first:

1. `git status --short --branch`
2. `git branch --show-current`
3. `gh pr view --json number,title,url,body,baseRefName,headRefName,state`
4. `git log --oneline <base>..HEAD`
5. `git diff --stat <base>...HEAD`
6. `git diff <base>...HEAD`
7. If an issue is referenced, fetch it with `gh issue view <number> --repo Davids89/subtrack`.

Default `<base>` to the PR base branch when a PR exists. If there is no PR, default to `origin/master` unless the current branch tracks a different base or the user says otherwise.

## Find Or Create The PR

Use `gh` for GitHub operations:

1. Find an existing PR for the current branch:

```sh
gh pr view --json number,title,url,body,baseRefName,headRefName,state
```

2. If no PR exists, ensure the branch is pushed:

```sh
git push -u origin HEAD
```

3. Create the PR if needed:

```sh
gh pr create --base master --title "<title>" --body "$(cat <<'EOF'
<body>
EOF
)"
```

4. If a PR exists, update it instead of creating a duplicate:

```sh
gh pr edit <number> --title "<title>" --body "$(cat <<'EOF'
<body>
EOF
)"
```

Return the PR URL after creating or updating it.

## Audit Existing PR Details

When a PR already exists and has a body:

1. Preserve useful existing wording, checklists, links, and sections.
2. Compare every branch commit and every meaningful diff area against the current PR body.
3. Identify missing or stale information before editing:
   - User-facing behavior not mentioned.
   - Backend, mobile, package, database, Docker, or CI changes not mentioned.
   - Added, removed, or changed tests not reflected.
   - Config, env vars, migrations, commands, risks, or manual verification missing.
4. Update the PR body so each meaningful change is explained at the right level of detail.
5. Do not bloat the PR with a file-by-file dump; group related changes into reviewer-friendly bullets.
6. Do not remove important context from an existing PR body unless it is now wrong.

## What To Include

Focus on reviewer value, not a file-by-file dump:

- What changed and why.
- User-facing behavior.
- Architecture or package boundaries touched.
- Tests and commands run.
- Known risks, follow-ups, or required secrets/config.
- Linked issue, epic, or user story when available.

## Project-Specific Checks

- For mobile work, mention Expo Router, `apps/mobile/AGENTS.md`, EAS/Expo implications, and emulator/manual verification when relevant.
- For backend work, mention CQRS flow, Prisma migrations, Docker compose, and API routes when relevant.
- For CI/CD work, mention GitHub Actions workflow names and required repository secrets.
- Do not claim tests were run unless there is evidence from the conversation or command output.
- If the branch includes unrelated commits, call that out and keep the MR details scoped to what will actually be merged.

## PR Body Template

```markdown
## Summary
- 
- 

## Test plan
- [ ] 
- [ ] 

## Notes
- 
```

Use checked boxes only for validation already completed:

```markdown
- [x] `pnpm test`
```

Omit `## Notes` if there are no risks, config requirements, or follow-ups.

## Title Guidance

Use a concise imperative title, matching existing commit style:

- `Initialize Expo mobile foundation`
- `Add GitHub Actions CI foundation`
- `Document mobile development conventions`
