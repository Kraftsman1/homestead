<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/useAuthStore';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const properties = ref([]);
const error = ref(null);
const totalPages = ref(0);

const { $axios } = useNuxtApp();

const page = computed(() => route.query.page || 1);
const limit = ref(route.query.limit || 10);

await fetchProperties();

watch(route, () => {
    fetchProperties();
});

// watch for changes in the limit and update url query
watch(limit, () => {
    router.push({ query: { ...route.query, limit: limit.value } });
});

async function fetchProperties() {
    try {
        const response = await $axios.get("/properties", {
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                page: page.value,
                limit: limit.value,
            },
        });

        if (response.status === 200) {
            properties.value = response.data.data;
            totalPages.value = response.data.data.last_page;
        }
    } catch (_error) {
        // Handle error
        error.value = _error.response.data.message;
        if (_error.response.status === 404) {
            error.value = "No properties found";
        }

        if (_error.response.status === 500) {
            error.value = "An error occurred when fetching properties";
        }

        console.error(error.value, _error.response.status);
    }
}

</script>

<template>
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-12 lg:px-8">
        <header>
            <h2 class="pl-2 text-l font-bold text-gray-900 sm:text-2xl">
                Properties
            </h2>
        </header>

        <div v-if="error" class="text-red-500">
            <p>Error: {{ error.value }}</p>
        </div>

        <div v-else-if="properties.data">
            <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div v-for="property in properties.data" :key="property.id">


                    <a :href="`/properties/${property.id}`" class="block rounded-lg p-2 shadow-sm shadow-blue-100">
                        <img alt="Property Image" :src="property.banner_image.image_url"
                            class="h-56 w-full rounded-md object-cover" />

                        <div class="mt-2">
                            <dl>
                                <div>
                                    <dt class="sr-only">Price</dt>

                                    <dd class="text-sm text-gray-500">GHC {{ property.price }}</dd>
                                </div>

                                <div>
                                    <dt class="sr-only">Address</dt>

                                    <dd class="font-medium">{{ property.name }}</dd>
                                </div>
                            </dl>

                            <div class="mt-6 flex items-center gap-6 text-xs">
                                <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                    <svg class="size-4 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                    </svg>

                                    <div class="mt-1.5 sm:mt-0">
                                        <p class="text-gray-500">Parking</p>

                                        <p class="font-medium">2 spaces</p>
                                    </div>
                                </div>

                                <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                    <svg class="size-4 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>

                                    <div class="mt-1.5 sm:mt-0">
                                        <p class="text-gray-500">{{ property.bathrooms }}</p>

                                        <p class="font-medium"> Bathrooms</p>
                                    </div>
                                </div>

                                <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                    <svg class="size-4 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>

                                    <div class="mt-1.5 sm:mt-0">
                                        <p class="text-gray-500">{{ property.bedrooms }}</p>

                                        <p class="font-medium">Bedrooms</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>


                </div>
            </div>
        </div>

        <div v-else class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <skeleton-loader v-for="n in 12" :key="n" />
        </div>

        <Pagination :totalPages="totalPages" />

        <!-- limit page responses -->
        <div class="mt-4">

            <div class="flex items-center justify-center mt-4">
                <div class="flex items-center space-x-2">
                    <label>
                        <select v-model="limit" class="h-8 text-sm pr-8">
                            <option v-for="option in [5, 10, 25, 50]" :value="option" :key="option">{{ option }}
                            </option>
                        </select>
                        <span class="text-sm font-medium">per page</span>
                    </label>
                </div>
            </div>

            <p class="mt-2 text-sm text-gray-500">Showing {{ properties.to }} of {{ properties.total }} properties
            </p>


        </div>
        


    </div>

</template>