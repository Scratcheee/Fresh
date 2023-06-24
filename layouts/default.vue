<template>
    <Navbar />
    <div>
    

        <div>
            <slot />
        </div>
    </div>
    <div class="fixed bottom-0 right-0 m-4 p-4 text-xs text-slate-300 ">
    version 0.0.5

    </div>
</template>

<script setup>
import { useFoodLogStore } from '@/stores/foodLogStore';
import { usePersonalStore } from '@/stores/personalInfoStore';
// import { useUserStore } from '@/stores/userStore';
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