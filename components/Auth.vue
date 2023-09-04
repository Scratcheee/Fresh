<template>
    <div class="max-w-lg mx-auto mt-8">

        

        <form @submit.prevent="() => (isSignUp ? signUp() : login())" class="flex flex-col gap-2">
        <span class="text-white" v-if="!isSignUp">Log In</span>
        <span class="text-white" v-else>Sign Up</span>

            <input required type="email" placeholder="Email" v-model="email" class="p-2 bg-gray-600 rounded text-white" />
            <input required type="password" placeholder="Password" v-model="password" class="p-2 bg-gray-600 rounded text-white" />

            <ActionButton type="submit" v-if="isSignUp" text="Sign Up" />
            <ActionButton type="submit" v-else text="Log in" />



        </form>

        <button @click="isSignUp = !isSignUp" class="w-full mt-8 text-sm text-center underline text-slate-600">
            <span v-if="isSignUp" class="text-white"> Have an account? Log in instead </span>
            <div v-else class="flex flex-col">
                <span class="text-white"> Create a new account </span>
                <NuxtLink to="/renew" class="text-white">Forgot Password?</NuxtLink>
            </div>

        </button>
    </div>
</template>

<script setup>
const email = ref('')
const password = ref('')
const isSignUp = ref(false)
const client = useSupabaseClient()

const signUp = async () => {
    console.log('signup')
    const { user, error } = await client.auth.signUp({
        email: email.value,
        password: password.value
    })
    
    if(error) {
        alert(error)
    } else {
        alert('check email for verification!')
    }
    console.log('user', user)
    console.log('error', error)


}

const login = async () => {
    const { user, error } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })


}

const user = useSupabaseUser()
onMounted(() => {
    watchEffect(() => {
        if (user.value) {
            navigateTo('/home')
        }
    })
})

</script>

<style scoped></style>