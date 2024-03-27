import { defineStore } from 'pinia';
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();


export const useTransactionStore = defineStore('transactions', () => {

    const transactions = ref([]);

    const localStorageData = localStorage.getItem('transactions');
    if (localStorageData) {
        transactions.value = JSON.parse(localStorageData);
    }
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

    return { handleDeleteTransaction, handleTransactionSubmitted, expense, income, total, transactions }
})