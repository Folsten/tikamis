<template>
  <component
    :is="props.tag"
    class="bg-green text-white flex justify-center items-center text-lg font-semibold pt-5 pb-5 pl-6 pr-6 cursor-pointer"
  >
    <slot />
  </component>
</template>
<script setup>
let props = defineProps({
  tag: {
    default: 'button',
    type: String
  }
});
</script>
