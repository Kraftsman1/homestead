import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    const axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },

        baseURL: useRuntimeConfig().public.apiUrl,
    });

    nuxtApp.provide('axios', axiosInstance);

})