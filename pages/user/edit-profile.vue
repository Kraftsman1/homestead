<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import auth from '~/middleware/auth';
import { useAuthStore } from '~/stores/useAuthStore';	

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);
const error = ref(null);

const { $axios } = useNuxtApp();

const user = ref({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
});

const password = ref({
    old_password: '',
    new_password: '',

});

async function updateUser() {
    loading.value = true;
    try {

        const response = await $axios.put("/user/update-user", 
            user.value,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authStore.accessToken}`,
                },
            }
        );

        if (response.status === 200) {
            // Update user details in the store
            authStore.setUser(response.data.user);
            
            // Redirect to profile page
            router.push('/user/profile');
        }
        
    } catch (_error) {
        console.error(_error.response.data.message);
        error.value = _error.message;
    } finally {
        loading.value = false;
    }
}


</script>
<template>
    <main class="p-6 xl:max-w-6xl xl:mx-auto">
        <section class="mb-8">
            <section class="mb-6 flex items-center justify-between">
                <div class="flex items-center justify-start">
                    <span
                        class="inline-flex justify-center items-center w-12 h-12 rounded-full bg-white text-black dark:bg-slate-900/70 dark:text-white mr-3"><svg
                            viewBox="0 0 24 24" width="24" height="24" class="inline-block">
                            <path fill="currentColor"
                                d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z">
                            </path>
                        </svg></span>
                    <h1 class="text-3xl leading-tight">Edit Profile</h1>
                </div>
            </section>

            <div class="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div class="col-span-1 md:col-span-1">
                    <div class="flex flex-col items-center justify-center">
                        <span class="relative flex shrink-0 overflow-hidden rounded-full h-24 w-24">
                            <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">JD</span>
                        </span>
                        <h3 class="mt-4 text-lg font-semibold">John Doe</h3>
                        <p class="text-gray-500 dark:text-gray-400">Joined in January 2021</p>
                    </div>
                </div>
                <div class="col-span-1 md:col-span-2">

                    <form @submit.prevent="updateUser">
                        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div class="space-y-2">
                                <label
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="firstname">
                                    First Name
                                </label>
                                <input type="text" v-model="user.firstname"
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="firstname" placeholder="John" />
                            </div>
                            <div class="space-y-2">
                                <label
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="lastname">
                                    Last Name
                                </label>
                                <input type="text" v-model="user.lastname"
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="lastname" placeholder="Doe" />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div class="space-y-2">
                                <label
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="username">
                                    Username
                                </label>
                                <input type="text" v-model="user.username"
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="username" placeholder="JohnD" />
                            </div>
                            <div class="space-y-2">
                                <label
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="email">
                                    Email
                                </label>
                                <input type="email" v-model="user.email"
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="email" placeholder="Enter your email" />
                            </div>
                        </div>

                        <button :disabled="loading"
                            class="block w-full rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                            <span v-if="loading" class="mr-2">
                                <svg class="animate-spin h-5 w-5 text-white inline-block"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4">
                                    </circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm2-3.447V6.618a7.946 7.946 0 012.345-.004L10 8.844z">
                                    </path>
                                </svg>
                            </span>
                            <span v-else>Save Changes</span>
                        </button>

                    </form>

                    <form @submit.prevent="">
                        <div class="space-y-2">
                            <label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="profile-picture">
                                Profile Picture
                            </label>
                            <div>
                                <div
                                    class="flex flex-col items-center justify-center h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:border-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="w-12 h-12 text-gray-400">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 3 7 8"></polyline>
                                        <line x1="12" x2="12" y1="3" y2="15"></line>
                                    </svg>
                                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Drop files here or
                                        click to
                                        upload</p>
                                </div>
                            </div>
                        </div>

                        <button :disabled="loading"
                            class="block w-full rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                            <span v-if="loading" class="mr-2">
                                <svg class="animate-spin h-5 w-5 text-white inline-block"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4">
                                    </circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm2-3.447V6.618a7.946 7.946 0 012.345-.004L10 8.844z">
                                    </path>
                                </svg>
                            </span>
                            <span v-else>Login</span>
                        </button>

                    </form>

                    <form @submit.prevent="">
                        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div class="space-y-2">
                                <label
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="password">
                                    Password
                                </label>
                                <input
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="password" placeholder="Enter a new password" type="password" />
                            </div>
                            <div class="space-y-2">
                                <label
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="confirm-password">
                                    Confirm Password
                                </label>
                                <input
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="confirm-password" placeholder="Confirm your new password" type="password" />
                            </div>
                        </div>
                        <button :disabled="loading"
                            class="block w-full rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                            <span v-if="loading" class="mr-2">
                                <svg class="animate-spin h-5 w-5 text-white inline-block"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4">
                                    </circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm2-3.447V6.618a7.946 7.946 0 012.345-.004L10 8.844z">
                                    </path>
                                </svg>
                            </span>
                            <span v-else>Change Password</span>
                        </button>

                    </form>

                    <div class="flex justify-end md:hidden">
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
                            type="submit">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>