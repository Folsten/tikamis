<template>
  <div class="report-filters-wrapper flex"><slot/></div>
</template>

<style>
  .report-filters-wrapper > div:not(:first-child) {
    border-left: 0;
  }
</style>