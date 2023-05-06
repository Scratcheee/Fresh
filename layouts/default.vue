<template>
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <NuxtLink class="navbar-item" to="/">
                    Calorie Counter
                </NuxtLink>

            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <NuxtLink class="navbar-item" to="/">
                        Home
                    </NuxtLink>

                    <NuxtLink class="navbar-item" to="/setup">
                        Setup
                    </NuxtLink>


                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <button v-if="user" class="button is-primary" @click="logout">Log Out</button>
                            <NuxtLink v-else to="auth" class="button is-primary">
                                <strong>Sign up / Log In</strong>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <div>
            <slot />
        </div>
    </div>
</template>

<script setup>
import { useFoodLogStore } from '@/stores/foodLogStore';
import { usePersonalStore } from '@/stores/personalInfoStore';
// import { useUserStore } from '@/stores/userStore';
import LoginPage from '~~/pages/auth.vue';
const supabase = useSupabaseClient()
const user = useSupabaseUser()
// const userStore = useUserStore()
const router = useRouter();

const appReady = ref(null)

//Logout function
const logout = async () => {
    try {
        let { error } = await supabase.auth.signOut()
        console.log("logging out")
        if (error) throw error
        user.value = null
    } catch (error) {
        alert(error.message)
    }
}
const foodStore = useFoodLogStore()
foodStore.getLog()
const personalStore = usePersonalStore()
personalStore.getPersonalInfo()
personalStore.getWeightLog()



</script>

<style lang="scss" scoped></style>