<template>
    
    <div class="flex flex-col basis-1/3 mx-auto mt-3 grow px-3 max-w-2xl">

        <CalorieProgressBar :calCount="remainingCal" :workout="workout" :calGoal="calGoal" />
        <EntryForm />
        <DailyInputs />

        <DailyLog :meals="foodStore.meals" />
        <!-- {{ personalStore.todaysData[0].calorie_count }} -->
        {{ personalStore.todaysCalories }}


    </div>
</template>

<script setup>
import { usePersonalStore } from '@/stores/personalInfoStore';
import { useFoodLogStore } from '@/stores/foodLogStore';

const personalStore = usePersonalStore()
const foodStore = useFoodLogStore()
const calGoal = ref(personalStore.calorieGoal)
const totalCal = foodStore.foodLog.reduce((total, item) => total + item.calories, 0);
// const remainingCal = ref(personalStore.todaysData.calorie_count)
const workout = personalStore.workoutCals * personalStore.todaysWorkout
// console.log(personalStore.todaysData[0].calorie_count)

</script>

<style lang="scss" scoped></style>