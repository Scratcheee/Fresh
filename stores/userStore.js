import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null,
      }),
      actions: {
        setUser(payload) {
            this.user = payload ? payload.user : null
            console.log(this.user)
        }
      }
})