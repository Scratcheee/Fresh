<template>
    <div class=" justify-around flex mt-6">
        <div class="flex  gap-6">
            <div>
                <label class="label text-white">Todays Weight</label>
                <div class="flex">
                    <div class="relative w-full">
                        <input type="text"
                            class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            placeholder="Weight" v-model="currentWeight" required>
                        <button type="button" @click="logWeight"
                            class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                </div>
            </div>

            <div>
                <label class="label text-white">Workout</label>
                <div class="flex">
                    <div class="relative w-full">
                        <div class="inline-flex rounded-md shadow-sm" role="group">
                            <button type="button" :class="{ active: workoutChosen.half }" @click="chooseWorkout('half')"
                                class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                Half
                            </button>
                            <button type="button" :class="{ active: workoutChosen.full }" @click="chooseWorkout('full')"
                                class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                Full
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="content flex flex-col ">
        <p v-if="logged">Successfully logged</p>
    </div>
</template>

<script setup>
import { usePersonalStore } from '@/stores/personalInfoStore';
import { useFoodLogStore } from '@/stores/foodLogStore';
const personalStore = usePersonalStore()
const foodStore = useFoodLogStore()
const userStore = useSupabaseUser()
const workoutChosen = ref({ 'half': false, 'full': false })

const currentWeight = ref(personalStore.todaysWeight)
const dailyWorkout = ref(0)
const date = new Date();
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const localDate = date.toLocaleDateString('en-US', { timeZone: userTimezone });
const remainingCal = Math.abs(personalStore.calorieGoal - foodStore.todaysCals)
// const workout = personalStore.weightLog[personalStore.weightLog.length - 1].workout
// const workoutCal = personalStore.personalInfo[0].workout_cal
const logged = ref(false)

const chooseWorkout = (choice) => {
    const currentValue = workoutChosen.value[choice];


    for (let key in workoutChosen.value) {
        workoutChosen.value[key] = key === choice ? !currentValue : false;
    }
    if (choice === 'half' && workoutChosen.value[choice]) {
        personalStore.logWorkout({
            workout: 0.5,
            date: localDate,
            user_id: userStore.value.id,
        })
    } else if (choice === 'full' && workoutChosen.value[choice]) {
        personalStore.logWorkout({
            workout: 1,
            date: localDate,
            user_id: userStore.value.id,
        })

    } else {
        personalStore.logWorkout({
            workout: 0,
            date: localDate,
            user_id: userStore.value.id,
        })

    }
}

const calculateBMR = (info) => {
    if (info.sex === 'Male') {
        return (4.536 * currentWeight.value) + (15.88 * info.height_in) - (5 * info.age) + 5
    } else if (sex.value === 'Female') {
        return (4.536 * currentWeight.value) + (15.88 * info.height_in) - (5 * info.age) - 161
    }
}
const calculateTotalCal = (info) => {

    const bmr = calculateBMR(info)
    console.log(bmr)
    return Math.floor(bmr) * info.activity_level + (info.weekly_change * 500)
}

const logWeight = () => {
    if (currentWeight.value > 0) {
        personalStore.logNewWeight({
            date: localDate,
            weight: currentWeight.value,
            user_id: userStore.value.id,

        })
        personalStore.updateDailyCals({
            calorie_goal: Math.floor(calculateTotalCal(personalStore.personalInfo[0]))
        })

        logged.value = !logged.value

        setTimeout(() => {
            logged.value = !logged.value

        }, 2500);

    } else {
        alert('Please enter a valid weight.');
    }


}
</script>

<style scoped>
.card {
    background: #e0e9f1;
}

.active {
    background: #9F46E4;

}
</style>