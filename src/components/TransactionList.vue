<script setup>
import { onMounted, ref } from 'vue';
import { useTransactionStore } from '../stores/transactionStore';

const transactionStore = useTransactionStore();
const transactionsData = ref([]);

onMounted(() => {
    transactionsData.value = transactionStore.transactions;
});

const handleDelete = (transactionId) => {
    transactionStore.handleDeleteTransaction(transactionId);
    transactionsData.value = transactionStore.transactions;
}
</script>

<template>
    <h3>History</h3>
    <ul id="list" class="list">
        <li v-for="transaction in transactionsData" :key="transaction.id"
            :class="transaction.amount < 0 ? 'minus' : 'plus'">
            {{ transaction.text }} <span>${{ transaction.amount }}</span>
            <button @click="handleDelete(transaction.id)" class="delete-btn">x</button>
        </li>
    </ul>
</template>

<style scoped></style>