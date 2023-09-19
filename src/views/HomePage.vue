<template>
    <DefaultLayout>
      <ContentApp/>
    </DefaultLayout>
  </template>
  
  <script>
  import DefaultLayout from '@/components/DefaultLayout.vue';
  import ContentApp from '@/views/ContentApp.vue'
  export default {
  
    components: {
      DefaultLayout,
      ContentApp
    }
  }
  </script>
  
  <style>
  @import '@/assets/main.css';
  </style>
  