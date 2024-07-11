<template>
  <div
    v-if="props.isSelected"
    class="flex items-center flex-wrap"
  >
    <div
      class="flex justify-center items-center m-1 mt-1 mb-1 px-4 py-3 bg-gray-2c2d2f rounded-full whitespace-nowrap"
    >
      <div class="text-white text-sm mr-2">{{ props.name }}</div>
      <BaseSvgIcon
        @click="emit('deactivateWork', props.index)"
        name="cross"
        class="w-3 h-3 cursor-pointer"
      />
    </div>
  </div>
</template>
<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';

let emit = defineEmits(['deactivateWork']);
let props = defineProps({
  name: { required: true },
  index: { required: true },
  isSelected: { required: true }
});
</script>
