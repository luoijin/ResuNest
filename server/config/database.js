import mongoose from 'mongoose'

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error('MONGODB_URI is missing. Add it to your local .env file before starting the server.')
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
  console.log(`MongoDB connected: ${mongoose.connection.host}`)
}
