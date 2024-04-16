<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const destinations = ref([]);
const error = ref(null);
const page = route.query.page || 1;
const limit = route.query.limit || 2;
const totalPages = ref(0);

const params = new URLSearchParams();
params.append('page', page);
params.append('limit', limit);

const fetchDestinations = async () => {
    try {
        const response = await axios.get('https://dc-engine.markappghana.dev/api/v1/destinations', {
            headers: {
                "Content-Type": "application/json",
            },
            params: params,
        });

        if (response.status === 200) {
            destinations.value = response.data.data;
            totalPages.value = response.data.meta.totalPages;
        }
    } catch (error) {
        // Handle error
        error.value = error.response.data.message;
        if (error.response.status === 404) {
            error.value = 'No destinations found';
        }

        if (error.response.status === 500) {
            error.value = 'An error occurred when fetching destinations';
        }

        console.error(error.value, error.response.status);

    }
};

onMounted(async () => {
    await fetchDestinations();
    
    // Push updated URL to router after fetching destinations
    router.push({ query: params.toString() });
});
</script>


<template>
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-12 lg:px-8">

        <header>
            <h2 class="pl-2 text-l font-bold text-gray-900 sm:text-2xl">Destinations</h2>
        </header>

        <div v-if="error">
            <p>Error: {{ error.value }}</p>
        </div>

        <div v-else-if="destinations.data">
            <DestinationsFilter />
            <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div v-for="destination in destinations.data" :key="destination.id">
                    <a :href="'/destinations/' + destination.id" class="block rounded-lg p-2 shadow-sm shadow-blue-100">
                        <img alt=""
                            src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            class="h-56 w-full rounded-md object-cover" />

                        <div class="mt-2">
                            <dl>
                                <div>
                                    <dt class="sr-only">Price</dt>

                                    <dd class="text-sm text-gray-500">$240,000</dd>
                                </div>

                                <div>
                                    <dt class="sr-only">Address</dt>

                                    <dd class="font-medium">{{ destination.name }}</dd>
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
                                        <p class="text-gray-500">Bathroom</p>

                                        <p class="font-medium">2 rooms</p>
                                    </div>
                                </div>

                                <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                    <svg class="size-4 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>

                                    <div class="mt-1.5 sm:mt-0">
                                        <p class="text-gray-500">Bedroom</p>

                                        <p class="font-medium">4 rooms</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <!-- pagiation -->
            <div class="mt-4 items-center">
                <ol class="flex justify-center gap-1 text-xs font-medium">
                    <li v-if="page > 1">
                        <a href="#" @click.prevent="fetchDestinations(page - 1)"
                            class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900">
                            <span class="sr-only">Prev Page</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>

                    <li v-for="n in totalPages" :key="n">
                        <a href="#"
                        @click.prevent="fetchDestinations(n)"
                            class="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900">
                            1{{ n }}
                        </a>
                    </li>

                    <li v-if="page < totalPages">
                        <a href="#"
                        @click.prevent="fetchDestinations(page + 1)"
                            class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900">
                            <span class="sr-only">Next Page</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                </ol>
            </div>
        </div>

        <div v-else class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <skeleton-loader v-for="n in 12" :key="n" />
        </div>

        <Pagination />



    </div>
</template>