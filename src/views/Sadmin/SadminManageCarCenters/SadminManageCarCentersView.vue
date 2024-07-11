<template>
  <MainHeader />
  <MainHeaderGap />
  <TabularSection>
    <TabularPrimeTitle>Управление автосервисами</TabularPrimeTitle>
    <TabularTable>
      <TabularTableColumn class="flex-[2]">
        <TabularTableCellTop>Адрес</TabularTableCellTop>
        <TabularTableCell v-for="carCenter in carCenters" :key="carCenter.id">{{carCenter.city}}, {{carCenter.address}}</TabularTableCell>
      </TabularTableColumn>
      <TabularTableColumn class="flex-1">
        <TabularTableCellTop>Режим записи</TabularTableCellTop>
        <TabularTableCell v-for="carCenter in carCenters" :key="carCenter.id" :class="{'text-red': carCenter.mode === 3}">{{getQueuingModeText(carCenter.mode)}}</TabularTableCell>
      </TabularTableColumn>
      <TabularTableColumn class="flex-1">
        <TabularTableCellTop>Логин</TabularTableCellTop>
        <TabularTableCell v-for="carCenter in carCenters" :key="carCenter.id">{{carCenter.login}}</TabularTableCell>
      </TabularTableColumn>
      <TabularTableColumn class="flex-1">
        <TabularTableCellTop>Пароль</TabularTableCellTop>
        <TabularTableCell v-for="carCenter in carCenters" :key="carCenter.id" :js-password="carCenter.password">*********</TabularTableCell>
      </TabularTableColumn>
      <TabularTableColumn class="">
        <TabularTableCellTop></TabularTableCellTop>
        <TabularTableCell v-for="carCenter in carCenters" :key="carCenter.id">
          <BaseSvgIcon @click="routeToSettingsPage(carCenter.id)" name="pencil-gray" class="w-6 h-6 cursor-pointer"/>
        </TabularTableCell>
      </TabularTableColumn>
    </TabularTable>
  </TabularSection>
</template>
<script setup>
import TabularSection from '@/components/Tabular/TabularSection.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularTable from '@/components/Tabular/TabularTable.vue';
import TabularTableCellTop from '@/components/Tabular/TabularTableCellTop.vue';
import TabularTableCell from '@/components/Tabular/TabularTableCell.vue';
import TabularTableColumn from '@/components/Tabular/TabularTableColumn.vue';
import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import sadminApiManageCarCenters from '@/api/sadmin/sadminApiManageCarCenters.js'
import { onBeforeMount, ref } from 'vue'
import router from '@/router/index.js'
import BaseSvgIcon from '@/components/BaseSvgIcon.vue'

let carCenters = ref({});

onBeforeMount(async () => {
  const data = await sadminApiManageCarCenters();
  carCenters.value = data.carCenters
})

function getQueuingModeText(mode) {
  if (mode === 1) {return 'Режим записи'}
  if (mode === 2) {return 'Режим без записи'}
  if (mode === 3) {return 'Не настроено'}
}

function routeToSettingsPage(carCenterId) {
  router.push({path: '/sadmin/manage/settings', query: {id: carCenterId}})
}
</script>
