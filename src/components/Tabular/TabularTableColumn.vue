<template>
  <div class="report-table-column flex flex-col"><slot/></div>
</template>

<style>
  .report-table-column:first-child > div {
    padding-left: 20px;
  }
  .report-table-column:last-child > div {
    padding-right: 20px;
  }
</style>