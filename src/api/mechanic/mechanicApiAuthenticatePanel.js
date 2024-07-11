import { mechanicApiClient } from '@/api/mechanicApiClient.js';

export default async function (login, password, postNumber) {
  const { data } = await mechanicApiClient.post('/authenticate-panel', {
    login,
    password,
    postNumber
  });
  return data;
}
