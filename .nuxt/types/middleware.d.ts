import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth"
declare module "D:/Web Dev Work/Nuxt 3 Projects/calorie-counter/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}