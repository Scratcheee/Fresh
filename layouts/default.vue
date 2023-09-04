<template>
    <!-- <Navbar /> -->
    <div>
        <div>
            <slot />
        </div>
    </div>
    <div class="fixed bottom-0 right-0 m-4 p-4 text-xs text-slate-300 ">
        version 0.0.7

    </div>
    <BottomNav />
</template>

<script setup>
import { useFoodLogStore } from '@/stores/foodLogStore';
import { usePersonalStore } from '@/stores/personalInfoStore';
const supabase = useSupabaseClient()
const user = useSupabaseUser()
let loaded = false


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
const personalStore = usePersonalStore()
personalStore.getPersonalInfo()
personalStore.getTodaysData()
foodStore.getLog()
personalStore.getWeightLog()




</script>

<style lang="scss" scoped></style>