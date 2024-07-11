<template>
  <MainHeader />
  <MainHeaderGap />
  <TabularSection>
    <TabularPrimeTitle>Дополнительные работы</TabularPrimeTitle>
    <TabularFiltersWrapper>
      <TabularFilterPeriod />
      <TabularFilterDate />
      <TabularFilterEntity />
      <TabularButtonCross />
      <TabularButtonApplyFilters class="flex-[0.5]" />
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
        <TabularTableCellBottom>Итого потерь:</TabularTableCellBottom>
      </TabularTableColumn>
      <TabularTableColumn
        class="w-1/4"
        id="#columnDowntime"
      >
        <TabularTableCellTop>Работы</TabularTableCellTop>
        <TabularTableCell>Все работы</TabularTableCell>
        <TabularTableCell>Все работы</TabularTableCell>
        <TabularTableCell>Все работы</TabularTableCell>
        <TabularTableCell>Все работы</TabularTableCell>
        <TabularTableCell>Все работы</TabularTableCell>
        <TabularTableCell>Все работы</TabularTableCell>
        <TabularTableCellBottom />
      </TabularTableColumn>
      <TabularTableColumn
        class="w-1/4"
        id="columnDate"
      >
        <TabularTableCellTop>Потери</TabularTableCellTop>
        <TabularTableCell>14500 Р</TabularTableCell>
        <TabularTableCell>14500 Р</TabularTableCell>
        <TabularTableCell>14500 Р</TabularTableCell>
        <TabularTableCell>14500 Р</TabularTableCell>
        <TabularTableCell>14500 Р</TabularTableCell>
        <TabularTableCell>14500 Р</TabularTableCell>
        <TabularTableCellBottom>46 400 Р</TabularTableCellBottom>
      </TabularTableColumn>
    </TabularTable>
<!--    <ReportButtonsWrapper>-->
<!--      <ReportButtonSave class="mr-[15px]" />-->
<!--      <ReportButtonSend class="ml-[15px]" />-->
<!--    </ReportButtonsWrapper>-->
  </TabularSection>
</template>

<script setup>
import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue';
import TabularFilterPeriod from '@/components/Tabular/TabularFilterPeriod.vue';
import TabularFilterEntity from '@/components/Tabular/TabularFilterEntity.vue';
import TabularButtonCross from '@/components/Tabular/TabularButtonCross.vue';
import TabularButtonApplyFilters from '@/components/Tabular/TabularButtonApplyFilters.vue';
import TabularTableColumn from '@/components/Tabular/TabularTableColumn.vue';
import TabularTableCellTop from '@/components/Tabular/TabularTableCellTop.vue';
import TabularTableCell from '@/components/Tabular/TabularTableCell.vue';
import TabularTableCellBottom from '@/components/Tabular/TabularTableCellBottom.vue';
import TabularTable from '@/components/Tabular/TabularTable.vue';
import TabularFiltersWrapper from '@/components/Tabular/TabularFiltersWrapper.vue';
import TabularSection from '@/components/Tabular/TabularSection.vue';
import TabularButtonsWrapper from '@/components/Tabular/TabularButtonsWrapper.vue';
import TabularButtonSend from '@/components/Tabular/TabularButtonSend.vue';
import TabularButtonSave from '@/components/Tabular/TabularButtonSave.vue';
</script>
