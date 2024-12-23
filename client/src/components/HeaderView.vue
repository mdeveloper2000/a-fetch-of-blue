<template>
    <Splitter class="header">
        <SplitterPanel :size="25" :minSize="10" class="splitter">
            <i class="pi pi-video" style="font-size: 2rem;"></i>
            <span>{{ title }}</span>
        </SplitterPanel>
        <SplitterPanel :size="75" class="splitter">
            <span>{{ description }}</span>
        </SplitterPanel>
    </Splitter>    
</template>

<script setup>
    import Splitter from 'primevue/splitter'
    import SplitterPanel from 'primevue/splitterpanel'
    const title = import.meta.env.VITE_APP_TITLE
    const description = import.meta.env.VITE_APP_DESCRIPTION
</script>

<style scoped>
    .header {
        width: 100%;
        height: 150px;
        background-color: var(--p-blue-300);
        margin-bottom: 20px;
    }
    .splitter {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        font-size: 20px;
        font-weight: bold;
    }
</style>