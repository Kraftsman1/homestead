<template>
    <div v-if="!loading && !error">
        {{ userDetails }}
    </div>
    <div v-else-if="loading">
        <p>Loading user details...</p>
    </div>
    <div v-else>
        <p>{{ error }}</p>
    </div>
</template>

<script setup>
import useAxios from "@/composables/useAxios";

const userDetails = ref(null);
const error = ref(null);
const loading = ref(false);

async function fetchUserDetails() {
    try {
        loading.value = true;
        const { $axios } = useNuxtApp();

        const response = await $axios.get("/user", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            userDetails.value = response.data.data;
        }
    } catch (_error) {
        error.value = _error.response?.data?.message ?? "An unknown error occurred.";
        console.error(error.value, _error.response?.status);
    } finally {
        loading.value = false;
    }
}

fetchUserDetails();
</script>

<style scoped>
/* Add any styling here */
</style>