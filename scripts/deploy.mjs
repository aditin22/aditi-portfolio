#!/usr/bin/env node
/**
 * Publishes dist/ to the gh-pages branch.
 *
 * dist/ gets its own throwaway repo and is force-pushed, so the branch only
 * ever holds the current build and the source history stays untouched. Pages
 * is configured to serve gh-pages at the root.
 *
 * This exists instead of a GitHub Actions workflow because the local gh token
 * has no `workflow` scope. To switch to CI deploys: `gh auth refresh -s workflow`,
 * then add .github/workflows/deploy.yml and point Pages at "GitHub Actions".
 */
import { execFileSync } from 'node:child_process'
import { existsSync, writeFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

const DIST = resolve('dist')
const BRANCH = 'gh-pages'

if (!existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.')
  process.exit(1)
}

const run = (args, cwd) =>
  execFileSync('git', args, { cwd, stdio: 'pipe', encoding: 'utf8' }).trim()

const remote = run(['remote', 'get-url', 'origin'])

// Jekyll would otherwise skip files beginning with an underscore.
writeFileSync(resolve(DIST, '.nojekyll'), '')

rmSync(resolve(DIST, '.git'), { recursive: true, force: true })
run(['init', '-q', '-b', BRANCH], DIST)
run(['add', '-A'], DIST)
run(['commit', '-q', '-m', `Deploy ${new Date().toISOString()}`], DIST)
run(['push', '--force', '-q', remote, `${BRANCH}:${BRANCH}`], DIST)
rmSync(resolve(DIST, '.git'), { recursive: true, force: true })

console.log(`Deployed to ${BRANCH} → https://aditin22.github.io/aditi-portfolio/`)
