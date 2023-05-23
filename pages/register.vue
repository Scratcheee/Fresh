<template>
  <div class="flex justify-center items-center">
    <form class="row flex-center flex place-items-center mt-10" @submit.prevent="signup">
      <div class="col-6 form-widget">
        <h1 class="header text-xl mb-2">Sign Up</h1>
        <p class="description text-lg mb-2">Email:</p>
        <div>
          <input class="inputField mb-2" type="email" placeholder="Your email" v-model="email" />
        </div>
        <p class="description text-lg mb-2">Password</p>
        <div>
          <input class="inputField mb-2" type="password" placeholder="Your password" v-model="password" />
        </div>
        <div>
          <input type="submit" class="button block bg-blue-300" :value="loading ? 'Loading' : 'Sign up'"
            :disabled="loading" />
        </div>
      </div>
    </form>

  </div>
  <div class="flex justify-center items-center m-10">
    <NuxtLink to="auth">Sign In!</NuxtLink>
  </div>
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

    alert("Check your email to verify your account!")

}




</script>