<template>
  <section
    v-if="props.isVisible"
    class="z-50 flex justify-center items-center fixed w-full h-screen left-0 top-0 bg-gray-848484"
  >
    <div class="flex flex-col items-center bg-white w-[450px]">
      <BaseSvgIcon
        @click="emit('callback', false)"
        name="cross-black"
        class="ml-auto w-[25px] h-[25px] mt-[22px] mr-[20px] cursor-pointer"
      />
      <div class="flex flex-col items-center mt-[20px] mb-[60px] pl-3 pr-3 text-center">
        <span class="font-medium text-3xl">Выберите автосервисы</span>
        <div class="flex flex-col w-full mt-5">
          <div
            class="flex cursor-pointer p-3 mb-1"
            :class="{ '!bg-gray-2c2d2f': station.isSelected }"
            v-for="station in localCopyOfServiceStations"
            :key="station.id"
            @click="changeSelectedStation(station)"
          >
            <BaseRadioButton :is-active="station.isSelected" />
            <div
              :class="{ '!text-white': station.isSelected }"
              class="ml-[10px]"
            >
              {{ station.city }}, {{ station.addressName }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-full mt-auto">
        <BaseButtonFilledGreen
          @click="emit('callback', true, getSelectedServiceStation().id)"
          class="flex-1"
          >Выбрать</BaseButtonFilledGreen
        >
        <BaseButtonFilledLight
          @click="emit('callback', false)"
          class="flex-1"
          >Отмена</BaseButtonFilledLight
        >
      </div>
    </div>
  </section>
</template>
<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import { ref } from 'vue';
import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import BaseRadioButton from '@/components/BaseRadioButton.vue';

const sadminServiceStationsStore = useSadminServiceStationsStore();
let localCopyOfServiceStations = ref(JSON.parse(JSON.stringify(sadminServiceStationsStore.serviceStations)));

function changeSelectedStation(station) {
  localCopyOfServiceStations.value.forEach((element) => {
    element.isSelected = element.id === station.id;
  })
}

function getSelectedServiceStation() {
  let result;
  localCopyOfServiceStations.value.forEach((station) => {
    if (station.isSelected) {
      result = station
    }
  })
  return result
}

let emit = defineEmits(['callback']);
let props = defineProps({
  isVisible: {
    type: Boolean
  }
});
</script>
