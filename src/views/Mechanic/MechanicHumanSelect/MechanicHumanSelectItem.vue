<template>
  <div
    @click="emit('backMechanic', id, name)"
    class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white"
  >
    {{ name }}
  </div>
</template>

<script setup>
const emit = defineEmits(['backMechanic']);

defineProps({
  id: String,
  name: String
});
</script>
