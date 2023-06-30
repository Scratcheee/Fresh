<template>
  <div class="mx-4">
    <Auth />
  </div>
  </template>
  
  <script setup>
  definePageMeta({
    middleware: ['auth']
})
  

  </script>
  
  <style  scoped></style>