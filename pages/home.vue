<template>
    <div class="flex flex-col sm:flex-row" v-if="user">
        <div class="flex flex-col basis-1/3 mx-auto mt-3 grow px-3 max-w-2xl">
            <CalorieProgressBar :calCount="remainingCal" :workout="workout" />
   

            <div class="mt-6">
                <EntryForm />
            </div>
            <div>
                <DailyInputs />
            </div>
            <DailyLog />
           
        </div>
       

</div>
<div v-else>
    <h1>Loading...</h1>
    <h2>Please Wait</h2>
</div>
</template>

<script setup>
import { usePersonalStore } from '@/stores/personalInfoStore';
import { useFoodLogStore } from '@/stores/foodLogStore';

definePageMeta({
    middleware: ['auth']
})
const user = useSupabaseUser()
onMounted(() => {
    watchEffect(() => {
        if(!user.value) {
            navigateTo('/')
        }
    })
})

const personalStore = usePersonalStore()
const foodStore = useFoodLogStore()
const remainingCal = Math.abs(personalStore.calorieGoal - foodStore.todaysCals)
const workout = personalStore.workoutCals * personalStore.todaysWorkout


</script>

<style  scoped></style>