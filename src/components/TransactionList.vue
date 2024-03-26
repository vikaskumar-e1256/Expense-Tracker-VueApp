<script setup>
import { useTransactionStore } from '../stores/transactionStore';

const transactionStore = useTransactionStore();

</script>

<template>
    <h3>History</h3>
    <ul id="list" class="list">
        <li v-for="transaction in transactionStore.transactions" :key="transaction.id" :class="transaction.amount < 0 ? 'minus' : 'plus'
        ">
            {{ transaction.text }} <span>${{ transaction.amount }}</span>
            <button @click="transactionStore.handleDeleteTransaction(transaction.id)" class="delete-btn">x</button>
        </li>
    </ul>
</template>

<style scoped>
</style>