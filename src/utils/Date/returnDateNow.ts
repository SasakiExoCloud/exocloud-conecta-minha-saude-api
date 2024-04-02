import axios from 'axios'

export const returnDateNow = async () =>
  axios
    .get('https://worldtimeapi.org/api/timezone/UTC', { timeout: 2000 })
    .then(response => new Date(response.data.datetime))
    .catch(() => new Date())
