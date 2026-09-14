import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { connectDatabase } from './config/database.js'
import { analyzeSkills } from './routes/analysis.js'

const app = express()
const port = Number(process.env.PORT || 4000)
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000'
const directory = path.dirname(fileURLToPath(import.meta.url))
const distDirectory = path.resolve(directory, '../dist')

app.use(cors({ origin: clientOrigin }))
app.use(express.json({ limit: '1mb' }))
app.set('trust proxy', 1)

app.get('/api/health', (_request, response) => {
  const isConnected = mongoose.connection.readyState === 1
  response.status(isConnected ? 200 : 503).json({
    status: isConnected ? 'ok' : 'unavailable',
    database: isConnected ? 'connected' : 'disconnected'
  })
})

app.post('/api/analysis/skills', analyzeSkills)
app.use(express.static(distDirectory))
app.use((request, response, next) => {
  if (request.method === 'GET' && request.accepts('html')) {
    return response.sendFile(path.join(distDirectory, 'index.html'))
  }
  return next()
})

connectDatabase()
  .then(() => app.listen(port, () => console.log(`ResuNest API listening on port ${port}`)))
  .catch((error) => {
    console.error('Unable to start ResuNest API:', error.message)
    process.exit(1)
  })
