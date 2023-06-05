<template>
   <table class="table rounded-xl ">
  <thead class="">
    <tr class="tablehead">
    
      <th>Food/Drink</th>
      <th>Calories</th>
      <th>Type</th>
      <th>Hunger</th>
      <!-- <th>Time</th> -->
      <!-- <th></th> -->




    </tr>
  </thead>
 
  <tbody>
    
    <tr v-for="(entry, index) in store.foodLog" :key="index">
      
      <th>{{entry.name}}</th>
      <td>{{entry.calories}}</td> 
      <td>{{ entry.type }}</td>
      <td>{{ entry.hunger }}</td>
      <!-- <td>{{ entry.time}}</td> -->
      <!-- <td><font-awesome-icon icon="fa-solid fa-pen-to-square" /></td> -->
      



    </tr>

  </tbody>
</table>
</template>

<script setup>
  import { useFoodLogStore } from '@/stores/foodLogStore';

  const store = useFoodLogStore()




  
  
</script>

<style scoped>
.tablehead {
  background-color: #9F46E4;
  border-radius: 10px;
  

}
.tablehead th {
  color: white;
}
.table {
  background-color: #F2EBFF;
}
</style>