<script setup>
import { useTransactionStore } from '../stores/transactionStore';

const transactionStore = useTransactionStore();
</script>

<template>
  <div class="inc-exp-container">
    <div>
      <h4>Income</h4>
      <p id="money-plus" class="money plus">+${{ transactionStore.income }}</p>
    </div>
    <div>
      <h4>Expense</h4>
      <p id="money-minus" class="money minus">${{ transactionStore.expense }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
