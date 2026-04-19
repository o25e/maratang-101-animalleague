// PNG → WebP 일괄 변환 스크립트
// 실행: node convert-images.mjs
import sharp from 'sharp'
import { readdirSync, unlinkSync } from 'fs'
import { join, extname, basename } from 'path'

const IMG_DIR = './public/img'

async function convertDir(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      await convertDir(full)
      continue
    }
    if (extname(entry.name).toLowerCase() !== '.png') continue

    const webpPath = full.replace(/\.png$/i, '.webp')
    try {
      await sharp(full).webp({ quality: 85 }).toFile(webpPath)
      const before = (await import('fs')).statSync(full).size
      const after = (await import('fs')).statSync(webpPath).size
      const saved = (((before - after) / before) * 100).toFixed(1)
      console.log(`  ✓  ${entry.name} → ${basename(webpPath)}  (${(before/1024/1024).toFixed(1)}MB → ${(after/1024/1024).toFixed(1)}MB, -${saved}%)`)
      unlinkSync(full) // 원본 PNG 삭제
    } catch (e) {
      console.error(`  ✗  ${entry.name}: ${e.message}`)
    }
  }
}

console.log('\n=== PNG → WebP 변환 시작 ===\n')
await convertDir(IMG_DIR)
console.log('\n완료. 이제 소스 코드의 .png 경로를 .webp로 바꿔야 합니다.\n')
