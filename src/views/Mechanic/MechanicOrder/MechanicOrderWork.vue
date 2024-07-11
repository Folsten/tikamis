<template>
  <teleport to="body">
    <ModalBoolean
      @callback="removeWork"
      :is-visible="isModalVisible"
      :primary-button-component="BaseButtonFilledRed"
      main-title="Удалить услугу из заказа?"
      main-text="Вы сможете её снова включить в заказ"
      primary-button-text="Да, удалить"
      secondary-button-text="Отмена"
    />
  </teleport>
  <div
    v-for="work in mechanicOrderStore.works"
    :key="work.id"
    class="flex items-center justify-between px-[30px] border-t h-[80px] border-gray-a1a4ad"
  >
    <span class="text-black text-2xl">{{ work.name }}</span>
    <BaseSvgIcon
      @click="localHandler(work)"
      name="trash-bin"
      class="w-[22px] h-[25px] cursor-pointer"
    ></BaseSvgIcon>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
import { useMechanicOrderStore } from '@/stores/mechanic/mechanicOrder.js';
import BaseButtonFilledRed from '@/components/BaseButtonFilledRed.vue';
import ModalBoolean from '@/components/ModalBoolean.vue';

let props = defineProps({
  odometer: {
    required: true
  }
})

const mechanicOrderStore = useMechanicOrderStore();
let isModalVisible = ref(false);
let workId = ref();

function localHandler(work) {
  if (props.odometer === '') {
    alert('Для удаления работы из заказа необходимо указать пробег автомобиля');
    return;
  }
  workId.value = work.id;
  isModalVisible.value = true;
}

async function removeWork(isConfirmed) {
  if (isConfirmed) {
    await mechanicOrderStore.workRemove(workId.value);
  }
  isModalVisible.value = false;
}
</script>
