import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

const DOWNLOAD_NAME = 'Justin_Chang_Product_Resume.pdf'
const RESUME_PATH = path.resolve(process.cwd(), 'Justin_Chang_Product_Resume.pdf')

export async function GET() {
  try {
    const buffer = await readFile(RESUME_PATH)

    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${DOWNLOAD_NAME}"`,
        'Content-Length': String(buffer.byteLength),
        'Cache-Control': 'no-store',
      },
    })
  } catch {
    return new NextResponse('Resume file not found.', { status: 404 })
  }
}
