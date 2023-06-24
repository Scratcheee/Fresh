<template>
    <div class="max-w-lg mx-4 mt-8">
        Renew Password
        <form @submit.prevent="handleRenewEmail" class="flex flex-col gap-2">
            <input type="email" placeholder="Email" v-model="email" class="p-2 bg-gray-600 rounded text-white" />

            <ActionButton type="submit"  text="Renew" />



        </form>

    </div>
</template>
  
<script setup>
const supabase = useSupabaseClient()


const email = ref('')

const handleRenewEmail = async () => {

    console.log(email.value)

    let { data, error } = await supabase.auth.resetPasswordForEmail(email.value)
    if(data) {
        alert("check your email to reset your password")
    } else if( error) {
        alert(error)
    }


}


</script>
  
<style  scoped></style>