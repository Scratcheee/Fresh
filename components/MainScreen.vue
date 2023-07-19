<template>
    <div class="flex flex-col basis-1/3 mx-auto mt-3 grow px-3 max-w-2xl">
        <CalorieProgressBar :calCount="totalCal" :workout="workout" />
        <EntryForm />
        <DailyInputs />
        <DailyLog :foodLog="foodStore.foodLog" />
        {{ foodStore.todaysEatenCals }}

    </div>
</template>

<script setup>
import { usePersonalStore } from '@/stores/personalInfoStore';
import { useFoodLogStore } from '@/stores/foodLogStore';

const personalStore = usePersonalStore()
const foodStore = useFoodLogStore()

const totalCal = foodStore.foodLog.reduce((total, item) => total + item.calories, 0);
const remainingCal = Math.abs(personalStore.calorieGoal - totalCal)
const workout = personalStore.workoutCals * personalStore.todaysWorkout

</script>

<style lang="scss" scoped></style>