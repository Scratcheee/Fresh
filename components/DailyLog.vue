<template>
  <table class="table rounded-xl my-6 ">
    <thead class="">
      <tr >

        <th>Food/Drink</th>
        <th>Calories</th>
        <th>Type</th>
        <!-- <th>Time</th> -->
        <!-- <th></th> -->




      </tr>
    </thead>

    <tbody>

      <tr v-for="(entry, index) in store.foodLog" :key="index">

        <th @mouseover="mouseOver" >{{ entry.name.substring(0,8) }}{{ (entry.name.length > 8) ? "..." : "" }}</th>
        <td>{{ entry.calories }}</td>
        <td>{{ entry.type }}</td>
        <!-- <td>{{ entry.time}}</td> -->
        <!-- <td><font-awesome-icon icon="fa-solid fa-pen-to-square" /></td> -->




      </tr>

    </tbody>
  </table>
</template>

<script setup>
import { useFoodLogStore } from '@/stores/foodLogStore';

const store = useFoodLogStore()

const mouseOver = () => {

}






</script>

<style scoped>
thead tr {
  background-color: #9F46E4;
  border-radius: 10px;


}
thead th {
  color: white;
}
table {
  border-collapse: separate;
  border-radius: 10px;
  overflow: hidden;
  background-color: #F2EBFF;
}

th:first-child, td:first-child {
  
  border-bottom-left-radius: 10px;
}
th:last-child, td:last-child {

  border-bottom-right-radius: 10px;
}



</style>