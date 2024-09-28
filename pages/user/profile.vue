<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/useAuthStore';

const authStore = useAuthStore();
const userData = ref(null);
const loading = ref(false);
const error = ref(null);

const { $axios } = useNuxtApp();

await fetchUserDetails();

async function fetchUserDetails() {
    loading.value = true;

    try {

        loading.value = true;
        // set token 
        const token = authStore.accessToken;

        const response = await $axios.get("/user", {
            // set authorization header with token
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        userData.value = response.data.user;
        console.log(userData.value);
    } catch (_error) {
        console.error(error.message);
        error.value = _error.message;
    } finally {
        loading.value = false;
    }
}
</script>

<template>

    <section class="p-6 xl:max-w-6xl xl:mx-auto">
        <section class="mb-6 flex items-center justify-between">
            <div class="flex items-center justify-start"><span
                    class="inline-flex justify-center items-center w-12 h-12 rounded-full bg-white text-black dark:bg-slate-900/70 dark:text-white mr-3"><svg
                        viewBox="0 0 24 24" width="24" height="24" class="inline-block">
                        <path fill="currentColor"
                            d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z">
                        </path>
                    </svg></span>
                <h1 class="text-3xl leading-tight">Profile</h1>
            </div>
        </section>

        <div v-if="error" class="flex items-center justify-center h-64">
            <p> {{ error }}</p>
        </div>
        <div v-else-if="loading" class="flex items-center justify-center h-64">
            <p>Loading...</p>
        </div>
        <div v-else>
            <div v-if="userData" class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex mb-6">
                <div class="flex-1 p-6">
                    <div class="justify-around lg:justify-center items-center block md:flex">
                        <div class="flex items-center justify-center mb-6 md:mb-0">
                            <div class="lg:mx-12"><img :src="userData.profile_image" alt="User Avatar"
                                    class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800">
                            </div>
                        </div>
                        <div class="flex items-center justify-center">
                            <div class="space-y-3 text-center md:text-left lg:mx-12">
                                <div class="flex justify-center md:block"><label class="switch"><input type="checkbox"
                                            name="notifications-switch" value="true"><span class="check"></span><span
                                            class="pl-2">Notifications</span></label>
                                </div>
                                <h1 class="text-2xl"> Howdy, <b>{{ userData.firstname }}</b>! </h1>
                                <p class="text-gray-500">{{ userData.email }}</p>
                                <p>Last login <b>12 mins ago</b> from <b>127.0.0.1</b></p>
                                <div class="flex justify-center md:block">
                                    <div
                                        class="inline-flex items-center capitalize leading-none text-sm border rounded-full py-1.5 px-4 bg-blue-500 border-blue-500 text-white">
                                        <span class="inline-flex justify-center items-center w-4 h-4 mr-2"><svg
                                                viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                                <path fill="currentColor"
                                                    d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z">
                                                </path>
                                            </svg></span><span>Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!---->
            </div>
        </div>
        
    </section>

</template>
