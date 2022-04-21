import { LoadableApp, loadMicroApp, MicroApp, ObjectType } from 'qiankun'
import NProgress from 'nprogress'
import '../styles/nprogress.css'

export function useMicroApp() {
  const appMap: { [k: string]: MicroApp } = {}
  const loadApp = (app: LoadableApp<ObjectType>) => {
    NProgress.start()
    const newApp = loadMicroApp(app)
    appMap[app.name] = newApp
    newApp.mountPromise
      .then(() => {
        NProgress.done()
      })
      .catch(() => NProgress.done())
  }

  return {
    loadApp,
    appMap
  }
}
