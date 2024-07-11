<template>
  <div
    v-if="props.isActive"
    class="flex justify-center items-center w-6 h-6 rounded-full bg-green cursor-pointer"
  >
    <BaseSvgIcon
      name="check-mark-white"
      class="w-3 h-3"
    />
  </div>
  <div
    v-if="!props.isActive"
    class="w-6 h-6 rounded-full border-2 border-gray-2c2d2f cursor-pointer"
  ></div>
</template>

<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';

let props = defineProps({
  isActive: {
    type: Boolean,
    required: true
  }
});
</script>
