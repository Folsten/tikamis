import { directorApiClient } from '@/api/directorApiClient.js'
import router from '@/router/index.js'
import { useDirectorUserStore } from '@/stores/director/directorUser.js'
import { useMainStore } from '@/stores/shared/main.js'

export default async function() {
  const directorUserStore = useDirectorUserStore();
  const mainStore = useMainStore();

  const response = await directorApiClient.post('/logout')
  if (response.status === 200) {
    directorUserStore.$reset()
    mainStore.$reset()
    await router.push('/director/auth');
  }
}