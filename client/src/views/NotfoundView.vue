<template>
    <div>
        <h1>Page Not Found - 404</h1>
        <h2>
            The page or resource you tried to access does not exist. Please try another one or click on one of the links above
        </h2>
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