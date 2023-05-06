<template>
    <form @submit.prevent="signup">
        <div>
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email" required>
        </div>
        <div>
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password" required>
        </div>
        <div>
            <button type="submit">Sign up</button>
        </div>
    </form>
</template>

<script setup>

const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')

const signup = async () => {


    let { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
    })

}




</script>