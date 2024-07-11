<template>
  <TheHeader />
  <section
    :class="{ '!h-auto': isMechanicsVisible }"
    class="flex flex-col w-full h-[calc(100vh-theme('height.the-header')-theme('padding.10')-theme('margin.10'))] items-center justify-center mb-10 pt-10"
  >
    <h1 class="flex justify-center text-center text-4xl font-medium">Выберите механика</h1>
    <div class="relative">
      <div
        :class="{ 'border-green': isMechanicsVisible }"
        class="border-2 border-gray-a1a4ad mt-7 flex justify-between w-[705px]"
      >
        <div
          @click="isMechanicsVisible = !isMechanicsVisible"
          class="flex w-full items-center justify-between h-[80px] pl-5 pr-5 cursor-pointer"
        >
          <span
            :class="{ '!text-black': isMechanicSelected }"
            class="text-gray-a1a4ad text-2xl"
            >{{ isMechanicSelected ? selectedMechanic.name : 'Выберите механика' }}</span
          >
          <BaseSvgIcon
            :class="{ 'rotate-180': isMechanicsVisible }"
            name="arrow-down"
            class="w-[25px] h-[15px]"
          />
        </div>
      </div>
      <div
        v-if="isMechanicsVisible"
        class="flex flex-col"
      >
        <MechanicHumanSelectItem
          v-for="mechanic in mechanics"
          @back-mechanic="pickMechanic"
          :key="mechanic.id"
          :id="mechanic.id"
          :name="mechanic.name"
        />
      </div>
    </div>
    <BaseButtonFilledGreen
      v-if="isMechanicSelected"
      @click="mechanicLogin"
      class="w-[705px] bg-green text-white mt-[30px]"
      >Подтвердить и продолжить
    </BaseButtonFilledGreen>
    <div
      v-if="errorText"
      class="text-red mt-4"
    >
      {{ errorText }}
    </div>
  </section>
</template>

<script setup>
import TheHeader from '@/components/TheMechanicHeader.vue';
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
import { computed, onMounted, ref } from 'vue';
import MechanicHumanSelectItem from '@/views/Mechanic/MechanicHumanSelect/MechanicHumanSelectItem.vue';
// import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue'
import { useMechanicUserStore } from '@/stores/mechanic/mechanicUser.js';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import mechanicApiList from '@/api/mechanic/mechanicApiList.js';
import mechanicApiMechanicLogin from '@/api/mechanic/mechanicApiMechanicLogin.js';
import router from '@/router/index.js';

let mechanicUserStore = useMechanicUserStore();
let isMechanicsVisible = ref(false);
let selectedMechanic = ref({ id: '', name: '' });
let isMechanicSelected = computed(() => selectedMechanic.value.id !== '');
let errorText = ref('');

let mechanics = ref([]);

onMounted(async () => {
  let data = await mechanicApiList();
  mechanics.value = data.mechanics;
});

function pickMechanic(id, name) {
  selectedMechanic.value.id = id;
  selectedMechanic.value.name = name;
  isMechanicsVisible.value = false;
}

async function mechanicLogin() {
  let isMechanicLoggedIn = await mechanicApiMechanicLogin(selectedMechanic.value.id);
  if (isMechanicLoggedIn) {
    mechanicUserStore.activeMechanicId = selectedMechanic.value.id;
    mechanicUserStore.activeMechanicName = selectedMechanic.value.name;
    await router.push('/mechanic/order');
  } else {
    errorText.value = 'Выбранный механик уже занят на другом посте или переданные данные устарели';
  }
}
</script>
