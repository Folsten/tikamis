import axios from 'axios';
import router from '@/router/index.js';
import { useSadminUserStore } from '@/stores/sadmin/sadminUser.js';
import { responseStatusesHandler } from '@/api/responseStatusesHandler.js';

let refreshTokenRequest = null;

async function authRefresh() {
  let sadminUserStore = useSadminUserStore();
  try {
    const { data } = await axios.post(
      import.meta.env.VITE_AXIOS_BASE_URL + '/sadmin-api/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${sadminUserStore.refreshToken}`
        }
      }
    );
    sadminUserStore.accessToken = data.accessToken;
    sadminUserStore.refreshToken = data.refreshToken;
    return true;
  } catch (error) {
    sadminUserStore.$reset()
    return false;
  }
}

const sadminApiClient = axios.create({
  validateStatus: (status) => status < 500,
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL + '/sadmin-api'
});

sadminApiClient.interceptors.request.use((config) => {
  const sadminUserStore = useSadminUserStore();
  if (sadminUserStore.accessToken) {
    config.headers.authorization = `Bearer ${sadminUserStore.accessToken}`;
  }
  return config;
});

sadminApiClient.interceptors.response.use(async (response) => {
  const sadminUserStore = useSadminUserStore();

  if (response.status === 401 && sadminUserStore.refreshToken) {
    if (refreshTokenRequest === null) {
      refreshTokenRequest = authRefresh();
    }

    let refreshResponse = await refreshTokenRequest;
    refreshTokenRequest = null;
    if (refreshResponse) {
      return await sadminApiClient({
        ...response.config,
        headers: {
          common: {
            ['Authorization']: `Bearer ${sadminUserStore.accessToken}`,
            ['Content-Type']: 'application/json'
          }
        }
      });
    } else {
      await router.push('/sadmin/auth');
    }
  }
  responseStatusesHandler(response);
  return response;
});

export { sadminApiClient };
