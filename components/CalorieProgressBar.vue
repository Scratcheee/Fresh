<template>

    
  <div  class="card">
    <div class=" flex flex-col m-3">
        <div class="flex justify-center gap-1   ">
        <div class="flex flex-col items-center"> 
            <span class=" text-3xl">{{ calGoal }}</span>
            <span class="">Goal</span>
        </div>
        <span class=" text-3xl">-</span>

        <div class="flex flex-col items-center"> 
            <span class=" text-3xl">{{ todaysCals }}</span>
            <span class="">Current</span>
        </div>
        <span class=" text-3xl">=</span>

        <div class="flex flex-col items-center"> 
            <span class=" text-3xl">{{ calGoal - personalStore.todaysCalories + workout }}</span>
            <span class="">remaining</span>
        </div>

    </div>
 
    </div>
  </div>
</template>

<script setup>
defineProps({
    calCount: Number,
    workout: Number,
    calGoal: Number,
})
import { usePersonalStore } from '@/stores/personalInfoStore';
import { useFoodLogStore } from '@/stores/foodLogStore';

const personalStore = usePersonalStore()
const foodStore = useFoodLogStore()
const calGoal = ref(personalStore.calorieGoal)
const totalCal = foodStore.foodLog.reduce((total, item) => total + item.calories, 0);
const todaysCals = ref(personalStore.todaysCalories)
const workout = personalStore.workoutCals * personalStore.todaysWorkout

// console.log(remainingCal.value)
// console.log(personalStore.todaysData[0].workout)
</script>

<style scoped>


.card {
  background: #e0e9f1;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 12px;
  margin: 20px 0px 20px 0px;
}
</style>