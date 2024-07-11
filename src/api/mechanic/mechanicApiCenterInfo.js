import { mechanicApiClient } from '@/api/mechanicApiClient.js';

export default async function () {
  const { data } = await mechanicApiClient.get('/center-info')
  return data;
}
