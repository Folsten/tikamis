import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMainStore = defineStore('main', () => {
  let isHeaderMenuOpen = ref(false);

  function $reset() {
    isHeaderMenuOpen.value = false;
  }

  return { isHeaderMenuOpen, $reset };
});
