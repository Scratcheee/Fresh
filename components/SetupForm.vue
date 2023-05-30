<template>
    <div class="flex justify-center items-center mt-3">

        <div class="flex flex-col justify-center">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="field">
                    <label class="label">Date starting</label>
                    <div class="control">
                        <input v-model="startingDate" class="input" type="date" placeholder="Text input" required>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Sex</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="sex" required>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Current Weight</label>
                    <div class="control">
                        <input class="input" type="number" placeholder="Text input" v-model="currentWeight" required>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Goal Weight</label>
                    <div class="control">
                        <input class="input" type="number" placeholder="Text input" v-model="goalWeight" required>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Height</label>
                    <div class="flex">
                        <div class="control">
                            <input class="input" type="number" placeholder="Feet" v-model="heightFt" required>
                        </div>
                        <div class="control">
                            <input class="input" type="number" placeholder="Inches" v-model="heightIn" required>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Age</label>
                    <div class="control">
                        <input class="input" type="number" placeholder="Text input" v-model="age" required>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Weight change per week</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="weeklyChange" required>
                                <option>-1</option>
                                <option>-0.5</option>
                                <option>0</option>
                                <option>0.5</option>
                                <option>1</option>

                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Daily Activity Level</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="activity" required>
                                <option :value=1.2>Sedentary</option>
                                <option :value=1.375>Lightly Active</option>
                                <option :value=1.55>Moderatly Active</option>
                                <option :value=1.725>Very Active</option>

                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Workout Calories</label>
                    <div class="control">
                        <input class="input" type="number" placeholder="Text input" v-model="workout_cal" required>
                    </div>
                </div>

            </div>
            <div class="control flex justify-center mt-10">
                <button class="button" @click="() => {
                    showBmr = true
                    handleSubmit()
                }">Calculate</button>
            </div>
            <div class="control flex justify-center mt-10">
            <button class="button is-link" @click="saveSettings()">Submit</button>
        </div>
            <div v-if="showBmr">
                <div>Base Metabolism Rate: {{ Math.floor(calculateBMR(sex)) }} Calories</div>
                <div>Daily Calories to eat: {{ calculateTotalCal(calculateBMR(sex)) }} Calories</div>
            </div>



        </div>


    </div>
</template>

<script setup>
import { usePersonalStore } from '@/stores/personalInfoStore';
const userStore = useSupabaseUser()

const personalStore = usePersonalStore()


const startingDate = ref('')
const sex = ref('')
const currentWeight = ref('')
const goalWeight = ref('')
const heightIn = ref('')
const heightFt = ref('')
const weeklyChange = ref('')
const activity = ref('')
const age = ref('')
const workout_cal = ref('')
let showBmr = ref(false)




const calculateBMR = (sex) => {
    if (sex === 'Male') {
        return (4.536 * currentWeight.value) + (15.88 * ((heightFt.value * 12) + heightIn.value)) - (5 * age.value) + 5
    } else if (sex === 'Female') {
        return (4.536 * currentWeight.value) + (15.88 * ((heightFt.value * 12) + heightIn.value)) - (5 * age.value) - 161

    }
}
const calculateTotalCal = (bmr) => {

    return Math.floor(bmr) * activity.value + (weeklyChange.value * 500)


}
const handleSubmit = () => {
    const calculatedBmr = Math.floor(calculateBMR(sex.value))
    const totalCal = calculateTotalCal(calculatedBmr)
    return totalCal

}

const saveSettings = () => {
    personalStore.updateUserData({
        starting_date: startingDate.value,
        sex: sex.value,
        goal_weight: parseInt(goalWeight.value),
        height_in: parseInt((heightFt.value * 12) + heightIn.value),
        age: parseInt(age.value),
        weekly_change: parseFloat(weeklyChange.value),
        activity_level: activity.value,
        user_id: userStore.value.id,
        calorie_goal: Math.floor(handleSubmit()),
        workout_cal: workout_cal.value
    })
}

</script>

<style scoped></style>