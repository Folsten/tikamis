import { mechanicApiClient } from '@/api/mechanicApiClient.js';

export default async function () {
  await mechanicApiClient.post('/mechanic-logout');
}
