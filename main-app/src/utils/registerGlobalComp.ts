import { Col, Layout, Menu, Row, Tabs } from 'ant-design-vue'
import { App } from 'vue'
const compArr = [Menu, Row, Col, Layout, Tabs]

export function registerGlobalComponent(app: App): App {
  compArr.forEach((c: any) => {
    app.use(c)
  })
  return app
}
