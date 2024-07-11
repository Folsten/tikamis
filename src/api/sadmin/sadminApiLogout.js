import { sadminApiClient } from '@/api/sadminApiClient.js';
import router from '@/router/index.js';
import { useSadminUserStore } from '@/stores/sadmin/sadminUser.js';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import { useMainStore } from '@/stores/shared/main.js';

export default async function () {
  const mainStore = useMainStore();
  const sadminUserStore = useSadminUserStore();
  const sadminServiceStationsStore = useSadminServiceStationsStore();

  const response = await sadminApiClient.post('/logout');
  if (response.status === 200) {
    sadminUserStore.$reset();
    mainStore.$reset();
    await router.push('/sadmin/auth');
    sadminServiceStationsStore.$reset();
  }
}
