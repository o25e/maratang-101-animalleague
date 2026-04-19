// 배포 전 자산 경로 대소문자 검증 스크립트
// 실행: node check-assets.mjs
import { readdirSync, readFileSync } from 'fs'
import { join, resolve } from 'path'

const PUBLIC_DIR = resolve('./public')
const SRC_DIRS = ['./src', './constants'].map(d => resolve(d))

function collectFiles(dir) {
  const result = []
  try {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) result.push(...collectFiles(full))
      else result.push(full.replace(/\\/g, '/'))
    }
  } catch {}
  return result
}

// public/ 내 실제 파일을 "img/xxx.png" 형태로 정규화
const publicPrefix = PUBLIC_DIR.replace(/\\/g, '/') + '/'
const actualFiles = new Set(
  collectFiles(PUBLIC_DIR)
    .map(f => f.replace(/\\/g, '/').replace(publicPrefix, ''))
)

// 소스 코드에서 /img/ /sounds/ 경로 추출
const pathPattern = /["'`](\/(?:img|sounds)\/[^"'`\s?#]+)["'`]/g
const referenced = new Set()

function gatherSrc(dir) {
  try {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) gatherSrc(full)
      else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
        const content = readFileSync(full, 'utf-8')
        for (const [, path] of content.matchAll(pathPattern)) {
          referenced.add(path.replace(/^\//, ''))
        }
      }
    }
  } catch {}
}

SRC_DIRS.forEach(gatherSrc)

// 비교
let hasError = false
console.log('\n=== 자산 경로 검증 결과 ===\n')

for (const ref of [...referenced].sort()) {
  if (actualFiles.has(ref)) {
    console.log(`  ✓  ${ref}`)
  } else {
    console.log(`  ✗  MISSING: ${ref}`)
    hasError = true
  }
}

if (hasError) {
  console.error('\n❌ 누락된 파일이 있습니다. 배포 전에 수정하세요.\n')
  process.exit(1)
} else {
  console.log('\n✅ 모든 경로 정상\n')
}
