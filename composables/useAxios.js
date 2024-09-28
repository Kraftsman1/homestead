import { ref } from 'vue';
import axios from 'axios';

export default function useAxios(url, options) {

    const { $axios } = useNuxtApp();

    const data = ref(null);
    const error = ref(null);
    const loading = ref(false);
     // Axios cancel token source
    let source = null;



    const fetchData = async () => {
        loading.value = true;
         // Reset error before new fetch
        error.value = null;

        // Cancel previous request if it exists
        if (source) {
            source.cancel("Request canceled due to new request");
        }

        // Create new cancel token source
        source = axios.CancelToken.source();

        try {

            const response = await $axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // params: params,
                cancelToken: source.token,
                ...(options ?? {}),
            });

            if (response.status === 200) {
                data.value = response.data.data;
            }

        } catch (error) {
            if (!axios.isCancel(error)) {
                error.value = error;
            }

            if (error.response) {
                error.value = error.message;
            }

            console.log('Error fetching data:', error.value);

        } finally {
            loading.value = false;
        }
    };


    return ({
        data,
        error,
        loading,
        fetchData
    });
}
