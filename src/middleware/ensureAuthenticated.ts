import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../config/auth'
import AppError from '../errors/AppError'

interface TokenPayload {
  exp: number
  iat: number
  sub: string
}

const ensureAuthenticated = (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, String(authConfig.jwt.secret))

    const { sub } = decoded as unknown as TokenPayload

    request.user = {
      userId: sub
    }

    return next()
  } catch (error) {
    throw new AppError('Invalid JWT token', 401)
  }
}

export default ensureAuthenticated
