<template>    
    <div class="movie-information" v-if="movie">
        <div>
            <h2><i class="pi pi-video"></i> {{ movie.title }}</h2>
            <Image :src="images_url + movie.gallery.split(',')[0]" alt="Image" width="200" height="300" />
        </div>
        <Divider layout="vertical" />
        <div class="details">
           <ul>
                <li><i class="pi pi-calendar"></i> Year: {{ movie.year }}</li>
                <li><i class="pi pi-user"></i> Director: {{ movie.director }}</li>
                <li><i class="pi pi-users"></i> Cast: {{ movie.cast }}</li>
                <li><i class="pi pi-align-justify"></i> Summary: {{ movie.summary }}</li>
           </ul>
        </div>
    </div>
    <div v-else class="loading-movie">
        <Skeleton width="900px" height="400px"></Skeleton>
    </div>
    <div>
        <h1><i class="pi pi-images" style="font-size: 1.5rem;"></i> Gallery</h1>
    </div>
    <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="4" containerStyle="max-width: 640px">
        <template #item="slotProps">
            <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 640px; height: 480px; " />
        </template>
        <template #thumbnail="slotProps">
            <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" width="100" height="100" />
        </template>
    </Galleria>
    <div>
        <h1><i class="pi pi-images" style="font-size: 1.5rem;"></i> You may also like</h1>
    </div>
    <div style="display: flex; gap: 15px;">
        <div v-for="suggestion in suggestions" :key="suggestion._id">
            <RouterLink :to="'/movie/' + suggestion._id">
                <img alt="movie image" :src="images_url + suggestion.gallery.split(',')[0]" style="width: 100%; height: 200px;" />
            </RouterLink>
        </div>        
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import { useRoute, useRouter, RouterLink } from 'vue-router'    
    import Divider from 'primevue/divider'
    import Galleria from 'primevue/galleria'
    import Image from 'primevue/image'
    import Skeleton from 'primevue/skeleton'

    const id = useRoute().params.id
    const router = useRouter()
    const movie = ref(null)
    const gallery = ref(null)
    const images = ref([])
    const images_url = import.meta.env.VITE_SERVER_URL + 'images/'
    const suggestions = ref([])
    const recently = ref([])    
    const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
])

    onMounted(() => {        
        const storage = JSON.parse(localStorage.getItem("recently_movies"))
        if(storage !== null) {
            recently.value = storage
        }
        get_movie(id)
    })
    
    const get_movie = async (id) => {
        await fetch(`/api/movie/${id}`)
        .then((res) => res.json())
        .then(json => {
            if(json.errors === 0) {
                movie.value = json.movie                
                gallery.value = movie.value.gallery.split(",")
                for(let i = 0; i < gallery.value.length; i++) {
                    if(i !== 0) {
                        const image = {
                            itemImageSrc: images_url + gallery.value[i].trim(),
                            thumbnailImageSrc: images_url + gallery.value[i].trim(),
                            alt: `Gallery image ${i} from the movie: ${movie.value.title}`,  
                            title: movie.value.title
                        }
                        images.value.push(image)
                    }
                }
                suggestions.value = json.suggestions
                if(recently.value.length > 0) {
                    if(!recently.value.find((r) => r._id === movie.value._id)) {
                        if(recently.value.length < 5) {
                            const recentlyMovie = {
                                _id: movie.value._id
                            }
                            recently.value.push(recentlyMovie)
                            localStorage.setItem("recently_movies", JSON.stringify(recently.value))
                        }
                    }
                }
                else {
                    const recentlyMovie = {
                        _id: movie.value._id
                    }
                    recently.value.push(recentlyMovie)
                    localStorage.setItem("recently_movies", JSON.stringify(recently.value))                
                }
            }
            else {
                router.push("/notfound")
            }
        })
    }

</script>

<style scoped>    
    .movie-information {
        display: flex;                
        background-color: var(--p-blue-300);
        border-radius: 8px;
        padding: 15px;
        margin-top: 20px;
    }
    .details {
        flex: 2;
        font-size: 22px;
    }
    .loading-movie {
        margin-top: 20px;
    }
</style>