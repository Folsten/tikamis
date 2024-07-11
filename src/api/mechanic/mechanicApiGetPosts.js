import { mechanicApiClient } from '@/api/mechanicApiClient.js';

export default async function (login, password) {
  const { data } = await mechanicApiClient.post(`/get-posts`, {
    login,
    password
  });
  return data;
}
