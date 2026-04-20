import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

const DOWNLOAD_NAME = 'Justin-Chang-Resume.pdf'

// Candidates in priority order, root first (where it actually lives),
// then public/ in case it gets moved there later.
const CANDIDATES = [
  path.resolve(process.cwd(), 'RESUME.pdf'),
  path.resolve(process.cwd(), 'public', 'RESUME.pdf'),
  path.resolve(process.cwd(), 'resume.pdf'),
  path.resolve(process.cwd(), 'public', 'resume.pdf'),
]

export async function GET() {
  let buffer: Buffer | null = null

  for (const filePath of CANDIDATES) {
    try {
      buffer = await readFile(filePath)
      break
    } catch {
      // not found at this path, try next
    }
  }

  if (!buffer) {
    return new NextResponse('Resume file not found.', { status: 404 })
  }

  return new NextResponse(buffer as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${DOWNLOAD_NAME}"`,
      'Content-Length': String(buffer.byteLength),
      'Cache-Control': 'no-store',
    },
  })
}
