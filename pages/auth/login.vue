<script setup>
import { ref } from 'vue';

const form = ref({
    email: '',
    password: '',
});

const error = ref(null);

async function handleLogin() {
    try {
        const response = await fetch("https://dc-engine.markappghana.dev/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form.value),
        });

        if (response.ok) {
            console.log("Login successful");

            // Redirect to homepage
            window.location.href = "/";

            // Reset errors
            error.value = null;
        } else {
            const data = await response.json();

            if (response.status === 422) {
                error.value = data.errors;
            } else {
                console.error('Login failed:', data.message)
                error.value = ('An error occured during login:', { message: data.message });
            }
        }
    } catch (error) {
        console.error('An error occured during login:', error.message)
        error.value = ('An error occured during login:', error);
    }
}

</script>

<template>
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-lg">
            <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">DC Engine</h1>

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
                            placeholder="john@doe.com" />

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
                            placeholder="password" />

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

                <button type="submit"
                    class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">
                    Login
                </button>

                <p class="text-center text-sm text-gray-500">
                    No account?
                    <a class="underline" href="/auth/register">Sign up</a>
                </p>
                <!-- Display validation errors -->
                <div v-if="error">
                    <ul>
                        <li v-for="(messages, field) in error" :key="field">
                            {{ field }}: {{ Array.isArray(messages) ? messages.join(', ') : messages }}
                        </li>
                    </ul>
                </div>
            </form>
        </div>
    </div>
</template>