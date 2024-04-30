<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import useAxios from '@/composables/useAxios';

const router = useRouter();

// Define a ref to store the destination ID, destination, and error
const destinationID = ref(null);


// Get the destination ID from the route params
const { id } = router.currentRoute.value.params;
destinationID.value = id;

// Fetch the destination details using the useAxios composable
const url = `/destinations/${destinationID.value}`;

const { data: destination, error, loading, fetchData} = useAxios(url);

await fetchData();

</script>

<template>
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-12 lg:px-8">
        <h1>Destination Details</h1>

        <div v-if="error">
            <p>{{ error }}</p>
        </div>

        <div v-else-if="destination">

            <!-- Property details -->
            <section class="container mx-auto px-4 py-8">
                <!-- Property image -->
                <div class="relative mb-8">
                    <img :src="destination.images[1].image_url" alt="Property Image"
                        class="w-full max-h-fit rounded-lg shadow-lg">
                    <!-- Text overlay -->
                    <div class="absolute bottom-0 left-0 p-4">
                        <h1 class="text-white text-3xl font-bold">Welcome to {{ destination.name }}</h1>
                        <p class="text-white text-sm">Entire house &middot; 4 guests &middot; 2 bedrooms &middot; 2
                            baths</p>
                    </div>
                </div>

                <!-- Property info -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Left column -->
                    <div>
                        <h1 class="text-3xl font-bold mb-4">Beautiful Beach House</h1>
                        <p class="text-gray-600 mb-4">Entire house &middot; 4 guests &middot; 2 bedrooms &middot; 2
                            baths</p>
                        <p class="text-gray-700 mb-4">{{ destination.description }}</p>
                        <!-- Add more property details as needed -->
                    </div>

                    <!-- Right column -->
                    <div>
                        <div class="bg-white p-4 rounded-lg shadow-lg">
                            <p class="text-xl font-bold mb-2">$200 / night</p>
                            <!-- Add booking button -->
                            <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Book
                                Now</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div v-else-if="loading">
            <p>Loading...</p>
        </div>

    </div>
</template>