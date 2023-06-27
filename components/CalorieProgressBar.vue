<template>
    <div class="flex items-center flex-col  ">
        <span class="text-white text-3xl">{{calCount + workout}}</span>

        <span class="text-white">remaining</span>
        <!-- <div class="flex flex-col w-full">
            <div class="flex justify-around">
            <p class="text-white">0.25LBS Gained Yesterday</p>
        </div>
        <div class="flex justify-around ">
            <p class="bg-red-500 text-white">Worked Out</p>
        <p class="bg-green-500 text-white">Ate Below Calories</p>
        </div>
        </div> -->
        <!-- <div class="flex">
        <div class="flex flex-col m-3">
            <span class="text-white mx-3">0.75 lbs lost yesterday</span>
            <span class="text-white mx-3">10lbs lost yesterday</span>

        </div>
        <div class="flex flex-col m-3">
            <span class="text-white bg-green-500 mb-1">Worked out</span>

            <span class="text-white bg-green-500 ">Ate below calories</span>
        </div>
    </div>
  -->


    </div>
</template>

<script setup>
defineProps({
    calCount: Number,
    workout: Number
})
let percentage = 30

</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;

}


@media screen and (min-width: 600px) {
    .circular-progress::before {
        height: 17.5vh;
        width: 17.5vh;
    }

    .circular-progress {
        position: relative;
        height: 18vh;
        width: 18vh;
    }


}

.container__progressbars {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    min-width: 270px;
    width: 100%;
    min-height: 100%;
}

.progressbar {
    position: relative;
    width: 170px;
    height: 170px;
    margin: 1em;
    transform: rotate(-90deg);
}

.progressbar__svg-circle {
    width: 100%;
    height: 100%;
    fill: none;
    stroke-width: 10;
    stroke-dasharray: 440;
    stroke-dashoffset: 440;
    stroke: hsl(0, 0%, 100%);
    stroke-linecap: round;
    transform: translate(5px, 5px);
}


.progressbar__svg {
    position: relative;
    width: 100%;
    height: 100%;
}

.circle-html {

    animation: anim_circle-html 1s ease-in-out forwards;

}

.progressbar__text {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 0.25em 0.5em;
    color: hsl(0, 0%, 100%);
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 0.25em;
    font-size: 34px;
    transform: translate(-50%, -50%) rotate(90deg);
}

@keyframes anim_circle-html {
    to {
        stroke-dashoffset: 50%
    }
}</style>