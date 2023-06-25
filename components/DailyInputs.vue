<template>
    <div class="card">
        <!-- <header class="card-header">
            <p class="card-header-title justify-center" v-if="workout >= 0">
                {{ remainingCal + (workout * workoutCal ) }} {{ (remainingCal + (workout * workoutCal ) >= 0) ? "Calories Remaining Today" : "Calories Over Today" }}
                
            </p>

        </header> -->
        <div class="card-content flex flex-col">

            <div class="flex justify-around flex-col">
                <div class="flex justify-around gap-6">
                    <div class="field">
                    <label class="label">Todays Weight</label>
                    <div class="control flex gap-1">
                        <input class="input " type="text" placeholder="Text input" v-model="currentWeight">
                        
                    </div>
                </div>
                <div class="field">
                    <label class="label">Exercise</label>
                    <div class="flex gap-1">
                        <div class="select ">
                            <select v-model="dailyWorkout">
                                <option :value="{ number: 0 }">No</option>
                                <option :value="{ number: 0.5 }">Half</option>
                                <option :value="{ number: 1 }">Yes</option>

                            </select>

                        </div>
                    </div>

                </div>
                </div>
                <ActionButton @click="logDailyUpdate" text="Log Daily Entry" class="accent-button" />
            </div>
            <div class="content flex flex-col ">
                <!-- <p>1.375 weight loss today</p>
                <p>1.8lbs gained in 12 days (total weight loss)</p> -->
                <p>Successfully logged</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { usePersonalStore } from '@/stores/personalInfoStore';
import { useFoodLogStore } from '@/stores/foodLogStore';

import { useUserStore } from '@/stores/userStore';
const personalStore = usePersonalStore()
const foodStore = useFoodLogStore()

const userStore = useSupabaseUser()


const currentWeight = ref('')
const dailyWorkout = ref(0)
const date = new Date();

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const localDate = date.toLocaleDateString('en-US', { timeZone: userTimezone });
const remainingCal = Math.abs(personalStore.calorieGoal - foodStore.todaysCals)
const workout = personalStore.weightLog[personalStore.weightLog.length - 1].workout
const workoutCal = personalStore.personalInfo[0].workout_cal

console.log(remainingCal)





const calculateBMR = (info) => {
    if (info.sex === 'Male') {
        return (4.536 * personalStore.weightLog[personalStore.weightLog.length - 1].weight) + (15.88 * info.height_in) - (5 * info.age) + 5


    } else if (sex.value === 'Female') {
        return (4.536 * personalStore.weightLog[personalStore.weightLog.length - 1].weight) + (15.88 * info.height_in) - (5 * info.age) - 161

    }
}
const calculateTotalCal = (info) => {
    const bmr = calculateBMR(info)
    return Math.floor(bmr) * info.activity_level + (info.weekly_change * 500)
 

}

const logDailyUpdate = () => {
    personalStore.logDaily({
        date: localDate,
        weight: currentWeight.value,
        user_id: userStore.value.id,
        workout: parseFloat(dailyWorkout.value.number)

    })
    personalStore.updateDailyCals({
        calorie_goal: Math.floor(calculateTotalCal(personalStore.personalInfo[0]))
    })
}


</script>

<style scoped>

.card {
    background: #e0e9f1;
}
.accent-button {
  background-color: #4b82a4;
}

</style>