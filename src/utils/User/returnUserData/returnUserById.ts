import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

import { UserTableName } from '../../../environments/userTableName'
import AppError from '../../../errors/AppError'
import { IUser } from '../../../models/User'

const documentClient = new DynamoDBClient()

export const returnUserId = async (userId: string) => {
  try {
    const getParams = new GetItemCommand({
      TableName: UserTableName,
      Key: marshall({ userId })
    })

    const { Item } = await documentClient.send(getParams)

    if (Item) {
      const userData = Item[0]

      return unmarshall(userData) as IUser
    }
  } catch (error) {
    console.error({ returnUserIdError: error })

    throw new AppError('Error when returning user by userId', 500)
  }
}
