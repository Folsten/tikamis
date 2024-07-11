<template>
  <ModalBoolean
    :is-visible="isModalVisible"
    @callback="orderCancel"
    :primary-button-component="BaseButtonFilledDark"
    main-title="Начать следующий заказ?"
    main-text="К этому заказу больше нельзя будет вернуться. Он будет отменён"
    primary-button-text="Следующий заказ"
    secondary-button-text="Отмена"
  />
  <TheHeader />
  <section class="flex flex-col container lg:container mt-[60px] h-[calc(100vh-120px)]">
    <div
      v-if="mechanicOrderStore.orderId === undefined"
      class="flex justify-center items-center text-5xl font-semibold text-center"
    >
      Нету доступных заказов
    </div>
    <div v-else class="w-full flex flex-col">
      <div class="w-full flex">
        <span
          class="flex flex-1 border border-gray-a1a4ad text-5xl text-black pl-[30px] pr-[30px] py-9 leading-none"
        >
          Заказ {{ mechanicOrderStore.plateNumber }}
        </span>
        <div
          class="relative pt-5 pb-5 flex flex-col items-center justify-center w-[242px] bg-gray-2c2d2f"
        >
          <div class="relative flex w-full justify-center items-center">
            <BaseSvgIcon
              name="watch"
              class="absolute left-5 w-[20px] h-[20px]"
            />
            <span class="text-white font-medium">Начало работы</span>
          </div>
          <span class="font-light text-5xl text-white">{{ mechanicOrderStore.startTime }}</span>
          <span class="text-gray-a1a4ad text-sm">{{ mechanicOrderStore.startDate }}</span>
        </div>
        <div
          :class="{ '!border-red': isLowTime, '!bg-red-light': isLowTime }"
          class="pt-5 pb-5 flex flex-col justify-center items-center bg-white w-[280px] border-gray-a1a4ad border"
        >
          <div class="flex flex-col w-fit items-start">
            <div class="relative flex items-center">
              <BaseSvgIcon
                v-if="!isLowTime"
                name="time-left-black"
                class="w-[20px] h-[20px] mr-2"
              />
              <BaseSvgIcon
                v-if="isLowTime"
                name="time-left-red"
                class="w-[20px] h-[20px] mr-2"
              />
              <span
                :class="{ '!text-red': isLowTime }"
                class="text-black font-medium text-left"
                >Осталось</span
              >
            </div>
            <span
              :class="{ '!text-red': isLowTime }"
              class="text-black text-5xl mb-[20px]"
              >{{ mechanicOrderStore.formattedCompletionTime }}</span
            >
          </div>
        </div>
      </div>
      <div class="w-full border border-gray-a1a4ad mt-10">
        <div class="bg-gray-f5f5f5">
          <div class="text-gray-a1a4ad px-[30px] py-4">Список услуг в заказе</div>
        </div>
        <MechanicOrderWork :odometer="odometer" />
      </div>
      <div class="flex mt-auto pt-10 pb-6">
        <div
          @click="navigateToOrderWorKAddView"
          class="flex flex-1 justify-center items-center border border-green cursor-pointer py-5"
        >
          <BaseSvgIcon
            name="plus-in-circle"
            class="w-[26px] h-[26px] lg:w-[18px] lg:h-[18px]"
          />
          <span class="font-semibold text-[21px] ml-4 text-green lg:!text-base lg:ml-3"
            >Добавить услугу</span
          >
        </div>
        <BaseButtonFilledGreen
          v-if="!mechanicOrderStore.isOrderAccepted"
          @click="mechanicOrderStore.orderStart"
          class="flex-1 ml-4 mr-4 !text-[21px] !px-0 lg:!text-base"
          >Начать выполнение
        </BaseButtonFilledGreen>
        <div
          v-if="mechanicOrderStore.isOrderAccepted"
          :class="{ '!border-gray-a1a4ad': String(odometer).length > 0 }"
          class="flex flex-1 justify-center items-center ml-4 mr-4 border border-red"
        >
          <input
            type="number"
            v-model="odometer"
            placeholder="Введите пробег, км"
            v-if="mechanicOrderStore.isOrderAccepted"
            class="w-full ml-[30px] text-[21px] flex justify-center items-center placeholder:text-red"
          />
          <BaseSvgIcon
            v-if="odometer.length <= 0"
            name="warning-sign-in-triangle"
            class="w-[26px] h-[26px] mr-[20px]"
          />
          <BaseSvgIcon
            v-else
            name="check-mark-in-circle"
            class="w-[26px] h-[26px] mr-[20px]"
          />
        </div>
        <button
          v-if="!mechanicOrderStore.isOrderAccepted"
          @click="isModalVisible = true"
          class="flex flex-1 justify-center items-center bg-gray-2c2d2f cursor-pointer py-5"
        >
          <span class="text-white font-semibold text-[21px] mr-4 lg:!text-base lg:mr-3"
            >Следующий заказ</span
          >
          <BaseSvgIcon
            name="arrow-right-in-circle"
            class="w-[26px] h-[26px] lg:w-[18px] lg:h-[18px]"
          />
        </button>
        <BaseButtonFilledGreen
          @click="orderComplete"
          v-if="mechanicOrderStore.isOrderAccepted"
          class="flex flex-1 pl-0 pr-0"
          >Завершить заказ</BaseButtonFilledGreen
        >
      </div>
    </div>
  </section>
</template>
<script setup>
import TheHeader from '@/components/TheMechanicHeader.vue';
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';

import MechanicOrderWork from '@/views/Mechanic/MechanicOrder/MechanicOrderWork.vue';
import { useMechanicOrderStore } from '@/stores/mechanic/mechanicOrder.js';
import { ref, computed, onBeforeMount, onBeforeUnmount } from 'vue';
import ModalBoolean from '@/components/ModalBoolean.vue';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';
import router from '@/router/index.js'

const mechanicOrderStore = useMechanicOrderStore();
let updateOrderInfoInterval = '';

let odometer = ref('');
let isModalVisible = ref(false);
let isLowTime = computed(() => mechanicOrderStore.completionTimeHours < 0);

async function orderCancel(isConfirmed) {
  if (isConfirmed) {
    await mechanicOrderStore.orderCancel();
  }
  isModalVisible.value = false;
}

async function orderComplete() {
  if (odometer.value > 0) {
    clearInterval(updateOrderInfoInterval);
    await mechanicOrderStore.orderComplete(odometer.value);
  } else {
    alert('Необходимо указать корректный пробег автомобиля!');
  }
}

function navigateToOrderWorKAddView() {
  if (odometer.value === '') {
    alert('Для добавления работ в заказ необходимо указать пробег автомобиля');
    return;
  }
  router.push('/mechanic/order/work-add');
}

// Интервал необходим, чтобы поддерживать данные заказа в актуальном состоянии
// Чтобы например если клиент откажется от заказа механик тоже смог это увидеть
onBeforeMount(async () => {
  await mechanicOrderStore.orderGetNext();
  updateOrderInfoInterval = setInterval(() => mechanicOrderStore.orderGetNext(), 30000);
});

// Удаление интервала обновления заказа в момент ухода с страницы, чтобы он не оставался в памяти
// При повторном посещении страницы сработает вызов getNext в хуке onMount / onBeforeMount
onBeforeUnmount(() => {
  clearInterval(updateOrderInfoInterval);
});
</script>
