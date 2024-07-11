<template>
  <MechanicAuthLoginAndPassForm
    v-if="currentStep === 1"
    @return-login-and-password="setLoginAndPassword"
    :error-text="errorText"
  />
  <MechanicAuthSelectPost
    ref="authSelectPostRef"
    v-if="currentStep === 2"
    @update-step="updateStep"
    @return-post-number="setPostNumber"
    :login="login"
    :password="password"
  />
</template>

<script setup>
import MechanicAuthLoginAndPassForm from '@/views/Mechanic/MechanicAuth/MechanicAuthLoginAndPassForm.vue';
import MechanicAuthSelectPost from '@/views/Mechanic/MechanicAuth/MechanicAuthSelectPost.vue';
import { useMechanicUserStore } from '@/stores/mechanic/mechanicUser.js';
import mechanicApiGetPosts from '@/api/mechanic/mechanicApiGetPosts.js';
import MechanicApiAuthenticatePanel from '@/api/mechanic/mechanicApiAuthenticatePanel.js';
import { ref } from 'vue';
import router from '@/router/index.js';

const mechanicUserStore = useMechanicUserStore();

let currentStep = ref(1);
let login = ref('');
let password = ref('');
let postNumber = ref('');
let errorText = ref('');

let authSelectPostRef = ref(null);

function setLoginAndPassword(newLogin, newPassword) {
  login.value = newLogin;
  password.value = newPassword;
  isLoginAndPasswordValid(newLogin, newPassword);
}

function updateStep(n) {
  currentStep.value = n;
}

function setPostNumber(newPostNumber) {
  postNumber.value = newPostNumber;
  authHandler();
}

async function isLoginAndPasswordValid(newLogin, newPassword) {
  let { posts } = await mechanicApiGetPosts(newLogin, newPassword);
  if (posts) {
    updateStep(2);
  } else {
    errorText.value = 'Не верный логин или пароль';
  }
}

async function authHandler() {
  let data = await MechanicApiAuthenticatePanel(login.value, password.value, postNumber.value);
  if (data) {
    mechanicUserStore.accessToken = data.accessToken;
    mechanicUserStore.refreshToken = data.refreshToken
    await router.push('/mechanic/human-select');
  } else {
    updateStep(1);
  }
}
</script>
