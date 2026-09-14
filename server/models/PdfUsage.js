import mongoose from 'mongoose'

const pdfUsageSchema = new mongoose.Schema({
  clientKey: { type: String, required: true },
  windowStart: { type: Date, required: true },
  count: { type: Number, required: true, default: 0, min: 0 },
  expiresAt: { type: Date, required: true, index: { expires: 0 } }
})

pdfUsageSchema.index({ clientKey: 1, windowStart: 1 }, { unique: true })

export const PdfUsage = mongoose.model('PdfUsage', pdfUsageSchema)
