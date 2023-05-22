<template>
  <form @submit.prevent="handleSubmit" ref="entry">
    <div class="mx-5">
      <div class="field">
        <label class="label">Food/Drink</label>
        <div class="control">
          <input class="input" type="text" placeholder="Food / Drink Name" v-model="name" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Calories</label>
        <div class="control ">
          <input class="input is-success" type="number" placeholder="Calories" v-model.number='calories' required>

        </div>
      </div>

      <div class="flex justify-around">
        <div class="field">
          <label class="label">Type</label>
          <div class="control">
            <div class="select">
              <select v-model="type" required>
                <option>Meal</option>
                <option>Snack</option>
                <option>Hydration</option>

              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Hunger Level</label>
          <div class="control">
            <div class="select">
              <select v-model.number="hunger" required>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>


              </select>
            </div>
          </div>
        </div>
      </div>




      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Submit</button>
        </div>

      </div>
    </div>
  </form>
</template>

<script setup>

import { useFoodLogStore } from '@/stores/foodLogStore';
import { useUserStore } from '@/stores/userStore';

const foodStore = useFoodLogStore()
const userStore = useSupabaseUser()

const name = ref('')
const calories = ref()
const type = ref()
const hunger = ref()


const date = new Date();

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const localDate = date.toLocaleDateString('en-US', { timeZone: userTimezone });
const localTime = date.toLocaleTimeString('en-US', { timeZone: userTimezone });


const handleSubmit = (e) => {
  // const timestamp = new Date()
        
  foodStore.addEntry({
    name: name.value,
    calories: calories.value,
    type: type.value,
    hunger: hunger.value,
    date: localDate,
    time: localTime,
    user_id: userStore.value.id
  })
  e.target.reset()
  alert('entry logged')
}

  
</script>

<style scoped></style>