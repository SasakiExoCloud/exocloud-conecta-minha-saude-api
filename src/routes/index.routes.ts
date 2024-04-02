import { Router } from 'express'

import AuthRoutes from './auth.routes'
import UserRoutes from './user.routes'

const AppRoutes = Router()

AppRoutes.use('/auth', AuthRoutes)
AppRoutes.use('/user', UserRoutes)

export default AppRoutes
