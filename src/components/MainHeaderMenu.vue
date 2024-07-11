<template>
  <div
    v-if="mainStore.isHeaderMenuOpen"
    class="absolute top-[60px] flex flex-col min-w-[276px] max-w-[276px] overflow-y-auto h-[calc(100vh-60px)] bg-gray-2c2d2f"
  >
    <div class="w-full flex flex-col pt-[10px]">
      <TheHeaderMenuPartition
        v-for="(nav, index) in navigation"
        :index="Number(index)"
        :key="nav.partition"
        :is-open="nav.isOpen"
        :partition="nav.partition"
        :routes="nav.routes"
        @isOpenSwitch="isOpenSwitch"
      />
    </div>
    <div
      @click="logout"
      class="mt-auto flex flex-col py-[20px] border-t-gray-53565b border-t text-2xl text-white justify-center pl-[30px] pr-[20px] cursor-pointer"
    >
      Выход
    </div>
  </div>
</template>
<script setup>
import TheHeaderMenuPartition from '@/components/MainHeaderMenuPartition.vue';
import { useMainStore } from '@/stores/shared/main.js'
import { ref } from 'vue'
import isEnv from '@/utils/isEnv.js'
import directorApiLogout from '@/api/director/directorApiLogout.js'
import sadminApiLogout from '@/api/sadmin/sadminApiLogout.js'

const mainStore = useMainStore();

async function logout() {
  if (isEnv('director')) {
    await directorApiLogout()
    return;
  }
  if (isEnv('sadmin')) {
    await sadminApiLogout()
  }
}

function isOpenSwitch(index) {
  navigation.value.forEach((nav) => {
    nav.isOpen = false
  })
  navigation.value[index].isOpen = !navigation.value[index].isOpen
}

let navigation = ref([])

if (isEnv('sadmin')) {
  navigation.value = [
    {
      isOpen: false,
      partition: 'Управление',
      routes: [
        { name: 'Аккаунты директоров', url: '/sadmin/manage/car-centers' },
        { name: 'Записи клиентов', url: '/sadmin/manage/customer-records' },
        { name: 'Календарь рабочих смен', url: '/sadmin/manage/calendar' }
      ]
    },
    {
      isOpen: false,
      partition: 'Аналитика',
      routes: [
        { name: 'Загруженность сервиса', url: '/sadmin/analytics/service-workload' },
        { name: 'Видеоархив', url: '/sadmin/analytics' },
        { name: 'КПД постов', url: '/sadmin/analytics/posts-kpd' },
        { name: 'КПД сервиса', url: '/sadmin/analytics/service-kpd' },
        { name: 'Сервисная история', url: '/sadmin/analytics/service-history' },
        { name: 'Отзывы', url: '/sadmin/analytics/reviews' }
      ]
    },
    {
      isOpen: false,
      partition: 'Отчеты',
      routes: [
        { name: 'Простои постов', url: '/sadmin/report/posts-downtime' },
        { name: 'Не приехавшие клиенты', url: '/sadmin/report/customer-skips' },
        { name: 'Заказанные, но не выполненные работы', url: '/sadmin/report/canceled-works' },
        { name: 'Дополнительные работы', url: '/sadmin/report/added-works' },
        { name: 'Фальшивые гос.номера', url: '/sadmin//report/plate-fakes' },
        { name: 'Подозрительная привязка телефонов', url: '/sadmin/report/suspicious-phones' }
      ]
    }
  ]
}

if (isEnv('director')) {
  navigation.value = [
    {
      isOpen: false,
      partition: 'Управление',
      routes: [
        { name: 'Технические настройки', url: '/director/manage/settings' },
        { name: 'Записи клиентов', url: '/director/manage/customer-records' },
        { name: 'Календарь рабочих смен', url: '/director/manage/calendar' }
      ]
    },
    {
      isOpen: false,
      partition: 'Аналитика',
      routes: [
        { name: 'Загруженность сервиса', url: '/director/analytics/service-workload' },
        { name: 'Видеоархив', url: '/director' },
        { name: 'КПД постов', url: '/director/analytics/posts-kpd' },
        { name: 'КПД сервиса', url: '/director/analytics/service-kpd' },
        { name: 'Сервисная история', url: '/director/analytics/service-history' },
        { name: 'Отзывы', url: '/director/analytics/reviews' }
      ]
    },
    {
      isOpen: false,
      partition: 'Отчеты',
      routes: [
        { name: 'Простои постов', url: '/director/report/posts-downtime' },
        { name: 'Не приехавшие клиенты', url: '/director/report/customer-skips' },
        { name: 'Заказанные, но не выполненные работы', url: '/director/report/canceled-works' },
        { name: 'Дополнительные работы', url: '/director/report/added-works' },
        { name: 'Фальшивые гос.номера', url: '/director/report/plate-fakes' },
        { name: 'Подозрительная привязка телефонов', url: '/director/report/suspicious-phones' }
      ]
    }
  ]
}


</script>
