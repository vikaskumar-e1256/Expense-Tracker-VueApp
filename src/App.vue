<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';
import { ref, computed, onMounted } from 'vue';
import { useToast } from "vue-toastification";

const toast = useToast();

const transactions = ref([]);

onMounted(() => {
  const saveTransaction = JSON.parse(localStorage.getItem('transactions'));
  if (saveTransaction) {
    transactions.value = saveTransaction;
  }
});

const total = computed(() => (
  transactions.value.reduce(function (result, item) {
    return result + item.amount;
  }, 0)
));

const income = computed(() => (
  transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce(function (result, item) {
    return result + item.amount;
  }, 0).toFixed(2)
));

const expense = computed(() => (
  transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce(function (result, item) {
    return result + item.amount;
    }, 0).toFixed(2)
));

const handleTransactionSubmitted = (formData) => {
  transactions.value.push({
    id: generateUniqueId(),
    text: formData.text,
    amount: formData.amount,
  });
  saveTransactionToLocalStorage();
  toast.success('Transaction added');
}

const handleDeleteTransaction = (transactionId) => {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== transactionId);
  saveTransactionToLocalStorage();
  toast.success('Transaction deleted.');
}

const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000);
}

const saveTransactionToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value));
}

</script>

<template>
  <Header />
  <div class="container">
    <Balance :total="Number(total)" />
    <IncomeExpenses :income="Number(income)" :expense="Number(expense)" />
    <TransactionList :transactions="transactions" @deleteTransaction="handleDeleteTransaction" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<style scoped>

</style>
