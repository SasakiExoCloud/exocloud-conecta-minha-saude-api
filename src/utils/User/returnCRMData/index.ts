import axios from 'axios'

import { IResponseData } from './types'

export const returnCRMData = async (crmCode: string) => {
  try {
    const { data } = await axios.get(
      `https://api.cremesp.org.br/guia-medico/medico-info/${crmCode}`
    )

    return data as IResponseData
  } catch (error) {
    console.error({ returnCRMDataError: error })
  }
}
