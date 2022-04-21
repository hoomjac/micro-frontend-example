import './public-path'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { App as VueApp, createApp } from 'vue'
import App from './App.vue'
import { createMemoryHistory, createWebHashHistory } from 'vue-router'
import { createRouterByHistory } from './router/index'
import { name as appName } from '../package.json'

// 应用是否作为微应用加载（在qiankun运行环境内）
const poweredByQiankun: boolean = (window as any).__POWERED_BY_QIANKUN__

// 如果是作为微应用加载，使用内存路由，否则使用 hash 路由
const history = poweredByQiankun
  ? createMemoryHistory(`/${appName}/`) // 使用 package.json 中的 name 字段作为路由的 base, 与主应用传入的 path 对应
  : createWebHashHistory()

// 传入 history，创建路由
const router = createRouterByHistory(history)

interface QiankunProps {
  [k: string]: any
  path?: string
  container?: Element
}

// 全局变量，Vue 应用实例，用于方便在 unmount 中访问
let app: VueApp | null

// 应用渲染函数
function render(props: QiankunProps) {
  // 主应用传过来的加载路径，如果不是作为微应用访问，path为 undefined
  const { path, container } = props
  // 每次 render 都重新创建一个新的应用实例
  app = createApp(App)
  app.use(router).mount(container ? container.querySelector('#app') : '#app')
  // 如果作为微应用加载，且主应用传来了 path ,跳转到此 path (内存路由)
  if (poweredByQiankun && path) {
    router.push(path)
  }
}

// 独立运行时,直接调用 render 方法，正常渲染应用
if (!poweredByQiankun) {
  render({})
}

/* 👇 qiankun 微应用钩子函数 👇 */
export async function bootstrap() {
  console.log('bootstrap')
}

export async function mount(props: QiankunProps) {
  render(props)
}

export async function unmount() {
  if (app) {
    app.unmount()
    app._container.innerHTML = ''
    app = null
    history.destroy()
  }
}
