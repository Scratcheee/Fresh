import { defineStore } from "pinia";

export const usePersonalStore = defineStore("personalInfo", {
  state: () => ({
    calorieGoal: 0,
    personalInfo: [],
    workoutCals: 0,
    startingWeight: 0,
    dailyInputs: [],
    todaysEntry: [],
  }),
  actions: {
    async getPersonalInfo() {
      const supabase = useSupabaseClient();
      const { data: name } = await useAsyncData("name", async () => {
        const { data } = await supabase.from("userdata").select("*");

        this.personalInfo = data;
        this.calorieGoal = data[0].calorie_goal;
        this.workoutCals = data[0].workout_cal;
        this.startingWeight = data[0].starting_weight;
      });
    },
    async getDailyInputs() {
      const supabase = useSupabaseClient();
      const userStore = useSupabaseUser();
      let date = new Date(); // Or the date you'd like converted.
      let isoDateTime = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 10);

      const { data: name } = await useAsyncData("name", async () => {
        const { data, count } = await supabase.from("dailyinputs").select("*");

        this.dailyInputs = data;

        if (this.dailyInputs.find((element) => element.date === isoDateTime)) {
          console.log("todays entry existing");
          this.todaysEntry = this.dailyInputs[this.dailyInputs.length - 1];
          console.log(this.todaysEntry)
        } else {
          console.log("creating todays entry");

          const { data, error } = await supabase
            .from("dailyinputs")
            .insert({
              date: isoDateTime,
              weight: 0,
              user_id: userStore.value.id,
              workout: 0,
              calorie_count: 0,
            })
            .select();
          //save new data from entry
          this.todaysEntry = data;
        }
      });
    },
    async logNewWeight(entry) {
      const supabase = useSupabaseClient();

      const { data, error } = await supabase
        .from("dailyinputs")
        .update({ weight: entry.weight })
        .eq("id", this.todaysEntry.id);
    },
    async logWorkout(entry) {
      const supabase = useSupabaseClient();

      const { data, error } = await supabase
        .from("dailyinputs")
        .update({ workout: entry.workout })
        .eq("id", this.todaysEntry.id);
    },
    async logCalories(entry) {
      const supabase = useSupabaseClient();

      this.todaysEntry.calorie_count =
        this.todaysEntry.calorie_count + entry.calories;

      const { data, error } = await supabase
        .from("dailyinputs")
        .update({ calorie_count: this.todaysEntry.calorie_count })
        .eq("id", this.todaysEntry.id);
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
  },
});
