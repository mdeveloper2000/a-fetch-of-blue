<template>
    <Toast />
    <InputGroup class="search-items">
        <Button label="Search" icon="pi pi-search" :loading="searching" @click="search" />
        <InputText placeholder="Search for a movie title" v-model="query" />
    </InputGroup>
</template>

<script setup>
    import InputGroup from 'primevue/inputgroup'
    import Button from 'primevue/button'
    import InputText from 'primevue/inputtext'
    import Toast from 'primevue/toast'
    import { useToast } from 'primevue/usetoast'
    import { ref } from 'vue'

    const query = ref('')
    const emit = defineEmits(['showResults'])
    const movies = ref(null)
    const searching = ref(false)
    const toast = useToast()
    
    const search = (async () => {        
        if(query.value.trim().length > 2) {
            searching.value = true
            await fetch(`/api/movies/search/${query.value}`)
            .then((res) => res.json())
            .then((json) => {
                searching.value = false
                if(json.length > 0) {                    
                    movies.value = json
                    emit('showResults', movies.value)
                }
                else {
                    show("The search hasn\'t returned any results")
                    movies.value = null
                    emit('showResults', movies.value)
                }
            })
        }
        else {
            show('At least three characters must be typed')
        }
    })

    const show = (message) => {
        toast.add({ severity: 'error', summary: 'Message', detail: message, life: 3000 })
    }

</script>

<style scoped>
    .search-items {
        margin-top: 20px;
    }
</style>