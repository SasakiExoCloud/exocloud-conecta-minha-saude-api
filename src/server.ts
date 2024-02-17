import cors from 'cors'
import express from 'express'
import serverless from 'serverless-http'
import 'express-async-errors'

const app = express()

app.use(express.json())
app.use(cors({ origin: '*' }))

app.get('/', (_, response) => {
  return response.json({ message: 'Hello World' })
})

module.exports.handler = serverless(app)
