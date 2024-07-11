import { directorApiClient } from '@/api/directorApiClient.js'

export default async function () {
  const { data } = await directorApiClient.get('/center-info')
  return data;
}