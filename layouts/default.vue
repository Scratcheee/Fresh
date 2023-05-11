<template>
    <Navbar />
    <div>
    

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