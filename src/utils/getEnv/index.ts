import AppError from '../../errors/AppError'
import { EnvKeys } from './types'

export const getEnv = (
  key: EnvKeys,
  defaultValue?: string
): string | undefined => {
  const value = process.env[key]

  if (!value && defaultValue) {
    console.error(
      `Environment variable ${key} is not set, using default value ${defaultValue}`
    )

    return defaultValue
  }

  if (!value && !defaultValue) {
    throw new AppError(`Environment variable ${key} is not set`)
  }

  return value
}
