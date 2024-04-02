import { SecretKeyToken } from '../environments/SecretKeyToken'

export default {
  jwt: {
    secret: SecretKeyToken,
    expiresIn: '7d'
  }
}
