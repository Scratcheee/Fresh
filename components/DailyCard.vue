<template>
    <div class="card">
        <header class="card-header">
            <div class="card-header-title justify-around flex">

                <div class="flex justify-around flex-col items-stretch">
                <div class="flex justify-around gap-6  items-center ">
                    <div class="field">
                        <label class="label">Todays Weight</label>
                        <div class="control flex gap-1">
                            <input class="input " type="text" placeholder="Text input" v-model="currentWeight">
                            <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
  </svg></button>


                        </div>
                    </div>
                    <div class="fieldflex  flex-col">
                        <label class="label">Exercise</label>


                        <div class="inline-flex rounded-md shadow-sm" role="group">
                            <button type="button"
                                class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                Half
                            </button>

                            <button type="button"
                                class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                Full
                            </button>
                        </div>




                    </div>
                </div>
            </div>



            </div>

        </header>
        <div class="card-content flex flex-col pt-1">
            <div class="flex justify-around ">
                <p class="bg-red-500 py-1 px-5">Worked Out</p>
                <p class="bg-emerald-500 py-2 px-5">Ate Below</p>
            </div>
            <p>0.75lbs lost yesterday</p>
                <p>10lbs lost overall</p>


            <div class="content flex flex-col ">
                <p v-if="logged">Successfully logged</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'
</script>

<style scoped>
.card {
    background: #e0e9f1;
}

.button {
    background: #9F46E4;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    color: #FFFFFF;
    height: 55px;
}

.accent-button {
    background-color: #4b82a4;
}

.selection-button {
    background-color: #aa85e5;
}

.button-submit {
    height: 50px;
    width: 50px;
}</style>