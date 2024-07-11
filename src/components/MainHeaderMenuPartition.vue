<template>
  <div class="flex flex-col border-b-gray-53565b border-b pl-[30px] pr-[20px]">
    <div
      @click="emit('isOpenSwitch', index)"
      class="flex justify-between items-center cursor-pointer py-[30px]"
      :class="{'pb-[10px]': props.isOpen}"
    >
      <span class="text-white text-2xl">{{ props.partition }}</span>
      <BaseSvgIcon
        name="arrow-down-white"
        class="w-[20px] h-[12px]"
        :class="{'rotate-180': props.isOpen}"
      />
    </div>
    <div v-if="props.isOpen" class="flex flex-col justify-center">
      <router-link
        v-for="route in props.routes"
        :key="route.name"
        :to="route.url"
        class="flex flex-col py-[20px] text-lg text-white justify-center"
      >
        {{ route.name }}
      </router-link>
    </div>
  </div>
</template>
<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';

let emit = defineEmits(['isOpenSwitch'])
let props = defineProps({
  partition: {
    type: String,
    required: true
  },
  routes: {
    type: Array,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});
</script>

<style scoped>
.router-link-active {
  color: #87C23E;
}
</style>
