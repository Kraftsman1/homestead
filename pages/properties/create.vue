<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/useAuthStore';	

const formData = ref({
    name: '',
    description: '',
    property_type: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    max_guests: 0,
    address: '',
    city_id: '',
    region_id: '',
    country_id: '',
    latitude: 0,
    longitude: 0,
    images: [],
});

console.log(formData.value);

const authStore = useAuthStore();

const loading = ref(false);
const error = ref(null);


const { $axios } = useNuxtApp();

async function createProperty() {
    loading.value = true;

    try {

        const token = authStore.getAccessToken;

        const response = await $axios.post('/properties', formData.value, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 201) {
            alert('Property created successfully');
        }
    } catch (_error) {
        error.value = _error.response.data.message;
        console.error(error.value, _error.response.status);
    } finally {
        loading.value = false;
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

        <section class="mt-8">
            <form @submit.prevent="createProperty">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" v-model="formData.name" name="name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" v-model="formData.description" name="description" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                    </div>
                    <div>
                        <label for="property_type" class="block text-sm font-medium text-gray-700">Property Type</label>
                        <input type="text" id="property_type" v-model="formData.property_type" name="property_type" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div>
                        <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                        <input type="number" id="price" v-model="formData.price" name="price" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div>
                        <label for="bedrooms" class="block text-sm font-medium text-gray-700">Bedrooms</label>
                        <input type="number" id="bedrooms" v-model="formData.bedrooms" name="bedrooms" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div>
                        <label for="bathrooms" class="block text-sm font-medium text-gray-700">Bathrooms</label>
                        <input type="number" id="bathrooms" v-model="formData.bathrooms" name="bathrooms" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div>
                        <label for="max_guests" class="block text-sm font-medium text-gray-700">Max Guests</label>
                        <input type="number" id="max_guests" v-model="formData.max_guests" name="max_guests" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div>
                        <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" id="address" v-model="formData.address" name="address" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div>
                        <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                        <input type="text" id="city" v-model="formData.city_id" name="city" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div>
                        <label for="region" class="block text-sm font-medium text-gray-700">Region</label>
                        <input type="text" id="region" v-model="formData.region_id" name="region" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div>
                        <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                        <input type="text" id="country" v-model="formData.country_id" name="country" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div>
                        <label for="latitude" class="block text-sm font-medium text-gray-700">Latitude</label>
                        <input type="number" id="latitude" v-model="formData.latitude" name="latitude" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div>
                        <label for="longitude" class="block text-sm font-medium text-gray-700">Longitude</label>
                        <input type="number" id="longitude" v-model="formData.longitude" name="longitude" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div>
                        <label for="images" class="block text-sm font-medium text-gray-700">Images</label>
                        <input type="file" multiple id="images" v-on:change="formData.images = $event.target.files" name="images" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                </div>
                <div class="mt-4">
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create Property</button>
                </div>
            </form>
        </section>
    </div>
</template>