import { defineStore } from "pinia";

export const useFoodLogStore = defineStore("foodLog", {
  state: () => ({
    foodLog: [],
    meals: this.todaysMeals,
    todaysEatenCals: 0
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
      const offset = date.getTimezoneOffset()
      console.log(offset)
      const userDate = new Date(date.getTime() - (offset*60*1000))
      console.log(userDate)
      const formattedLocalDate = userDate.toISOString().split('T')[0]
      console.log(formattedLocalDate)
      // setTimeout(() => {
      //   console.log("Delayed for 1 second.");
      // }, 5000);

      
      


      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("foodlog").select("*").eq('date', formattedLocalDate);


        this.foodLog = data;
      });
      console.log('foodlog')
      console.log(this.foodLog)


    },

    async addEntry(entry) {
      this.foodLog.push(entry);
      this.todaysEatenCals = this.todaysEatenCals + entry.calories
      console.log(this.todaysEatenCals)
      
      const supabase = useSupabaseClient();

      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("foodlog").insert(entry);
      });

      this.todaysMeals
    },
  },
});
