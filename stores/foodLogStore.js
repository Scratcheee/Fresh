import { defineStore } from "pinia";

export const useFoodLogStore = defineStore("foodLog", {
  state: () => ({
    foodLog: [],
    meals: [],
    todaysEatenCals: 0,
    currentDate: new Date(new Date().getTime() - (new Date().getTimezoneOffset()*60*1000)).toISOString().slice(0, 10),
  }),
  actions: {
    async getLog() {
      const supabase = useSupabaseClient();

      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("foodlog").select("*")
        this.foodLog = data;
        this.meals = data.filter((item) => item.date === this.currentDate);
      });
      

    },

    async addEntry(entry) {
      this.foodLog.push(entry);
      this.meals.push(entry)
      this.todaysEatenCals = this.todaysEatenCals + entry.calories
      
      const supabase = useSupabaseClient();

      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("foodlog").insert(entry);
      });


    },
  },
});
