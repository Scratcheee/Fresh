<template>
    <form class="row flex-center flex" @submit.prevent="handleLogin">
      <div class="col-6 form-widget">
        <h1 class="header">Login</h1>
        <p class="description">Email</p>
        <div>
          <input class="inputField" type="email" placeholder="Your email" v-model="email" />
        </div>
        <p class="description">Password</p>
        <div>
          <input class="inputField" type="password" placeholder="Your password" v-model="password" />
        </div>
        <div>
          <input
            type="submit"
            class="button block"
            :value="loading ? 'Loading' : 'Login'"
            :disabled="loading"
          />
        </div>
      </div>
    </form>
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
  }
}
</script>

<style  scoped>

</style>