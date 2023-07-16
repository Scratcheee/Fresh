export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser()
  
    if (!user.value && to.path === '/home' || !user.value && to.path === '/setup') {
      console.log('navigating to login')
      navigateTo('/')
    } else if (user.value && to.path === '/' ) {
      navigateTo('/home')
    }
  })
  