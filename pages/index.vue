<template>
    <Auth />
  </template>
  
  <script setup>
  const supabase = useSupabaseClient()
  definePageMeta({
    middleware: ['auth']
})
  
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