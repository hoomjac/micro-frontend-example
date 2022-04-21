export interface MenuItem {
  path: string
  id: string
  name: string
  entry: string
  children?: MenuItem[]
}

export type MenuList = MenuItem[]

export const mockMenu: MenuList = [
  {
    path: 'child-a',
    id: 'suygdf786qadf8a8sf8af878d7fa',
    name: '子应用A',
    entry: '//localhost:10001',
    children: [
      {
        path: 'child-a/page1',
        id: 'f083bcc9f0ea4a7c8e4cf30dfb066f93',
        name: '页面1',
        entry: '//localhost:10001'
      },
      {
        path: 'child-a/page2',
        id: 'ab34b1b1feab4f5abf950d1c9999c46d',
        name: '页面2',
        entry: '//localhost:10001'
      },
      {
        path: 'child-a/page3',
        id: 'aef8d6903a7e4db0b04b96d1403d406c',
        name: '页面3',
        entry: '//localhost:10001'
      }
    ]
  }
]
