import cors from 'cors'
import express from 'express'
import serverless from 'serverless-http'
import 'express-async-errors'

import ensureCorsOrigin from './middleware/ensureCorsOrigin'
import ensureErrorHandling from './middleware/ensureErrorHandling'
import AppRoutes from './routes/index.routes'

const app = express()

app.use(ensureCorsOrigin)

app.use(express.json())
app.use(cors({ origin: '*' }))

app.use(AppRoutes)

app.use(ensureErrorHandling)

module.exports.handler = serverless(app)
