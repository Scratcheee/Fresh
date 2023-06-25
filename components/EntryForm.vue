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
          <input class="input" type="number" placeholder="Calories" v-model.number='calories' required> 201 calories per cup

        </div>
      </div>


      <div class="field ">
        <label class="label">Type</label>
        <div class="control ">
          <!-- <div class="select w-full">
              <select v-model="type" required class="w-full">
                <option>Meal</option>
                <option>Snack</option>
                <option>Hydration</option>

              </select>
            </div> -->
          <div class="btn-group flex justify-around">

            <ActionButton type="button" text="Meal" class="w-20 md:w-1/4 btn " @click="type = 'meal'" />
            <ActionButton type="button" text="Snack" class="w-20 md:w-1/4 btn" @click="type = 'snack'" />
            <ActionButton type="button" text="Hydration" class="w-20 md:w-1/4 btn" @click="type = 'hydration'" />
            



          </div>
          {{ type }}


        </div>
      </div>

      <div class="field">
        <label class="label">Hunger</label>
        <div class="control">
          <!-- <div class="select w-full">
            <select v-model.number="hunger" required class="w-full">
              <option disabled>Select an option</option>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>


            </select>
          </div> -->
          <div class="btn-group flex justify-around">

            <ActionButton type="button" text="0" class="w-1/5 btn" @click="hunger = 0" />
            <ActionButton type="button" text="1" class="w-1/5 btn" @click="hunger = 1" />
            <ActionButton type="button" text="2" class="w-1/5 btn" @click="hunger = 2" />
            <ActionButton type="button" text="3" class="w-1/5 btn" @click="hunger = 3" />
            
            



          </div>
          {{ hunger }}
        </div>
      </div>





      <ActionButton text="Add" type="submit" class="accent-button" />

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

<style scoped sass>
label {
  color: #805CB9
}

input,
select {
  background: #F2EBFF;
  border-radius: 10px;
  color: #805cb9
}

form {
  background: #e0e9f1;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 12px;
  margin: 20px 0px 20px 0px;
}

.btn-group button {

  color: white;cursor: pointer;
  float: left;



}

.btn-group button:not(:last-child) {
  border-right: none;
  /* Prevent double borders */
}

/* Clear floats (clearfix hack) */
.btn-group:after {
  content: "";
  clear: both;
  display: table;
}

/* Add a background color on hover */
.btn-group button:hover {
  background-color: #aa85e5;
}
.input {
  background-color: #fff;
}

.accent-button {
  background-color: #4b82a4;
}

</style>