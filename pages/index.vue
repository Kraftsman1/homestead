<script setup>

useHead({
    titleTemplate(title) {
        return `Home | ${title}`;
    }
});

</script>

<template>
    <Hero />

    <PopularDestinations />
    <TopRentalProperties />
</template>
