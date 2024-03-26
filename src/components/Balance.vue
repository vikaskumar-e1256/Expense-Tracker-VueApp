<script setup>
import { useTransactionStore } from '../stores/transactionStore';

const transactionStore = useTransactionStore();
</script>

<template>
    <h4>Your Balance</h4>
    <h1 id="balance">${{ transactionStore.total }}</h1>
</template>

<style scoped>

</style>
