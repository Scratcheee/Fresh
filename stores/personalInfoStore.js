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
      });
    },
    async getWeightLog() {
      const supabase = useSupabaseClient();
      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("dailyinputs").select("*");

        this.weightLog = data;
      });
      console.log(this.weightLog);
    },
    async logDaily(entry) {
      const today = new Date();

      const supabase = useSupabaseClient();
      console.log(entry.daily_workout);

      const currentDate = new Date().toISOString().substring(0, 10); // get current date in ISO format without the time

      const result = this.weightLog.find((obj) =>
        obj.created_at.startsWith(currentDate)
      );

      if (result) {
        console.log(entry);
        const { data, error } = await supabase
          .from("dailyinputs")
          .update({ weight: entry.weight, workout: entry.workout })
          .eq("id", result.id);
      } else {
        const { data: name } = await useAsyncData("name", async () => {
          const { data } = await supabase.from("dailyinputs").insert(entry);
        });
      }
    },
    async updateUserData(entry) {
      const supabase = useSupabaseClient();
      this.calorieGoal = entry.calorie_goal;

      if (this.personalInfo.length !== 0) {
        //Update entry if one does exist
        const { data: name } = await useAsyncData("name", async () => {
          const { data } = await supabase
            .from("userdata")
            .update({
              starting_date: entry.starting_date,
              goal_weight: entry.goal_weight,
              height_in: entry.height_in,
              age: entry.age,
              weekly_change: entry.weekly_change,
              activity_level: entry.activity_level,
              calorie_goal: entry.calorie_goal,
              sex: entry.sex,
            })
            .eq("user_id", this.personalInfo[0].user_id);
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
