import { sadminApiClient } from '@/api/sadminApiClient.js'

export default async function() {
  const response = await sadminApiClient.get('/all-car-centers')
  return response.data
}