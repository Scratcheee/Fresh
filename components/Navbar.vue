<template>
    <Disclosure as="nav" class="nav" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center ">
            <!-- Mobile menu button-->
            <DisclosureButton class="inline-flex items-center justify-center rounded-md p-2 text-white bg-purple-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>


        </div>
      </div>
  
      <DisclosurePanel >
        <div class="space-y-1 px-2 pb-3 pt-2">
          <NuxtLink v-for="item in navigation" :key="item.name"  :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</NuxtLink>
          <button v-if="user" class="button is-primary" @click="logout">Log Out</button>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </template>
  
  <script setup>
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

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
  
  const navigation = [
  
  
    { name: 'Home', href: '/home', current: true },
    { name: 'Settings', href: '/setup', current: false },
    // { name: 'History', href: '#', current: false },
    // { name: 'Dashboard', href: '#', current: false },
  ]
  </script>

  <style scoped>
  .button {
    background: #9F46E4;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    color: #FFFFFF;
    height: 50px;
    border-color: gray;
}

</style>