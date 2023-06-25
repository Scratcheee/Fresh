<template>
    <div class="max-w-lg mx-4 mt-8">
        Set a new password
        <form @submit.prevent="handleResetPassword" class="flex flex-col gap-2">
            <input type="password" placeholder="Password" v-model="password" class="p-2 bg-gray-600 rounded text-white" />

            <ActionButton type="submit" text="Reset" />



        </form>

    </div>
</template>
  
<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')
const password = ref('')

const handleResetPassword = async () => {

    const { data, error } = await supabase.auth.updateUser({

        password: password.value,
    })
    if(data) {
        alert("You have successfully reset your password")
    } else if( error) {
        alert(error)
    }

}


</script>
  
<style  scoped></style>