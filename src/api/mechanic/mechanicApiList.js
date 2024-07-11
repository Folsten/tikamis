import { mechanicApiClient } from '@/api/mechanicApiClient.js';

export default async function () {
  let { data } = await mechanicApiClient.get('/list');
  return data;
}
