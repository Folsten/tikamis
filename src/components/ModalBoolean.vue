<template>
  <section
    v-if="props.isVisible"
    class="z-50 flex justify-center items-center fixed w-full h-screen left-0 top-0 bg-gray-848484"
  >
    <div class="flex flex-col items-center bg-white w-[520px]">
      <div class="flex flex-col items-center mt-[70px] mb-[60px] pl-10 pr-10 text-center">
        <span class="font-medium text-3xl">{{ props.mainTitle }}</span>
        <span class="text-lg mt-6 leading-7">{{ props.mainText }}</span>
      </div>
      <div class="flex w-full mt-auto">
        <component
          :is="primaryButtonComponent"
          @click="emit('callback', true)"
          class="flex-1"
        >
          {{ props.primaryButtonText }}
        </component>
        <BaseButtonFilledLight
          @click="emit('callback', false)"
          class="flex-1"
          >{{ props.secondaryButtonText }}
        </BaseButtonFilledLight>
      </div>
    </div>
  </section>
</template>
<script setup>
import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';

let emit = defineEmits(['callback']);
let props = defineProps({
  isVisible: Boolean,
  mainTitle: String,
  mainText: String,
  primaryButtonComponent: Object,
  primaryButtonText: String,
  secondaryButtonText: String
});
</script>
