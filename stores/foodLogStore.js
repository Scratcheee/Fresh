import { defineStore } from "pinia";

export const useFoodLogStore = defineStore("foodLog", {
  state: () => ({
    foodLog: [],
    meals: [],
    todaysEatenCals: 0,
    currentDate: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .slice(0, 10),
    userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }),
  actions: {
    async getLog() {
      const supabase = useSupabaseClient();
      let date = new Date(); // Or the date you'd like converted.
      let isoDateTime = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      ).toISOString().slice(0, 10);
      

      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("foodlog").select("*");
        this.foodLog = data;
        this.meals = data.filter((item) => item.date === isoDateTime);
        //this.meals = data.filter((item) => item.created_at.toLocaleDateString('en-US', { timeZone: this.userTimezone }) === date.toLocaleDateString('en-US', { timeZone: this.userTimezone }));
        
      });

      // const localDate = date.toLocaleDateString('en-US', { timeZone: this.userTimezone });
      // console.log(`this is the local date: ${localDate}`);

    },

    async addEntry(entry) {
      this.foodLog.push(entry);
      this.meals.push(entry);
      this.todaysEatenCals = this.todaysEatenCals + entry.calories;

      const supabase = useSupabaseClient();

      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("foodlog").insert(entry);
      });
    },
  },
});
