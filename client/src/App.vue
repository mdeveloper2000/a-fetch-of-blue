<script setup>
  import { RouterView } from "vue-router"
  import NavbarView from "./components/NavbarView.vue"
  import HeaderView from "./components/HeaderView.vue"  
</script>

<template>
  <div class="container">    
    <HeaderView />
    <NavbarView />    
    <RouterView :key="$route.fullPath" />  
  </div>  
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    max-width: 900px;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
  }
</style>