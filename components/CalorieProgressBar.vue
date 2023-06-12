<template>
    <div class="flex items-center flex-col ">
    <div class="container">
        <div class="circular-progress">
            <span class="progress-value">2353</span>
            <span class="text">calories left today</span>
        </div>
    </div>
    <div>300 Exercise</div>
    <div>1400 calories</div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.container  {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.circular-progress {
    position: relative;
    height: 20vh;
    width: 20vh;
    background: conic-gradient(#fff 3.6deg, #805CB9 0deg);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}
.circular-progress::before {
    content: "";
    position: absolute;
    height: 23.5vh;
    width: 23.5vh;
    background-color: #fff;
    border-radius: 50%;
}
.progress-value {
    position: relative;
    font-size: 40px;
    font-weight: 600;
}
.text {
    position: relative;
}
@media screen and (min-width: 600px) {
  .circular-progress::before {
    height: 19.5vh;
    width: 19.5vh;
  }
}
</style>