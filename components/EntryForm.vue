<template>

  
  <form @submit.prevent="handleSubmit" ref="entry" class="">
    <div class=" flex flex-col m-3">
      <div class="field flex justify-around sm:flex-col ">
        <label class="label flex items-center">Food/Drink</label>
        <div class="control  flex justify-around sm:justify-normal ">
          <input class="input flex-auto ml-2 sm:w-full" type="text" placeholder="Food / Drink Name" v-model="name"
            required>
        </div>
      </div>
      <div class="field flex sm:flex-col justify-between content-center">
        <label class="label flex  items-center">Calories</label>
        <div class="control flex justify-around sm:justify-normal ">
          <input class="input flex-auto ml-2  sm:w-full" type="number" placeholder="Calories" v-model.number='calories'
            required>
        </div>
      </div>
      <div class="field flex sm:flex-col justify-between ">
        <label class="label flex items-center">Type</label>
        <div class="control ">
          <div class="btn-group flex justify-around">
            <ActionButton type="button" text="Meal" class="flex-auto mx-1 btn  "
              :class="{ active: mealChosen.meal }" @click="chooseMeal('meal')" />
            <ActionButton type="button" text="Snack" class="flex-auto mx-1 btn"
              :class="{ active: mealChosen.snack }" @click="chooseMeal('snack')" />
            <ActionButton type="button" text="Drink" class="flex-auto mx-1 btn"
              :class="{ active: mealChosen.drink }" @click="chooseMeal('drink')" />
          </div>
        </div>
      </div>
      <div class="field flex sm:flex-col ">
        <label class="label flex items-center  mr-1">Hunger</label>
        <div class="control flex-1">
          <div class="btn-group flex ">
            <ActionButton type="button" text="0" class="flex-auto  m-1 btn"
              :class="{ active: hungerChosen['0'] }" @click="chooseHunger('0')" />
            <ActionButton type="button" text="1" class="flex-auto  m-1 btn"
              :class="{ active: hungerChosen['1'] }" @click="chooseHunger('1')" />
            <ActionButton type="button" text="2" class="flex-auto  m-1 btn"
              :class="{ active: hungerChosen['2'] }" @click="chooseHunger('2')" />
            <ActionButton type="button" text="3" class="flex-auto  m-1 btn"
              :class="{ active: hungerChosen['3'] }" @click="chooseHunger('3')" />
          </div>
        </div>
      </div>
      <ActionButton text="Add" type="submit" class="accent-button" />
    </div>
  </form>
</template>

<script setup>

import { useFoodLogStore } from '@/stores/foodLogStore';
import { usePersonalStore } from '~/stores/personalInfoStore';


const foodStore = useFoodLogStore()
const userStore = useSupabaseUser()

const personalStore = usePersonalStore()

const name = ref('')
const calories = ref()
const type = ref()
const hunger = ref()
const mealChosen = ref({ 'meal': false, 'snack': false, 'drink': false })
const hungerChosen = ref({ '0': false, '1': false, '2': false, '3': false })




const date = new Date();

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const localDate = date.toLocaleDateString('en-US', { timeZone: userTimezone });
// const localDate = date.toISOString();

const localTime = date.toLocaleTimeString('en-US', { timeZone: userTimezone });

console.log(userTimezone)

console.log(localDate)
console.log(localTime)




const chooseMeal = (choice) => {
  type.value = choice

  for (let key in mealChosen.value) {
    mealChosen.value[key] = key === choice;
  }
  console.log(mealChosen.value)
}

const chooseHunger = (choice) => {
  hunger.value = choice

  for (let key in hungerChosen.value) {
    hungerChosen.value[key] = key === choice;
  }
}

const handleSubmit = (e) => {
  if (type.value && hunger.value >= 0) {
    foodStore.addEntry({
      name: name.value,
      calories: calories.value,
      type: type.value,
      hunger: hunger.value,
      date: localDate,
      time: localTime,
      user_id: userStore.value.id
    })
    personalStore.logCalories({calories: calories.value})

    type.value = ""
    hunger.value = ""
    name.value = ""
    calories.value = ""
    for (let key in mealChosen.value) {
      mealChosen.value[key] = key === false;
    }
    for (let key in hungerChosen.value) {
      hungerChosen.value[key] = key === false;
    }
  } else {
    alert('Enter all fields')
  }
    console.log('pressed')
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

  color: white;
  cursor: pointer;
  float: left;
}

.btn-group button:not(:last-child) {
  border-right: none;
}

.btn-group:after {
  content: "";
  clear: both;
  display: table;
}



.input {
  background-color: #fff;
}

.accent-button {
  background-color: #4b82a4;
}

.active {
  background: #aa85e5;
}</style>