import { sadminApiClient } from '@/api/sadminApiClient.js'

export default async function (carCenterId) {
  let { data } = await sadminApiClient.get(`manage/settings/${carCenterId}`);
  return data
}