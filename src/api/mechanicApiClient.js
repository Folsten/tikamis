import axios from 'axios';
import router from '@/router/index.js';
import { useMechanicUserStore } from '@/stores/mechanic/mechanicUser.js';
import { responseStatusesHandler } from '@/api/responseStatusesHandler.js';
import { useMechanicOrderStore } from '@/stores/mechanic/mechanicOrder.js'

let refreshTokenRequest = null;

async function authRefresh() {
  const mechanicUserStore = useMechanicUserStore();
  try {
    const { data } = await axios.post(
      import.meta.env.VITE_AXIOS_BASE_URL + '/mechanic-api/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${mechanicUserStore.refreshToken}`
        }
      }
    );
    mechanicUserStore.accessToken = data.accessToken;
    mechanicUserStore.refreshToken = data.refreshToken;
    return true;
  } catch (error) {
    mechanicUserStore.$reset()
    return false;
  }
}

const mechanicApiClient = axios.create({
  validateStatus: (status) => status < 500,
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL + '/mechanic-api'
});

mechanicApiClient.interceptors.request.use((config) => {
  const mechanicUserStore = useMechanicUserStore();
  if (mechanicUserStore.accessToken) {
    config.headers.authorization = `Bearer ${mechanicUserStore.accessToken}`;
  }
  return config;
});

mechanicApiClient.interceptors.response.use(
  async (response) => {
    const mechanicUserStore = useMechanicUserStore();
    if (response.status === 401 && mechanicUserStore.refreshToken) {
      if (refreshTokenRequest === null) {
        refreshTokenRequest = authRefresh();
      }
      let refreshResponse = await refreshTokenRequest;
      refreshTokenRequest = null;
      if (refreshResponse) {
        return await mechanicApiClient({
          ...response.config,
          headers: {
            common: {
              ['Authorization']: `Bearer ${mechanicUserStore.accessToken}`,
              ['Content-Type']: 'application/json'
            }
          }
        });
      } else {
        await router.push('/mechanic/auth')
      }
    }
    responseStatusesHandler(response);
    return response;
  }
);

export { mechanicApiClient };
