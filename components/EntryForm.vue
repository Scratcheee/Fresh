<template>
  <form @submit.prevent="handleSubmit" ref="entry" class="">
    <div class="mx-5 flex flex-col m-3">
      <div class="field">
        <label class="label">Food/Drink</label>
        <div class="control">
          <input class="input" type="text" placeholder="Food / Drink Name" v-model="name" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Calories</label>
        <div class="control ">
          <input class="input" type="number" placeholder="Calories" v-model.number='calories' required>

        </div>
      </div>


        <div class="field ">
          <label class="label">Type</label>
          <div class="control ">
            <div class="select w-full">
              <select v-model="type" required class="w-full">
                <option>Meal</option>
                <option>Snack</option>
                <option>Hydration</option>

              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Hunger</label>
          <div class="control">
            <div class="select w-full">
              <select v-model.number="hunger" required class="w-full">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>


              </select>
            </div>
          </div>
        </div>





          <ActionButton text="Add" />

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
  
  type.value = ""
  hunger.value = ""
  name.value = ""
  calories.value = ""
}

  
</script>

<style scoped>

label {
  color: #805CB9
}
input, select {
  background: #F2EBFF;
  border-radius: 10px;
  color: #805cb9
}
form {
  background: #FFFFFF;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
border-radius: 10px;
padding: 12px;
margin: 20px 0px 20px 0px;
}
</style>