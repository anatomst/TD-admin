<template>
  <div class="default-header">
    <el-avatar class="default-header__avatar" :size="40" :src="avatar" />
    <div>User Name</div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import avatarIcon from '@/assets/icons/avatar.png'

const state = reactive({
  avatar: avatarIcon
})

const { avatar } = toRefs(state)
</script>
<style lang="scss">
.default-header {
  background-color: #000;
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #fff;

  &__avatar {
    margin-right: 10px;
    background-color: #fff;
  }
}
</style>
