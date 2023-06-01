<template>
  <div class="flex justify-center items-center">
    <form class="row flex-center flex place-items-center mt-10" @submit.prevent="handleLogin">
      <div class="col-6 form-widget">
        <h1 class="header text-xl mb-2">Login</h1>
        <p class="description text-lg mb-2">Email:</p>
        <div>
          <input class="inputField mb-2" type="email" placeholder="Your email" v-model="email" />
        </div>
        <p class="description text-lg mb-2">Password</p>
        <div>
          <input class="inputField mb-2" type="password" placeholder="Your password" v-model="password" />
        </div>
        <div>
          <input type="submit" class="button block bg-blue-300" :value="loading ? 'Loading' : 'Login'"
            :disabled="loading" />
        </div>
      </div>
    </form>

  </div>
  <div class="flex justify-center items-center m-10">
    <NuxtLink to="register">Sign Up!</NuxtLink>
  </div>
  <div class="flex justify-center items-center">
    <NuxtLink to="renew">Forgot Password!</NuxtLink>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
    
    if (error) throw error
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
    alert('You have signed in!')
  }
}
</script>

<style  scoped></style>