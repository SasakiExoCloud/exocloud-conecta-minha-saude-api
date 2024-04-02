import { Router } from 'express'

import SessionService from '../services/Auth/SessionService'

const AuthRoutes = Router()

AuthRoutes.post('/', async (request, response) => {
  const requestBodyData = request.body

  const responseUserData = await SessionService.create(requestBodyData)

  return response.json(responseUserData)
})

export default AuthRoutes
