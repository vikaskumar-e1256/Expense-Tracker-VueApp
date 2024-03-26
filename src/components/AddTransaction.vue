<script setup>
import { ref } from 'vue';
import { useToast } from "vue-toastification";

const toast = useToast();

const emit = defineEmits(['transactionSubmitted']);

const text = ref('');
const amount = ref('');
const onSubmit = () => {
  if (!text.value || !amount.value) {
    toast.error('Both fields are required!');
    return;
  }
  const formData = {
    text: text.value,
    amount: parseFloat(amount.value)
  }
  emit('transactionSubmitted', formData);
  text.value = '';
  amount.value = '';
}
</script>

<template>
    <h3>Add new transaction</h3>
    <form id="form" @submit.prevent="onSubmit">
        <div class="form-control">
          <label for="text">Text</label>
          <input type="text" v-model="text" id="text" placeholder="Enter text..." />
        </div>
        <div class="form-control">
          <label for="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" v-model="amount" id="amount" placeholder="Enter amount..." />
        </div>
        <button class="btn">Add transaction</button>
    </form>
</template>

<style scoped>

</style>
