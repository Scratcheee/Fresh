<template>
    <form @submit.prevent="handleSubmit">
        <div class="flex flex-col justify-center">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="field">
                    <label class="label">Date starting</label>
                    <div class="control">
                        <input v-model="startingDate" class="input" type="date" placeholder="Text input">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Gender</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="gender">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Current Weight</label>
                    <div class="control">
                        <input class="input" type="number" placeholder="Text input" v-model="currentWeight">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Goal Weight</label>
                    <div class="control">
                        <input class="input" type="number" placeholder="Text input" v-model="goalWeight">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Height</label>
                    <div class="flex">
                        <div class="control">
                            <input class="input" type="number" placeholder="Feet" v-model="heightFt">
                        </div>
                        <div class="control">
                            <input class="input" type="number" placeholder="Inches" v-model="heightIn">
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Age</label>
                    <div class="control">
                        <input class="input" type="number" placeholder="Text input" v-model="age">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Weight change per week</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="weeklyChange">
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
                            <select v-model="activity">
                                <option>Sedentary</option>
                                <option>Lightly Active</option>
                                <option>Active</option>
                                <option>Very Active</option>

                            </select>
                        </div>
                    </div>
                </div>

            </div>
            <div class="control flex justify-center">
                <button class="button is-link">Submit</button>
            </div>
        </div>
    </form>
    <div>Reach your goal by:</div>
    <div>Weight loss amount: {{ weightLossAmount }}</div>
</template>

<script setup>
import { usePersonalStore } from '@/stores/personalInfoStore';
import { useUserStore } from '@/stores/userStore';
const userStore = useSupabaseUser()

const personalStore = usePersonalStore()


const startingDate = ref('')
const gender = ref('')
const currentWeight = ref('')
const goalWeight = ref('')
const heightIn = ref('')
const heightFt = ref('')
const weeklyChange = ref('')
const activity = ref('')
const age = ref('')

let weightLossAmount = currentWeight - goalWeight

const calculateBMR = () => {
    if (gender.value === 'Male') {
        return (4.536 * currentWeight.value) + (15.88 * ((heightFt.value * 12) + heightIn.value)) - (5 * age.value) + 5
    } else if (gender.value === 'Female') {
        return (4.536 * currentWeight.value) + (15.88 * ((heightFt.value * 12) + heightIn.value)) - (5 * age.value) - 161

    }
}
const calculateTotalCal = () => {
    const bmr = calculateBMR()
    return Math.floor(bmr) + (weeklyChange.value * 500)

}
const handleSubmit = () => {

    const totalCal = calculateTotalCal()


    personalStore.updateUserData({
        starting_date: startingDate.value,
        gender: gender.value,
        goal_weight: goalWeight.value,
        height_in: (heightFt.value * 12) + heightIn.value,
        age: age.value,
        weekly_change: weeklyChange.value,
        activity_level: activity.value,
        user_id: userStore.value.id,
        calorie_goal: totalCal
    })

}

</script>

<style scoped></style>