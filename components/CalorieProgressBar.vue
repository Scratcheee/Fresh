<template>
    <div class="flex items-center flex-col  ">
        <span class="text-white text-3xl">{{calGoal - personalStore.todaysData[0].calorie_count}}</span>
        <span class="text-white">remaining</span>
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
const remainingCal = ref(personalStore.todaysData[0].calorie_count)
const workout = personalStore.workoutCals * personalStore.todaysWorkout

console.log(remainingCal.value)
console.log(personalStore.todaysData[0].workout)
</script>

<style scoped>
</style>