import { mechanicApiClient } from '@/api/mechanicApiClient.js';

export default async function (mechanicId) {
  let response = await mechanicApiClient.post('/mechanic-login', {
    mechanicId
  });
  return response.status !== 403;
}
