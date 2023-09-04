<template>
    <div class="flex justify-center gap-8   ">
        <div class="flex flex-col items-center"> 
            <span class="text-white text-3xl">{{ calGoal }}</span>
            <span class="text-white">Goal</span>
        </div>
        <span class="text-white text-3xl">-</span>

        <div class="flex flex-col items-center"> 
            <span class="text-white text-3xl">{{ todaysCals }}</span>
            <span class="text-white">Current</span>
        </div>
        <span class="text-white text-3xl">=</span>

        <div class="flex flex-col items-center"> 
            <span class="text-white text-3xl">{{ calGoal - personalStore.todaysCalories + workout }}</span>
            <span class="text-white">remaining</span>
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

<style scoped></style>