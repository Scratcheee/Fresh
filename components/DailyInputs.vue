<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title justify-center">
                {{ personalStore.calorieGoal - foodStore.todaysCals }} Calories Remaining Today
            </p>

        </header>
        <div class="card-content flex flex-col">

            <div class="flex justify-around">
                <div class="field">
                    <label class="label">Todays Weight</label>
                    <div class="control flex gap-1">
                        <input class="input w-1/6" type="text" placeholder="Text input" v-model="currentWeight">
                        <button class="button" @click="logDailyUpdate">Log Daily Entry</button>
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
            <div class="content flex flex-col ">
                <p>1.375 weight loss today</p>
                <p>1.8lbs gained in 12 days (total weight loss)</p>
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


const logDailyUpdate = () => {
    // console.log(currentWeight.value)
    personalStore.logDaily({
        // date: localDate,
        weight: currentWeight.value,
        user_id: userStore.value.id,
        workout: parseFloat(dailyWorkout.value.number)

    })
}


</script>

<style scoped></style>