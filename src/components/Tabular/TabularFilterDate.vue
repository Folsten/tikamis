<template>
  <div class="report-filter justify-between min-w-min flex-1">
    <div class="flex-col">
      <div class="report-input-header-text-gray">Начало отсчета</div>
      <div class="report-input-body-text">01.05.2023</div>
    </div>
    <BaseSvgIcon
      class="max-w-[18px] max-h-[18px]"
      name="calendar-gray"
    />
  </div>
</template>
<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
</script>
