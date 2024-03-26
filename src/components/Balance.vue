<script setup>
import { defineProps } from 'vue';

defineProps({
    total: {
        required: true,
        type: Number
    }
})
</script>

<template>
    <h4>Your Balance</h4>
    <h1 id="balance">${{ total }}</h1>
</template>

<style scoped>

</style>
