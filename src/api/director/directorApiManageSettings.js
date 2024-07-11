import { directorApiClient } from '@/api/directorApiClient.js'

export default async function() {
  const response = await directorApiClient.get('manage/settings')
  return response.data
}