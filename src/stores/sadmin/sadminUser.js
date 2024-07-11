import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSadminUserStore = defineStore(
  'sadminUser',
  () => {
    let accessToken = ref('');
    let refreshToken = ref('');

    function $reset() {
      accessToken.value = '';
      refreshToken.value = '';
    }

    return { accessToken, refreshToken, $reset };
  },
  {
    persist: true
  }
);
