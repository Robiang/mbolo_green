import { existsSync } from 'fs'
import { rm, mkdir, readdir, stat, copyFile, writeFile } from 'fs/promises'
import path from 'path'

const distDir = path.resolve(process.cwd(), 'dist')
const docsDir = path.resolve(process.cwd(), 'docs')

async function copyDirectory(source, destination) {
  await mkdir(destination, { recursive: true })
  const entries = await readdir(source, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(source, entry.name)
    const destPath = path.join(destination, entry.name)

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath)
    } else if (entry.isFile()) {
      await copyFile(srcPath, destPath)
    }
  }
}

async function main() {
  if (!existsSync(distDir)) {
    throw new Error('dist directory not found. Run `npm run build` first.')
  }

  if (existsSync(docsDir)) {
    await rm(docsDir, { recursive: true, force: true })
  }

  await copyDirectory(distDir, docsDir)
  await writeFile(path.join(docsDir, '.nojekyll'), '')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
