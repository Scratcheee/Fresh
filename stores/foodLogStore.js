import { defineStore } from "pinia";

export const useFoodLogStore = defineStore("foodLog", {
  state: () => ({
    foodLog: [],
    meals: this.todaysMeals
  }),
  getters: {
    // todaysMeals() {
    //   const date = new Date();

    //   const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    //   const localDate = date.toLocaleDateString("en-US", {
    //     timeZone: userTimezone,
    //   });


    //   const parts1 = localDate.split("/");
    //   const formattedLocalDate = `${parts1[2]}-${parts1[0].padStart(
    //     2,
    //     "0"
    //   )}-${parts1[1].padStart(2, "0")}`;

    //   const filteredLog = this.foodLog.filter(
    //     (entry) => entry.date.toString() === formattedLocalDate
    //   );


    //   return filteredLog;
    // },
    todaysCals() {
      return this.foodLog.reduce((total, item) => {

        return total + item.calories;
      }, 0);
    },
  },

  actions: {
    async getLog() {
      const supabase = useSupabaseClient();
      const date = new Date();
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const localDate = date.toLocaleDateString("en-US", {
        timeZone: userTimezone,
      });


      const parts1 = localDate.split("/");
      const formattedLocalDate = `${parts1[2]}-${parts1[0].padStart(
        2,
        "0"
      )}-${parts1[1].padStart(2, "0")}`;

      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("foodlog").select("*").eq('date', formattedLocalDate);

        this.foodLog = data;
      });

    },

    async addEntry(entry) {
      this.foodLog.push(entry);
      
      const supabase = useSupabaseClient();

      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("foodlog").insert(entry);
      });

      this.todaysMeals
    },
  },
});
