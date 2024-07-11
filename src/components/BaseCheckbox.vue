<template>
  <div
    v-if="!props.isSelected"
    class="w-[24px] h-[24px] border-2 border-black cursor-pointer"
  ></div>
  <div
    v-if="props.isSelected"
    class="flex justify-center items-center w-[24px] h-[24px] bg-green cursor-pointer"
  >
    <BaseSvgIcon
      name="check-mark-white"
      class="w-4 h-4"
    />
  </div>
</template>
<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';

let props = defineProps({
  isSelected: {
    type: Boolean,
    default: false
  },
  entity: {
    default: undefined,
  }
});
</script>
