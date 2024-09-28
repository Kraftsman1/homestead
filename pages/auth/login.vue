<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { watchEffect } from 'vue';
import { useAuthStore } from '~/stores/useAuthStore';

definePageMeta({
    middleware: 'auth',
})

const { $axios } = useNuxtApp();
const authStore = useAuthStore();

const router = useRouter();

const form = ref({
    email: '',
    password: '',
});

const loading = ref(false);
const error = ref(null);

function validateForm() {
    if (!form.value.email || !form.value.password) {
        error.value = 'Please fill in all fields';
        return false;
    }

    // Basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(form.value.email)) {
        error.value = 'Please enter a valid email address';
        return false;
    }

    return true;
}

watchEffect(() => {
    console.log(error.value);
});

async function handleLogin() {

    if (!validateForm()) {
        return;
    }

    loading.value = true;
    try {

        const response = await $axios.post("/auth/login",
            form.value,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 200) {
            // alert("Login successful");
            
            // Save user data to store  
            authStore.setUser(response.data.user);

            // Save access token to store
            authStore.setAccessToken(response.data.access_token);

            console.log(authStore.isLoggedIn);

            // Redirect to homepage
            router.push('/');

            // Reset errors
            error.value = null;

            loading.value = false;
        }
    } catch (_error) {
        console.log(_error);
        loading.value = false;
        console.error('An error occured when logging in:', _error.response.data.message);
        error.value = _error.response.data.message;
        // console.log(error.value);
    }
}

</script>

<template>
    <div class="mx-auto max-w-screen-xl max-h-full px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-lg text-center">
            <h1 class="text-center text-2xl font-bold text-blue-600 sm:text-3xl">DC Engine</h1>

            <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
                Welcome back! Please sign in to your account.
            </p>

            <form @submit.prevent="handleLogin" class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                <p class="text-center text-lg font-medium">Sign in to your account</p>

                <div>
                    <label for="email" class="sr-only">Email</label>

                    <div class="relative">
                        <input type="email" v-model="form.email"
                            class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="john@doe.com" required />

                        <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-4 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </span>
                    </div>
                </div>

                <div>
                    <label for="password" class="sr-only">Password</label>

                    <div class="relative">
                        <input type="password" v-model="form.password"
                            class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="password" required />

                        <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-4 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </span>
                    </div>
                </div>

                <!-- Display loading indicator -->
                <button :disabled="loading"
                    class="block w-full rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                    <span v-if="loading" class="mr-2">
                        <svg class="animate-spin h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm2-3.447V6.618a7.946 7.946 0 012.345-.004L10 8.844z">
                            </path>
                        </svg>
                    </span>
                    <span v-else>Login</span>
                </button>

                <div class="flex justify-between items-center">
                    <a href="#" class="text-sm text-blue-600 hover:underline">Forgot password?</a>

                    <p class="text-center text-sm text-gray-500">
                        No account?
                        <a href="/auth/register" class="text-sm text-blue-600 hover:underline">Create an account</a>
                    </p>
                </div>

                <!-- Display validation errors -->
                <div v-if="error" class="bg-red-100 text-red-700 border border-red-400 px-4 py-3 rounded relative"
                    role="alert">
                    <strong class="font-bold">Error! </strong>
                    <span class="block sm:inline">{{ error }}</span>
                </div>
            </form>
        </div>
    </div>
</template>