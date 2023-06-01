<template>
    <div class="flex justify-center items-center">
        <form class="row flex-center flex place-items-center mt-10" @submit.prevent="handleRenewEmail">
            <div class="col-6 form-widget">
                <h1 class="header text-xl mb-2">Update Password</h1>
                <p class="description text-lg mb-2">Email:</p>
                <div>
                    <input class="inputField mb-2" type="email" placeholder="Your email" v-model="email" />
                </div>

                <div>
                    <input type="submit" class="button block bg-blue-300" :value="loading ? 'Loading' : 'Renew Password'"
                        :disabled="loading" />
                </div>
            </div>
        </form>

    </div>
</template>
  
<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')
const password = ref('')

const handleRenewEmail = async () => {

    console.log(email.value)

    let { data, error } = await supabase.auth.resetPasswordForEmail(email.value)
    console.log(data)
    console.log(error)


}


</script>
  
<style  scoped></style>