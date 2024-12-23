<template>
    <div>
        <h1>{{ description }}</h1>
        <h2>{{ details }}</h2>
    </div>        
</template>

<script setup>
    const description = import.meta.env.VITE_APP_DESCRIPTION
    const details = import.meta.env.VITE_APP_DETAILS
</script>

<style scoped>
    div {
        background-color: var(--p-blue-400);
        padding: 20px;
        border-radius: 12px;
        margin-top: 20px;
        text-align: center;
    }
</style>