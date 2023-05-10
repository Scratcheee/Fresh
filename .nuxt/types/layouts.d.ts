import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "D:/Web Dev Work/Nuxt 3 Projects/calorie-counter/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}