<template>
  <MainHeader />
  <MainHeaderGap />
  <TabularSection>
    <TabularPrimeTitle>Заказанные, но не выполненные работы</TabularPrimeTitle>
    <TabularFiltersWrapper>
      <TabularFilterPeriod />
      <TabularFilterDate />
      <TabularFilterEntity />
      <TabularFilterJobs />
      <TabularButtonCross />
      <TabularButtonApplyFilters />
    </TabularFiltersWrapper>
    <TabularTable class="mt-5">
      <TabularTableColumn
        class="w-1/2"
        id="#columnMechanics"
      >
        <TabularTableCellTop>Механик</TabularTableCellTop>
        <TabularTableCell>Соколов Виктор Фёдорович</TabularTableCell>
        <TabularTableCell>Бабизян Рисов Карп</TabularTableCell>
        <TabularTableCell>Неорденко Николаев Крисп</TabularTableCell>
        <TabularTableCell>Рычагов Невернти</TabularTableCell>
        <TabularTableCell>Анатолий Басурман Крехтехович</TabularTableCell>
        <TabularTableCell>Серпиголовый Каруман</TabularTableCell>
        <TabularTableCellBottom>Итого простоя:</TabularTableCellBottom>
      </TabularTableColumn>
      <TabularTableColumn
        class="w-1/4"
        id="columnJobs"
      >
        <TabularTableCellTop>Работы</TabularTableCellTop>
        <TabularTableCell>10</TabularTableCell>
        <TabularTableCell>71</TabularTableCell>
        <TabularTableCell>1</TabularTableCell>
        <TabularTableCell>4</TabularTableCell>
        <TabularTableCell>32</TabularTableCell>
        <TabularTableCell>16</TabularTableCell>
        <TabularTableCellBottom></TabularTableCellBottom>
      </TabularTableColumn>
      <TabularTableColumn
        class="w-1/4"
        id="columnLost"
      >
        <TabularTableCellTop>Потери</TabularTableCellTop>
        <TabularTableCell>14 600 ₽</TabularTableCell>
        <TabularTableCell>14 600 ₽</TabularTableCell>
        <TabularTableCell>14 600 ₽</TabularTableCell>
        <TabularTableCell>14 600 ₽</TabularTableCell>
        <TabularTableCell>14 600 ₽</TabularTableCell>
        <TabularTableCell>14 600 ₽</TabularTableCell>
        <TabularTableCellBottom>46 400₽</TabularTableCellBottom>
      </TabularTableColumn>
    </TabularTable>
    <TabularButtonsWrapper>
      <TabularButtonSave class="mr-[15px]" />
      <TabularButtonSend class="ml-[15px]" />
    </TabularButtonsWrapper>
  </TabularSection>
</template>
<script setup>
import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularFilterPeriod from '@/components/Tabular/TabularFilterPeriod.vue'
import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue'
import TabularTableColumn from '@/components/Tabular/TabularTableColumn.vue'
import TabularFiltersWrapper from '@/components/Tabular/TabularFiltersWrapper.vue'
import TabularFilterEntity from '@/components/Tabular/TabularFilterEntity.vue'
import TabularTable from '@/components/Tabular/TabularTable.vue'
import TabularTableCellBottom from '@/components/Tabular/TabularTableCellBottom.vue'
import TabularButtonCross from '@/components/Tabular/TabularButtonCross.vue'
import TabularButtonsWrapper from '@/components/Tabular/TabularButtonsWrapper.vue'
import TabularButtonApplyFilters from '@/components/Tabular/TabularButtonApplyFilters.vue'
import TabularTableCell from '@/components/Tabular/TabularTableCell.vue'
import TabularTableCellTop from '@/components/Tabular/TabularTableCellTop.vue'
import TabularButtonSave from '@/components/Tabular/TabularButtonSave.vue'
import TabularButtonSend from '@/components/Tabular/TabularButtonSend.vue'
import TabularSection from '@/components/Tabular/TabularSection.vue'
import TabularFilterJobs from '@/components/Tabular/TabularFilterJobs.vue'
</script>
