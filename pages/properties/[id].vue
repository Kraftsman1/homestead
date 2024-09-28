<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import useAxios from '@/composables/useAxios';

const router = useRouter();

// Define a ref to store the property ID, property, and error
const propertyID = ref(null);

const { id } = router.currentRoute.value.params;
propertyID.value = id;

// Fetch the property details using the useAxios composable
const url = `/properties/${propertyID.value}`;

const { data: property, error, loading, fetchData } = useAxios(url);

await fetchData();

const favorited = ref(false);

// Define a function to toggle the favorite status by making a POST request to the API
async function toggleFavorite() {
    try {
        // Check if the user is authenticated
        if (!authStore.isLoggedIn) {
            router.push('/auth/login');
            return;
        }

        // Make a POST request to the API to toggle the favorite status
        const response = await $axios.post(`/properties/${propertyID.value}/favorite`, {}, {
            headers: {
                Authorization: `Bearer ${authStore.accessToken}`,
            },
        });

        if (response.status === 200) {
            // Update the favorited ref based on the response
            favorited.value = response.data.favorited;
        }

        // Update the favorited ref based on the response
        favorited.value = response.data.favorited;
    }
    catch (error) {
        console.error('An error occurred while toggling favorite status:', error.response.data.message);
    }
}

</script>

<template>
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-12 lg:px-8">
        <h1>Property Details</h1>

        <div v-if="error">
            <p>{{ error }}</p>
        </div>

        <div v-else-if="property">

            <!-- Property details -->
            <section class="container mx-auto px-4 py-8">
                <!-- Property image -->
                <div class="relative mb-8">
                    <img :src="property.images[1].image_url" alt="Property Image"
                        class="w-full max-h-fit rounded-lg shadow-lg">
                    <!-- Text overlay -->
                    <div class="">
                        <h1 class="text-white text-3xl font-bold">Welcome to {{ property.name }}</h1>
                        <p class="text-white text-sm">Entire {{ property.property_type }} &middot; {{
                            property.max_guests }} guests &middot; {{ property.bedrooms }} bedrooms &middot; {{
                                property.bathrooms }}
                            baths
                        </p>
                    </div>

                    <!-- Property info -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- Left column -->
                        <div>
                            <h1 class="text-3xl font-bold mb-4">Beautiful {{ property.property_type }}</h1>
                            <p class="text-gray-600 mb-4">Entire {{ property.property_type }} &middot; {{
                                property.max_guests }} guests &middot; {{ property.bedrooms }} bedrooms &middot; {{
                                    property.bathrooms }}
                                baths
                            </p>
                            <p class="text-gray-700 mb-4">{{ property.description }}</p>
                            <!-- Add more property details as needed -->

                            <!-- Address and Location Data -->
                            <h2 class="text-xl font-bold mb-2">Address</h2>
                            <p class="text-gray-700 mb-4">{{ property.address }}, <br /> {{ property.city.name }}, {{
                                property.region.name }}</p>

                            <!-- Amenities -->
                            <h2 class="text-xl font-bold mb-2">Available Amenities</h2>
                            <div class="flex flex-wrap gap-2">
                                <span v-for="amenity in property.amenities" :key="amenity.id"
                                    class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold">
                                    {{ amenity.name }}
                                </span>
                            </div>

                        </div>

                        <!-- Right column -->
                        <div>
                            <div class="bg-white p-4 rounded-lg shadow-lg">
                                <!-- Inline flex -->
                                <div class="flex items center justify-between mb-4">
                                    <div>
                                        <p class="text-gray-600">Price per night</p>
                                        <p class="text-xl font-bold mb-2">GHC {{ property.price }} / night</p>
                                    </div>
                                    <div>
                                        <p class="text-gray-600">Save/Like</p>
                                        <button @click="toggleFavorite" class="text-2xl focus:outline-none">
                                            <icon name="mdi:heart" v-if="favorited" class="text-red-500"></icon>
                                            <icon name="mdi:heart-outline" v-else class="text-gray-500"></icon>
                                        </button>

                                    </div>
                                </div>
                                <!-- Add booking button -->
                                <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Contact
                                    Host</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>

</template>