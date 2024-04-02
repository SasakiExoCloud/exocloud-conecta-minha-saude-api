import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

import { UserTableName } from '../../../environments/userTableName'
import AppError from '../../../errors/AppError'
import { IUser } from '../../../models/User'

const documentClient = new DynamoDBClient()

export const returnUserByEmail = async (email: string) => {
  try {
    const queryParams = new QueryCommand({
      TableName: UserTableName,
      IndexName: 'emailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: marshall({ ':email': email })
    })

    const { Items } = await documentClient.send(queryParams)

    if (Items && Items.length !== 0) {
      const userData = Items[0]

      return unmarshall(userData) as IUser
    }
  } catch (error) {
    console.error({ returnUserByEmailError: error })

    throw new AppError('Error when returning user by email', 500)
  }
}
