#!/usr/bin/env node
/**
 * Converts raster images in public/images to WebP.
 * Skips SVG, existing WebP/AVIF, and macOS resource forks (._*).
 */
import { readdir, stat, unlink } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const PUBLIC_IMAGES = path.join(process.cwd(), 'public', 'images')
const RASTER_EXT = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'])

/** ASCII-safe output names for problematic source files */
const RENAME_MAP = {
  'übermich.jpg': 'ubermich.webp',
  'übermich.jpeg': 'ubermich.webp',
  'übermich.png': 'ubermich.webp',
  'übermich.jpg': 'ubermich.webp',
  'übermich.jpeg': 'ubermich.webp',
  'übermich.png': 'ubermich.webp',
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.name.startsWith('._')) continue
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
    } else {
      files.push(full)
    }
  }
  return files
}

function outputName(filePath) {
  const base = path.basename(filePath)
  if (RENAME_MAP[base]) return RENAME_MAP[base]
  return `${path.parse(base).name}.webp`
}

async function convertFile(filePath) {
  const ext = path.extname(filePath)
  if (!RASTER_EXT.has(ext)) return null

  const outName = outputName(filePath)
  const outPath = path.join(path.dirname(filePath), outName)

  try {
    await sharp(filePath)
      .rotate()
      .webp({ quality: 82, effort: 4 })
      .toFile(outPath)

    const [inStat, outStat] = await Promise.all([stat(filePath), stat(outPath)])
    const saved = ((1 - outStat.size / inStat.size) * 100).toFixed(1)

    await unlink(filePath)

    return {
      from: path.relative(process.cwd(), filePath),
      to: path.relative(process.cwd(), outPath),
      saved: `${saved}%`,
    }
  } catch (err) {
    console.error(`  SKIP (invalid): ${path.relative(process.cwd(), filePath)} — ${err.message}`)
    return null
  }
}

const files = await walk(PUBLIC_IMAGES)
const results = []

for (const file of files) {
  const result = await convertFile(file)
  if (result) results.push(result)
}

console.log(`Converted ${results.length} images to WebP:\n`)
for (const r of results) {
  console.log(`  ${r.from} → ${r.to} (${r.saved} smaller)`)
}
