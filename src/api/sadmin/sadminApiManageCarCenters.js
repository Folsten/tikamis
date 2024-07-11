import { sadminApiClient } from '@/api/sadminApiClient.js'

export default async function() {
  const response = await sadminApiClient.get('/manage/car-centers')
  return response.data
}