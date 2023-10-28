<template>
  <div class="default-layout">
    <el-container>
      <el-aside width="250px" class="default-layout__sidebar">
        <DefaultSidebar />
      </el-aside>
      <el-container>
        <el-header height="75px" class="default-layout__header">
          <DefaultHeader />
        </el-header>
        <div class="default-layout__content">
          <slot />
        </div>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts"></script>

<style lang="scss">
.default-layout {
  &__header {
    background-color: #181818;
  }
}
</style>
