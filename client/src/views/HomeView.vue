<template>
    <SearchView @showResults="show" />
    <div style="display: flex; gap: 15px;">
        <div v-for="movie in search_results" :key="movie._id">
            <Card style="width: 15rem; overflow: hidden; margin-top: 20px;">
                <template #header>
                    <img alt="movie image" :src="images_url + movie.gallery.split(',')[0]" style="width: 100%; height: 200px;" />
                </template>
                <template #title><strong>{{ movie.title }}</strong></template>            
                <template #content>
                    <p style="height: auto;">{{ movie.cast }}</p>
                </template>
                <template #footer>
                    <Button label="Details" icon="pi pi-video" as="router-link" severity="info" :to="'/movie/'+movie._id" />         
                </template>
            </Card>
        </div>
    </div>
    <div>
        <h2 style="margin-top: 35px;"><i class="pi pi-calendar" style="font-size: 1.5rem;"></i> Recently added movies</h2>
    </div>    
    <div class="movies-container">
        <div v-if="latest.length === 0" v-for="index in 4" :key="index" class="loading-latest">
            <Skeleton width="200px" height="300px"></Skeleton>
            <Skeleton width="200px" height="40px" style="margin-top: 5px;"></Skeleton>            
        </div>
        <div v-for="movie in latest" :key="movie._id" class="latest-movies animate-duration-1000 animate-ease-in-out" v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }">
            <Image :src="images_url + movie.gallery.split(',')[0]" alt="Image" width="200" height="300" />
            <Button label="Details" icon="pi pi-video" as="router-link" severity="info" :to="'/movie/'+movie._id" />
        </div>        
    </div>
    <div>
        <h2 style="margin-top: 35px;"><i class="pi pi-clock" style="font-size: 1.5rem;"></i> Recently seen movies</h2>
    </div>
    <div class="recently-movies">
        <div v-for="recently in recently_movies" :key="recently._id" v-if="recently_movies">
            <RouterLink :to="'/movie/' + recently._id">
                <img alt="movie image" :src="images_url + recently.gallery.split(',')[0]" style="width: 100%; height: 200px;" />
            </RouterLink>        
        </div>
    </div>    
</template>

<script setup>
    
    import SearchView from '@/components/SearchView.vue'
    import Image from 'primevue/image'
    import Button from 'primevue/button'
    import Card from 'primevue/card'
    import Skeleton from 'primevue/skeleton'
    import { onMounted, ref } from 'vue'

    const latest = ref([])
    const recently_movies = ref([])
    const images_url = import.meta.env.VITE_SERVER_URL + 'images/'
    const search_results = ref([])    
    
    onMounted(() => {        
        get_latest()
        get_recently()
    })

    const get_latest = async () => {
        await fetch('/api/', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then((res) => res.json())
        .then(json => {
            if(json.length > 0) {
                latest.value = json                
            }            
        })
    }

    const get_recently = async () => {
        const storage = JSON.parse(localStorage.getItem("recently_movies"))
        let ids = []
        if(storage !== null) {
            for(let i = 0; i < storage.length; i++) {
                ids.push(storage[i]._id)
            }
            await fetch('/api/movies/'+ ids.toString(), {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            .then((res) => res.json())
            .then(json => {
                if(json !== null) {
                    recently_movies.value = json                
                }
            })
        }
    }

    function show(results) {
        search_results.value = results
    }

</script>

<style scoped>    
    .latest-movies, .loading-latest {
        display: flex;        
        flex-direction: column;
        width: 200px;
        margin-top: 30px;
    }
    .movies-container, .recently-movies {
        display: flex;
        align-items: center;        
        gap: 25px;        
    }
</style>