import { createApp, h } from 'vue'
import { InertiaProgress } from '@inertiajs/progress'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { importPageComponent } from '@/scripts/vite/import-page-component'
import { ZiggyVue } from 'ziggy/vue'
import { Ziggy } from './ziggy'

createInertiaApp({
  resolve: (name) => importPageComponent(name, import.meta.glob('../views/pages/**/*.vue')),
  setup ({ el, app, props, plugin }) {
    createApp({ render: () => h(app, props) })
      .use(plugin)
      .use(ZiggyVue, Ziggy)
      .mount(el)
  }
})

InertiaProgress.init()
