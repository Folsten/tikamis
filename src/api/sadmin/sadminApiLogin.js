import { sadminApiClient } from '@/api/sadminApiClient.js'

export default async function (login, password) {
  let { data } = await sadminApiClient.post('login', { login, password });
  return data
}