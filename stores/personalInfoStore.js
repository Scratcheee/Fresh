import { defineStore } from "pinia";

export const usePersonalStore = defineStore("personalInfo", {
  state: () => ({
    calorieGoal: 0,
    weightLog: [],
    personalInfo: [],
    workoutCals: 0,
    todaysWorkout: 0,
    todaysData: [{ weight: 240, workout: 0 }],
  }),
  actions: {
    async getPersonalInfo() {
      const supabase = useSupabaseClient();
      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("userdata").select("*");

        this.personalInfo = data;
        this.calorieGoal = data[0].calorie_goal;
        this.workoutCals = data[0].workout_cal;
      });
    },
    async getWeightLog() {
      const supabase = useSupabaseClient();
      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("dailyinputs").select("*");

        this.weightLog = data;
      });
    },
    async logNewWeight(entry) {
      const today = new Date();
      const supabase = useSupabaseClient();

      const currentDate = new Date().toISOString().substring(0, 10); // get current date in ISO format without the time

      const result = this.weightLog.find((obj) =>
        obj.created_at.startsWith(currentDate)
      );

      if (result) {
        console.log(entry);
        const { data, error } = await supabase
          .from("dailyinputs")
          .update({ weight: entry.weight,})
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
        console.log("updating existing");
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
              workout_cal: entry.workout_cal,
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
    async updateDailyCals(entry) {
      const supabase = useSupabaseClient();

      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase
          .from("userdata")
          .update({
            calorie_goal: entry.calorie_goal,
          })
          .eq("user_id", this.personalInfo[0].user_id);
      });
    },
    async getTodaysData() {
      const supabase = useSupabaseClient();
      const userStore = useSupabaseUser();

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
        const { data, count } = await supabase
          .from("dailyinputs")
          .select("*", { count: "exact" })
          .eq("date", formattedLocalDate);

        if (count) {
          this.todaysData = data;
        } else {
          const { data, error } = await supabase.from("dailyinputs").insert([
            {
              date: localDate,
              weight: 0,
              user_id: userStore.value.id,
              workout: 0,
              calorie_count: 0,
            },
          ]);
          this.todaysData = data;
        }
      });
    },
  },
});
