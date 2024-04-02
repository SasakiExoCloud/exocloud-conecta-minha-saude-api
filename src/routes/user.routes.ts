import { Router } from 'express'

import CreateUserService from '../services/User/CreateUserService'

export const UserRoutes = Router()

UserRoutes.post('/', async (request, response) => {
  const requestBodyData = request.body

  const responseUserData = await CreateUserService.create(requestBodyData)

  return response.json(responseUserData)
})

export default UserRoutes
