<template>
  <TheHeader />
  <section
    :class="{ '!h-auto': isPostsVisible }"
    class="flex flex-col w-full h-[calc(100vh-theme('height.the-header')-theme('padding.10')-theme('margin.10'))] items-center justify-center mb-10 pt-10"
  >
    <h1 class="flex justify-center text-center text-4xl font-medium">Выберите номер поста</h1>
    <div class="relative">
      <div
        :class="{ 'border-green': isPostsVisible }"
        class="border-2 border-gray-a1a4ad mt-7 flex justify-between w-[337px]"
      >
        <div
          @click="isPostsVisible = !isPostsVisible"
          class="flex w-full items-center justify-between h-[80px] pl-5 pr-5 cursor-pointer"
        >
          <span
            :class="{ '!text-black': isPostSelected }"
            class="text-gray-a1a4ad text-2xl"
            >{{ isPostSelected ? selectedPost : 'Выберите пост' }}</span
          >
          <BaseSvgIcon
            :class="{ 'rotate-180': isPostsVisible }"
            name="arrow-down"
            class="w-[25px] h-[15px]"
          />
        </div>
      </div>
      <div
        v-if="isPostsVisible"
        class="flex flex-col"
      >
        <div
          v-for="post in posts"
          :key="post"
          @click="setPost"
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white"
        >
          {{ post }}
        </div>
      </div>
    </div>
    <BaseButtonFilledGreen
      class="w-[337px] bg-green text-white mt-[30px]"
      @click="formHandler"
      >Войти
    </BaseButtonFilledGreen>
    <div
      v-if="errorText"
      class="text-red mt-4"
    >
      {{ errorText }}
    </div>
  </section>
</template>
<script setup>
import TheHeader from '@/components/TheMechanicHeader.vue';
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import { computed, onMounted, ref } from 'vue';
import mechanicApiGetPosts from '@/api/mechanic/mechanicApiGetPosts.js';

const props = defineProps(['login', 'password']);
const emit = defineEmits(['returnPostNumber', 'updateStep']);

let posts = ref(null);
let isPostSelected = computed(() => selectedPost.value !== 0);
let isPostsVisible = ref(false);
let selectedPost = ref(0);
let errorText = ref('');

onMounted(async () => {
  let data = await mechanicApiGetPosts(props.login, props.password);
  if (data) {
    posts.value = data.posts;
  } else {
    emit('updateStep', 1);
  }
});

function formHandler() {
  isPostSelected.value
    ? emit('returnPostNumber', selectedPost.value)
    : (errorText.value = 'Вы не выбрали пост');
}

function setPost(element) {
  selectedPost.value = element.target.innerHTML;
  isPostsVisible.value = false;
}
</script>
