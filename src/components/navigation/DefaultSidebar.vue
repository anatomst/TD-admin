<template>
  <div class="default-sidebar">
    <div class="default-sidebar__logo">
      <el-image style="width: 180px; height: 100px" :src="logoIcon" />
    </div>
    <el-menu
      active-text-color="#ff0000"
      background-color="#181818"
      class="el-menu-vertical-demo"
      default-active="1"
      text-color="#fff"
      router
    >
      <el-menu-item index="/">
        <el-icon :size="25"><HomeFilled /> </el-icon>
        <span style="font-size: var(--el-font-size-extra-large)">Welcome</span>
      </el-menu-item>
      <el-menu-item index="/users">
        <el-icon :size="25"><UserFilled /></el-icon>
        <span style="font-size: var(--el-font-size-extra-large)">Users</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { UserFilled, HomeFilled } from '@element-plus/icons-vue'
import logoIcon from '@/assets/icons/logo.svg'
</script>

<style lang="scss">
.default-sidebar {
  min-height: 100vh;
  height: 100%;
  background-color: #181818;

  &__logo {
    padding: 20px 0;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
  }

  .el-menu {
    border: none;
  }

  .el-menu-item {
    .el-icon {
      padding-bottom: 4px;
      margin-right: 15px;
    }
  }
}
</style>
