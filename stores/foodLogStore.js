import { defineStore } from "pinia";

export const useFoodLogStore = defineStore("foodLog", {
  state: () => ({
    foodLog: [],
    meals: this.todaysMeals,
    todaysEatenCals: 0
  }),
  actions: {
    async getLog() {
      const supabase = useSupabaseClient();
      const date = new Date();
      const offset = date.getTimezoneOffset()
      const userDate = new Date(date.getTime() - (offset*60*1000))
      const formattedLocalDate = userDate.toISOString().split('T')[0]

      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("foodlog").select("*").eq('date', formattedLocalDate);
        this.foodLog = data;
      });
    },

    async addEntry(entry) {
      this.foodLog.push(entry);
      this.todaysEatenCals = this.todaysEatenCals + entry.calories
      
      const supabase = useSupabaseClient();

      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("foodlog").insert(entry);
      });

      this.todaysMeals
    },
  },
});
