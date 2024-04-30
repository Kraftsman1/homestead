<script setup>
const props = defineProps({
    totalPages: Number,
});

const route = useRoute();
const router = useRouter();

const pages = computed(() => {
    const __pages = [];
    for (let i = 1; i <= props.totalPages; i++) {
        __pages.push(i);
    }
    return __pages;
});

const currentPage = computed(() => Number(route.query.page) || 1);

function back() {
    if (currentPage.value > 1) {
        router.push({ query: { ...route.query, page: currentPage.value - 1 } });
    }
}

function next() {
    if (currentPage.value < props.totalPages) {
        router.push({ query: { ...route.query, page: currentPage.value + 1 } });
    }
}
</script>

<template>
    <ol class="flex justify-center gap-1 text-xs font-medium">
        <li>
            <button :disabled="currentPage === 1"
                class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                @click="back">
                <span class="sr-only">Prev Page</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </li>

        <li v-for="position in pages" :key="position">
            <NuxtLink class="block size-8 rounded border border-gray-100 text-center leading-8 text-gray-900"
                :to="{ query: { ...route.query, page: position } }" :class="{
                'bg-blue-600 text-white': currentPage === position,
            }">
                {{ position }}
            </NuxtLink>
        </li>

        <li>
            <button :disabled="currentPage === totalPages"
                class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                @click="next">
                <span class="sr-only">Next Page</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </li>
    </ol>
</template>
