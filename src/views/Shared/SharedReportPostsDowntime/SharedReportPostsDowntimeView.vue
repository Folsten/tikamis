<template>
  <MainHeader />
  <MainHeaderGap />
  <TabularSection>
    <TabularPrimeTitle>Простои постов</TabularPrimeTitle>
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
        <TabularTableCellBottom>Итого простоя:</TabularTableCellBottom>
      </TabularTableColumn>
      <TabularTableColumn
        class="w-1/4"
        id="#columnDowntime"
      >
        <TabularTableCellTop>Время простоя, мин</TabularTableCellTop>
        <TabularTableCell>10</TabularTableCell>
        <TabularTableCell>71</TabularTableCell>
        <TabularTableCell>1</TabularTableCell>
        <TabularTableCell>4</TabularTableCell>
        <TabularTableCell>32</TabularTableCell>
        <TabularTableCell>16</TabularTableCell>
        <TabularTableCellBottom>135 минут</TabularTableCellBottom>
      </TabularTableColumn>
      <TabularTableColumn
        class="w-1/4"
        id="columnDate"
      >
        <TabularTableCellTop>Дата</TabularTableCellTop>
        <TabularTableCell>22.06.2022 09:35</TabularTableCell>
        <TabularTableCell>22.06.2022 09:35</TabularTableCell>
        <TabularTableCell>22.06.2022 09:35</TabularTableCell>
        <TabularTableCell>22.06.2022 09:35</TabularTableCell>
        <TabularTableCell>22.06.2022 09:35</TabularTableCell>
        <TabularTableCell>22.06.2022 09:35</TabularTableCell>
        <TabularTableCellBottom />
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
import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue';
import TabularFilterPeriod from '@/components/Tabular/TabularFilterPeriod.vue';
import TabularFilterEntity from '@/components/Tabular/TabularFilterEntity.vue';
import TabularButtonCross from '@/components/Tabular/TabularButtonCross.vue';
import TabularButtonApplyFilters from '@/components/Tabular/TabularButtonApplyFilters.vue';
import TabularButtonSend from '@/components/Tabular/TabularButtonSend.vue';
import TabularButtonSave from '@/components/Tabular/TabularButtonSave.vue';
import TabularTableColumn from '@/components/Tabular/TabularTableColumn.vue';
import TabularTableCellTop from '@/components/Tabular/TabularTableCellTop.vue';
import TabularTableCell from '@/components/Tabular/TabularTableCell.vue';
import TabularTableCellBottom from '@/components/Tabular/TabularTableCellBottom.vue';
import TabularTable from '@/components/Tabular/TabularTable.vue';
import TabularFiltersWrapper from '@/components/Tabular/TabularFiltersWrapper.vue';
import TabularSection from '@/components/Tabular/TabularSection.vue';
import TabularButtonsWrapper from '@/components/Tabular/TabularButtonsWrapper.vue';
</script>
