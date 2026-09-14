import { createHash } from 'node:crypto'
import { PdfUsage } from '../models/PdfUsage.js'

const LIMIT = 5
const WINDOW_MS = 3 * 60 * 60 * 1000

export class PdfLimitError extends Error {
  constructor(resetAt) {
    super('You have used all 5 PDF analyses for this 3-hour window. Please try again later.')
    this.status = 429
    this.resetAt = resetAt
  }
}

const getWindow = () => {
  const start = Math.floor(Date.now() / WINDOW_MS) * WINDOW_MS
  return { start: new Date(start), resetAt: new Date(start + WINDOW_MS) }
}

const getClientKey = (request) => {
  const ip = request.ip || request.socket.remoteAddress || 'unknown'
  const salt = process.env.RATE_LIMIT_SALT || 'resunest-development-salt'
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex')
}

export async function consumePdfUsage(request) {
  const { start, resetAt } = getWindow()
  const clientKey = getClientKey(request)

  try {
    const usage = await PdfUsage.findOneAndUpdate(
      { clientKey, windowStart: start, count: { $lt: LIMIT } },
      {
        $inc: { count: 1 },
        $setOnInsert: { clientKey, windowStart: start, expiresAt: resetAt }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
    return { remaining: LIMIT - usage.count, resetAt: resetAt.toISOString() }
  } catch (error) {
    if (error?.code === 11000) throw new PdfLimitError(resetAt.toISOString())
    throw error
  }
}
