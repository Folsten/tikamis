<template>
  <section class="h-screen w-full flex justify-center items-center bg-gray-f5f5f5">
    <div class="flex justify-center items-center w-[531px] bg-white">
      <div class="flex flex-col w-full items-center pt-[44px] pl-[92px] pr-[92px] pb-[70px]">
        <BaseSvgIcon
          name="logo"
          class="w-[86px] h-[84px]"
        />
        <h1 class="text-4xl font-medium pt-6">{{ props.title }}</h1>
        <form class="w-full flex flex-col items-center pt-4">
          <input
            type="text"
            placeholder="Введите логин"
            autocomplete="off"
            @keydown.space.prevent
            v-model="login"
            class="text-lg w-full pl-5 pr-5 pt-4 pb-4 border-gray-a1a4ad placeholder:text-gray-60 text-black border"
          />
          <div class="w-full relative">
            <input
              :type="passwordInputType"
              placeholder="Введите пароль"
              autocomplete="off"
              @keydown.space.prevent
              v-model="password"
              class="text-lg w-full pl-5 pr-5 pt-4 pb-4 border-gray-a1a4ad placeholder:text-gray-60 text-black border mt-5"
            />
            <BaseSvgIcon
              @click="isPasswordVisible = !isPasswordVisible"
              name="password-eye"
              class="absolute w-6 h-6 right-5 top-1/2 cursor-pointer transition-all"
            ></BaseSvgIcon>
          </div>
          <BaseButtonFilledGreen
            @click.prevent="authenticate"
            class="w-full bg-green text-white mt-[30px]"
            >Войти
          </BaseButtonFilledGreen>
          <div
            v-if="errorText"
            class="text-red mt-4"
          >
            {{ errorText }}
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import { useDirectorUserStore } from '@/stores/director/directorUser.js';
import directorApiLogin from '@/api/director/directorApiLogin.js';
import { useSadminUserStore } from '@/stores/sadmin/sadminUser.js';
import sadminApiLogin from '@/api/sadmin/sadminApiLogin.js';
import isEnv from '@/utils/isEnv.js';
import router from '@/router/index.js';

const directorUserStore = useDirectorUserStore();
const sadminUserStore = useSadminUserStore();

let props = defineProps({
  title: {
    Type: String,
    required: true
  }
});

let login = ref('');
let password = ref('');
let errorText = ref('');
let isPasswordVisible = ref(false);
let passwordInputType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));

async function authenticate() {
  if (isEnv('sadmin')) {
    let data = await sadminApiLogin(login.value, password.value);
    if (data.accessToken && data.refreshToken) {
      sadminUserStore.accessToken = data.accessToken;
      sadminUserStore.refreshToken = data.refreshToken;
      await router.push('/sadmin/manage/car-centers');
    } else {
      errorText.value = 'Не верный логин или пароль'
    }
  }
  if (isEnv('director')) {
    let data = await directorApiLogin(login.value, password.value);
    if (data.accessToken && data.refreshToken) {
      directorUserStore.accessToken = data.accessToken;
      directorUserStore.refreshToken = data.refreshToken;
      await router.push('/director/manage/settings');
    } else {
      errorText.value = 'Не верный логин или пароль'
    }
  }
}
</script>
