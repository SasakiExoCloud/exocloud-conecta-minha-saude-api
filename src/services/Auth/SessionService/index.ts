import CryptoJS from 'crypto-js'
import { sign } from 'jsonwebtoken'

import authConfig from '../../../config/auth'
import AppError from '../../../errors/AppError'
import { returnUserByEmail } from '../../../utils/User/returnUserData/returnUserByEmail'
import { IRequestSessionData } from './types'

class SessionService {
  public static readonly tokenSecret: string = String(authConfig.jwt.secret)
  public static readonly tokenExpiresIn: string = String(
    authConfig.jwt.expiresIn
  )

  public static async create(requestSessionData: IRequestSessionData) {
    const service = new SessionService()

    return await service.execute(requestSessionData)
  }

  private async execute(requestSessionData: IRequestSessionData) {
    const userData = await returnUserByEmail(requestSessionData.email)

    if (!userData) throw new AppError('User not found', 400)

    const hashedPassword = CryptoJS.SHA256(
      requestSessionData.password
    ).toString(CryptoJS.enc.Hex)

    if (hashedPassword !== userData.password) {
      throw new AppError('Incorrect password', 400)
    }

    const token = sign({}, SessionService.tokenSecret, {
      subject: userData.userId,
      expiresIn: SessionService.tokenExpiresIn
    })

    return { user: userData, token }
  }
}

export default SessionService
