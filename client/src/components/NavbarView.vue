<template>
    <nav>
        <Button as="router-link" icon="pi pi-home" label="Home" to="/" :raised="true" />                
        <Button as="router-link" icon="pi pi-info-circle" label="About" to="/about" :raised="true" />
    </nav>
</template>

<script setup>    
    import Button from 'primevue/button'    
</script>

<style scoped>
    nav {
        display: flex;
        gap: 20px;
    }
    .router-link-active {
        background-color: var(--p-blue-500);
        border: var(--p-blue-500);        
    }
</style>