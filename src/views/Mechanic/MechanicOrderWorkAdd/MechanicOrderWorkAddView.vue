<template>
  <TheHeader />
  <!--  h-[calc(100vh-theme('height.the-header')-theme('padding.10')-theme('margin.10'))]-->
  <section class="flex flex-col w-full h-auto items-center justify-center mb-10 pt-10">
    <span class="flex justify-center text-center text-4xl font-medium">Добавить услуги</span>
    <div class="relative container w-full">
      <div
        :class="{ 'border-green': searchInputText.length > 0 }"
        class="border-2 border-gray-a1a4ad mt-7 flex justify-between"
      >
        <div class="flex w-full items-center h-[80px] px-[30px]">
          <BaseSvgIcon
            v-if="searchInputText.length > 0"
            name="loop-green"
            class="w-6 h-6 mr-5"
          />
          <BaseSvgIcon
            v-else
            name="loop-black"
            class="w-6 h-6 mr-5"
          />
          <input
            v-model="searchInputText"
            type="text"
            placeholder="Начните вводить название услуги"
            class="w-full text-2xl mr-5"
          />
          <BaseSvgIcon
            @click="searchInputText = ''"
            name="cross-in-circle"
            class="w-6 h-6 cursor-pointer ml-auto"
          />
        </div>
      </div>
      <div class="w-full flex flex-col border border-gray-a1a4ad border-t-0">
        <div
          v-if="amountOfSelectedWorks > 0"
          class="flex flex-wrap ml-[26px] mr-[26px] pt-2 pb-2"
        >
          <MechanicOrderWorkAddCracker
            v-for="(work, index) in works"
            :key="work.workId"
            @deactivate-work="deactivateWork"
            :isSelected="work.isSelected"
            :name="work.name"
            :index="index"
          />
        </div>
        <div class="w-full flex flex-col max-h-screen overflow-y-auto">
          <MechanicOrderWorkAddWork
            v-for="(work, index) in works"
            :key="work.workId"
            @toggle-work-selection="toggleWorkSelection"
            :search-input-text="searchInputText"
            :isSelected="work.isSelected"
            :work-id="work.workId"
            :name="work.name"
            :price="work.price"
            :index="index"
          />
        </div>
      </div>
    </div>
  </section>
  <div :class="{'!left-[calc(50%-320px)]': amountOfSelectedWorks > 0}" class="fixed flex justify-center bottom-5 left-[calc(50%-160px)]">
    <BaseButtonFilledLight @click="router.push('/mechanic/order')" class="w-[300px] mr-5">Вернуться к заказу</BaseButtonFilledLight>
    <BaseButtonFilledGreen
      @click="addWorksToOrder"
      v-if="amountOfSelectedWorks > 0"
      class="w-[300px] ml-5"
      >Добавить
      {{
        `${amountOfSelectedWorks} ${getQuantitativeDeclination(
          amountOfSelectedWorks,
          'услугу',
          'услуги',
          'услуг'
        )}`
      }}
    </BaseButtonFilledGreen>
  </div>
</template>
<script setup>
import TheHeader from '@/components/TheMechanicHeader.vue';
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import router from '@/router/index.js';
import MechanicOrderWorkAddWork from '@/views/Mechanic/MechanicOrderWorkAdd/MechanicOrderWorkAddWork.vue';
import MechanicOrderWorkAddCracker from '@/views/Mechanic/MechanicOrderWorkAdd/MechanicOrderWorkAddCracker.vue';
import getQuantitativeDeclination from '@/utils/getQuantitativeDeclination.js';
import { onMounted, ref, computed } from 'vue';
import { useMechanicOrderStore } from '@/stores/mechanic/mechanicOrder.js';
import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';

const mechanicOrderStore = useMechanicOrderStore();
let searchInputText = ref('');
let works = ref([]);

let amountOfSelectedWorks = computed(() => {
  let counter = 0;
  works.value.forEach((work) => {
    if (work.isSelected === true) {
      counter++;
    }
  });
  return counter;
});

onMounted(async () => {
  let { works: originalWorks } = await mechanicOrderStore.workList();
  originalWorks.forEach((work) => {
    work.isSelected = false;
  });
  works.value = originalWorks;
});

function toggleWorkSelection(index) {
  works.value[index].isSelected = !works.value[index].isSelected;
}

function deactivateWork(index) {
  works.value[index].isSelected = false;
}

async function addWorksToOrder() {
  let allSelectedWorkIds = [];
  works.value.forEach((work) => {
    if (work.isSelected === true) {
      work.isSelected = false;
      allSelectedWorkIds.push(work.workId);
    }
  });
  await mechanicOrderStore.workAdd(allSelectedWorkIds);
  await router.push('/mechanic/order');
}
</script>
