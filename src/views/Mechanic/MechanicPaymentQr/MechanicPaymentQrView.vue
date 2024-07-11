<template>
  <TheHeader />
  <section
    class="flex flex-col items-center bg-gray-f5f5f5 h-[calc(100vh-theme(height.the-header))] pb-6"
  >
    <h1 class="mt-[40px] text-center text-4xl leading-[48px] font-medium">
      Предоставьте этот QR код на кассу,<br />
      если у клиента не работает приложение
    </h1>
    <div class="w-[438px] flex flex-col items-center h-full">
      <QrcodeVue
        :size="Number(250)"
        class="mt-4 border-gray-a1a4ad"
        :value="mechanicOrderStore.qrcode"
      />
      <BaseButtonFilledDark
        @click="clearQrcode"
        class="mt-4"
        >Закрыть</BaseButtonFilledDark
      >
    </div>
  </section>
</template>
<script setup>
import TheHeader from '@/components/TheMechanicHeader.vue';
import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';
import { useMechanicOrderStore } from '@/stores/mechanic/mechanicOrder.js';
import QrcodeVue from 'qrcode.vue';
import router from '@/router/index.js';

let mechanicOrderStore = useMechanicOrderStore()

function clearQrcode() {
  mechanicOrderStore.qrcode = ''
  router.push('/mechanic/order')
}
</script>
