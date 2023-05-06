<template>
   <table class="table">
  <thead>
    <tr>
    
      <th>Food/Drink</th>
      <th>Calories</th>
      <th>Type</th>
      <th>Hunger</th>
      <th>Time</th>




    </tr>
  </thead>
 
  <tbody>
    
    <tr v-for="(entry, index) in store.todaysMeals" :key="index">
      
      <th>{{entry.name}}</th>
      <td>{{entry.calories}}</td> 
      <td>{{ entry.type }}</td>
      <td>{{ entry.hunger }}</td>
      <td>{{ entry.time}}</td>


    </tr>

  </tbody>
</table>
</template>

<script setup>
  import { useFoodLogStore } from '@/stores/foodLogStore';

  const store = useFoodLogStore()




  
  
</script>

<style scoped>

</style>