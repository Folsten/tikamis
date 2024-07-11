import { directorApiClient } from '@/api/directorApiClient.js'

export default async function (login, password) {
  let { data } = await directorApiClient.post('login', { login, password });
  return data
}