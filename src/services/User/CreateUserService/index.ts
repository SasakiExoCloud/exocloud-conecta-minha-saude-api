import CryptoJS from 'crypto-js'
import { v4 as uuidv4 } from 'uuid'

import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'

import { UserTableName } from '../../../environments/userTableName'
import AppError from '../../../errors/AppError'
import { IUser } from '../../../models/User'
import { returnDateNow } from '../../../utils/Date/returnDateNow'
import { returnCRMData } from '../../../utils/User/returnCRMData'
import { returnUserByEmail } from '../../../utils/User/returnUserData/returnUserByEmail'
import { IRequestUserData } from './types'

class CreateUserService {
  public static readonly documentClient: DynamoDBClient = new DynamoDBClient()

  public static async create(requestUserData: IRequestUserData) {
    const service = new CreateUserService()

    return await service.execute(requestUserData)
  }

  public async execute(requestUserData: IRequestUserData) {
    const isUserExist = !!(await returnUserByEmail(requestUserData.email))

    if (isUserExist) throw new AppError('User already registered', 400)

    const crmData = await returnCRMData(requestUserData.crmCode)

    // if (!crmData) throw new AppError('Invalid or not found CRM', 400)

    const userId = uuidv4()
    const dateNow = (await returnDateNow()).toISOString()
    const hashedPassword = CryptoJS.SHA256(requestUserData.password).toString(
      CryptoJS.enc.Hex
    )

    const userData: IUser = {
      ...requestUserData,
      userId,
      password: hashedPassword,
      crmStatus: crmData?.situacao ?? 'A',
      createdAt: dateNow,
      updatedAt: dateNow
    }

    await this.saveUserDataInDynamo(userData)

    return userData
  }

  private async saveUserDataInDynamo(userData: IUser) {
    try {
      const putParams = new PutItemCommand({
        TableName: UserTableName,
        Item: marshall(userData, { removeUndefinedValues: true })
      })

      await CreateUserService.documentClient.send(putParams)
    } catch (error) {
      console.error({ saveUserDataInDynamoError: error })

      throw new AppError('Error when saving user in database', 500)
    }
  }
}

export default CreateUserService
