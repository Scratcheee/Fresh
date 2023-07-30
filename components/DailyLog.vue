<template>
  <table class="table rounded-xl my-6 ">
    <thead class="">
      <tr>
        <th>Food/Drink</th>
        <th>Calories</th>
        <th>Type</th></tr>
    </thead>
    <tbody>
      <tr v-for="(entry, index) in foodLog" :key="index">
        <th @mouseover="mouseOver">{{ entry.name.substring(0, 8) }}{{ (entry.name.length > 8) ? "..." : "" }}</th>
        <td>{{ entry.calories }}</td>
        <td>{{ entry.type }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const {foodLog} = defineProps({
  foodLog: Array

})
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
th:first-child,
td:first-child {
  border-bottom-left-radius: 10px;
}
th:last-child,
td:last-child {
  border-bottom-right-radius: 10px;
}
</style>