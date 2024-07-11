import axios from 'axios';
import router from '@/router/index.js';
import { useDirectorUserStore } from '@/stores/director/directorUser.js';
import { responseStatusesHandler } from '@/api/responseStatusesHandler.js';

let refreshTokenRequest = null;

async function authRefresh() {
  let directorUserStore = useDirectorUserStore();
  try {
    const { data } = await axios.post(
      import.meta.env.VITE_AXIOS_BASE_URL + '/director-api/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${directorUserStore.refreshToken}`
        }
      }
    );
    directorUserStore.accessToken = data.accessToken;
    directorUserStore.refreshToken = data.refreshToken;
    return true;
  } catch (error) {
    directorUserStore.$reset();
    return false;
  }
}

const directorApiClient = axios.create({
  validateStatus: (status) => status < 500,
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL + '/director-api'
});

directorApiClient.interceptors.request.use((config) => {
  const directorUserStore = useDirectorUserStore();
  if (directorUserStore.accessToken) {
    config.headers.authorization = `Bearer ${directorUserStore.accessToken}`;
  }
  return config;
});

directorApiClient.interceptors.response.use(async (response) => {
  const directorUserStore = useDirectorUserStore();

  if (response.status === 401 && directorUserStore.refreshToken) {
    if (refreshTokenRequest === null) {
      refreshTokenRequest = authRefresh();
    }

    let refreshResponse = await refreshTokenRequest;
    refreshTokenRequest = null;
    if (refreshResponse) {
      return await directorApiClient({
        ...response.config,
        headers: {
          common: {
            ['Authorization']: `Bearer ${directorUserStore.accessToken}`,
            ['Content-Type']: 'application/json'
          }
        }
      });
    } else {
      await router.push('/director/auth');
    }
  }
  responseStatusesHandler(response);
  return response;
});

export { directorApiClient };
