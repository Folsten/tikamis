<template>
  <div class="base-input relative px-0 border-0 flex items-center justify-between cursor-pointer">
    <div
      @click="isOpen = !isOpen"
      class="flex w-full justify-between border border-gray-a1a4ad items-center h-full px-[20px]"
    >
      <span class="text-2xl">{{ zone.get(props.timezoneOffsetHours) }}</span>
      <BaseSvgIcon
        name="arrow-down-gray"
        :class="{'rotate-180': isOpen}"
        class="w-[24px] h-[13px]"
      />
    </div>
    <div v-if="isOpen" class="absolute w-full flex top-[63px] min-h-[200px] border border-gray-a1a4ad overflow-y-scroll">
      <div class="absolute flex flex-col w-full bg-white">
        <div
          @click="emit('setTimeZone', key); isOpen = false;"
          v-for="[key, value] of zone"
          :key="key"
          class="flex w-full bg-white py-3 px-[20px] hover:bg-gray-f5f5f5"
        >
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
import { ref } from 'vue';

let zone = new Map();
zone.set(2, '(UTC + 2:00) Калининград');
zone.set(3, '(UTC + 3:00) Москва');
zone.set(4, '(UTC + 4:00) Самара');
zone.set(5, '(UTC + 5:00) Екатерингбург');
zone.set(6, '(UTC + 6:00) Омск');
zone.set(7, '(UTC + 7:00) Красноярск');
zone.set(8, '(UTC + 8:00) Иркутск');
zone.set(9, '(UTC + 9:00) Якутск');
zone.set(10, '(UTC + 10:00) Владивосток');
zone.set(11, '(UTC + 11:00) Магадан');
zone.set(12, '(UTC + 12:00) Камчатка');

let isOpen = ref(false);

let emit = defineEmits(['setTimeZone'])
let props = defineProps({
  timezoneOffsetHours: {
    type: Number,
    required: true
  }
});
</script>
