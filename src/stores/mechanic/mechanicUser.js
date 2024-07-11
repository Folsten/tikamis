import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMechanicUserStore = defineStore(
  'mechanicUser',
  () => {
    let activeMechanicId = ref('');
    let activeMechanicName = ref('');
    let accessToken = ref('');
    let refreshToken = ref('');

    function $reset() {
      activeMechanicId.value = '';
      activeMechanicName.value = '';
      accessToken.value = '';
      refreshToken.value = '';
    }

    return { activeMechanicId, activeMechanicName, accessToken, refreshToken, $reset };
  },
  {
    persist: true
  }
);
