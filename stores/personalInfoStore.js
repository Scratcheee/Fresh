import { defineStore } from "pinia";

export const usePersonalStore = defineStore("personalInfo", {
  state: () => ({
    calorieGoal: 0,
    weightLog: [],
    personalInfo: [],
  }),
  actions: {
    async getPersonalInfo() {
      const supabase = useSupabaseClient();
      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("userdata").select("*");

        this.personalInfo = data;
        this.calorieGoal = data[0].calorie_goal;
        console.log(this.personalInfo);
      });
    },
    async getWeightLog() {
      const supabase = useSupabaseClient();
      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("dailyinputs").select("*");

        this.weightLog = data;
      });
    },
    async logDaily(entry) {
      const today = new Date();

      
      const supabase = useSupabaseClient();
      console.log(entry.daily_workout);

      // for (const obj of this.weightLog) {
      //   const objDate = new Date(obj.created_at);
      //   if (
      //     objDate.getDate() === today.getDate() &&
      //     objDate.getMonth() === today.getMonth() &&
      //     objDate.getFullYear() === today.getFullYear()
      //   ) {
      //     console.log(
      //       `Object "${
      //         obj.name
      //       }" has a matching date (${objDate.toDateString()})`
      //     );
      //   } 
      // }

      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("dailyinputs").insert(entry);
      });

      // const { data: name } = await useAsyncData("name", async () => {
      //   const { data } = await supabase.from("dailyinputs").update({weight: entry.weight}).eq('user_id', entry.user_id);
      // });
    },
    async updateUserData(entry) {
      const supabase = useSupabaseClient();
      this.calorieGoal = entry.calorie_goal;
      console.log(supabase);

      if (this.personalInfo.length !== 0) {
        //Update entry if one does exist
        const { data: name } = await useAsyncData("name", async () => {
          const { data } = await supabase
            .from("userdata")
            .update(entry)
            .eq("id", this.personalInfo[0].id);
        });
      } else {
        // Create new entry if none exist
        const { data: name } = await useAsyncData("name", async () => {
          const { data } = await supabase.from("userdata").insert(entry);
        });
      }
    },
  },
});
