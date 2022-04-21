<template>
  <a-layout>
    <a-layout-sider class="admin-layout-sider" width="160">
      <a-menu mode="inline">
        <a-sub-menu :key="item.id" v-for="item in menuList">
          <template #title>{{ item.name }}</template>
          <a-menu-item
            v-for="child in item.children"
            :key="child.id"
            @click="handleClick(child)"
          >
            <span>{{ child.name }}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout class="admin-layout-main">
      <a-layout-content class="admin-layout-content">
        <a-tabs
          type="editable-card"
          v-model:activeKey="activePaneKey"
          hide-add
          @edit="onPaneEdit"
        >
          <a-tab-pane :tab="p.title" v-for="p in panes" :key="p.key">
            <div :id="p.key"></div>
          </a-tab-pane>
        </a-tabs>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { useMicroApp } from '@/utils/useMicroApp'
import { defineComponent, nextTick, ref } from 'vue'
import { MenuItem, MenuList, mockMenu } from './mock'

export default defineComponent({
  name: 'AdminLayout',
  setup() {
    const menuList = ref<MenuList>(mockMenu)
    const { loadApp, appMap } = useMicroApp()
    const panes = ref<{ title: string; key: string; [k: string]: any }[]>([])
    const activePaneKey = ref(
      panes.value.length ? panes.value[0].key : undefined
    )

    async function handleClick(item: MenuItem) {
      const appId = item.id
      const isPaneExist = panes.value.some(p => p.key === appId)
      const microApp = appMap[appId]

      // 如果标签已经存在，切换到对应标签
      if (isPaneExist) {
        activePaneKey.value = appId
        return
      }

      // 不存在，创建新的标签，并激活标签，然后渲染微应用
      panes.value.push({
        title: item.name,
        key: appId
      })

      activePaneKey.value = appId

      await nextTick()

      if (microApp) {
        microApp.mount()
      } else {
        loadApp({
          name: appId,
          entry: item.entry,
          container: `#${appId}`,
          props: {
            path: item.path
          }
        })
      }
    }

    function removePane(targetKey: string) {
      let lastIndex = 0
      panes.value.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      panes.value = panes.value.filter(pane => pane.key !== targetKey)
      if (panes.value.length && activePaneKey.value === targetKey) {
        if (lastIndex >= 0) {
          activePaneKey.value = panes.value[lastIndex].key
        } else {
          activePaneKey.value = panes.value[0].key
        }
      }
    }

    function onPaneEdit(
      targetKey: string | MouseEvent,
      action: 'remove' | 'add'
    ) {
      if (typeof targetKey === 'string' && action === 'remove') {
        appMap[targetKey].unmount().then(() => {
          removePane(targetKey)
        })
      }
    }

    return {
      menuList,
      handleClick,
      panes,
      activePaneKey,
      onPaneEdit
    }
  }
})
</script>
<style lang="less" scoped>
.admin-layout {
  &-sider {
    background: #ffffff;
    overflow-y: auto;
  }
  &-main {
    background: #f0f0f0;
    flex: 1;
    padding: 15px;
    overflow: auto;
  }
  &-content {
    background: #ffffff;
    margin: 0;
    min-height: 280px;
    height: 100vh;
  }
}
</style>
