import { defineStore } from "pinia";

export const usePersonalStore = defineStore("personalInfo", {
  state: () => ({
    calorieGoal: 0,
    todaysCalories: 0,
    weightLog: [],
    personalInfo: [],
    workoutCals: 0,
    todaysWorkout: 0,
    todaysWeight: 0,
    startingWeight: 0,
    dailyInputs: [],
    currentDate: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .slice(0, 10),
  }),
  actions: {
    async getPersonalInfo() {
      const supabase = useSupabaseClient();
      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("userdata").select("*");

        this.personalInfo = data;
        this.calorieGoal = data[0].calorie_goal;
        this.workoutCals = data[0].workout_cal;
        this.startingWeight = data[0].starting_weight
      });
      console.log(this.startingWeight)
    },
    async getWeightLog() {
      const supabase = useSupabaseClient();
      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("dailyinputs").select("*");
        this.todaysEatenCals = data.calorie_count;
        this.weightLog = data;
      });
    },
    async logNewWeight(entry) {
      const supabase = useSupabaseClient();
      const result = this.weightLog.find((obj) =>
        obj.created_at.startsWith(this.currentDate)
      );

      if (result) {
        const { data, error } = await supabase
          .from("dailyinputs")
          .update({ weight: entry.weight })
          .eq("id", result.id);
      } else {
        const { data: name } = await useAsyncData("name", async () => {
          const { data } = await supabase.from("dailyinputs").insert(entry);
        });
      }
    },
    async logWorkout(entry) {
      const supabase = useSupabaseClient();
      const result = this.weightLog.find(
        (obj) => obj.date === this.currentDate
      );

      if (result) {
        console.log(entry);
        const { data, error } = await supabase
          .from("dailyinputs")
          .update({ workout: entry.workout })
          .eq("id", result.id);
      } else {
        const { data: name } = await useAsyncData("name", async () => {
          const { data } = await supabase.from("dailyinputs").insert(entry);
        });
      }
    },
    async logCalories(entry) {
      const supabase = useSupabaseClient();
      console.log(this.weightLog);
      const result = this.weightLog.find(
        (obj) => obj.date === this.currentDate
      );

      this.todaysCalories = this.todaysCalories + entry.calories;

      if (result) {
        console.log(entry);
        const { data, error } = await supabase
          .from("dailyinputs")
          .update({ calorie_count: this.todaysCalories })
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
              starting_weight: entry.starting_weight,
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

      const { data: name } = await useAsyncData("name", async () => {
        const { data, count } = await supabase.from("dailyinputs").select("*");

        this.dailyInputs = data;

        if (
          this.dailyInputs[this.dailyInputs.length - 1].date ===
          this.currentDate
        ) {
          console.log("todays entry existing");
          this.todaysCalories =
            this.dailyInputs[this.dailyInputs.length - 1].calorie_count;
          this.todaysWorkout =
            this.dailyInputs[this.dailyInputs.length - 1].workout;
          this.todaysWeight =
            this.dailyInputs[this.dailyInputs.length - 1].weight;
        } else {
          console.log("creating todays entry");

          const { data, error } = await supabase.from("dailyinputs").insert({
            date: this.currentDate,
            weight: 0,
            user_id: userStore.value.id,
            workout: 0,
            calorie_count: 0,
          });
        }
      });
    },
  },
});
