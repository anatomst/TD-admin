<template>
  <div class="user-detail">
    <h1 class="user-detail__title">User Details</h1>
    <div class="user-detail__card">
      <el-card>
        <el-form class="user-detail__card-info" ref="formRef" :model="user" label-width="90px">
          <img :src="user.avatar" alt="photo" class="img" height="200" />
          <el-form-item label="First Name">
            <el-input v-model="user.first_name" input-style="width: 600px"></el-input>
          </el-form-item>
          <el-form-item label="Last Name">
            <el-input v-model="user.last_name" input-style="width: 600px"></el-input>
          </el-form-item>
          <el-form-item
            prop="email"
            label="Email"
            :rules="[
              {
                required: true,
                message: 'Please input email address',
                trigger: 'blur'
              },
              {
                type: 'email',
                message: 'Please input correct email address',
                trigger: ['blur', 'change']
              }
            ]"
          >
            <el-input v-model="user.email" input-style="width: 600px"></el-input>
          </el-form-item>
          <div class="user-detail__action-buttons">
            <el-button round size="large" type="info" @click="toUsersList">Back</el-button>
            <el-button round size="large" type="primary" color="#000" @click="submitForm(formRef)"
              >Save</el-button
            >
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage, type FormInstance } from 'element-plus'

const route = useRoute()
const router = useRouter()
const store = useStore()

const userId = route.params.id
const user = computed(() => store.state.usersStore.userDetail)
const formRef = ref<FormInstance>()

onMounted(loadUser)

async function loadUser() {
  let localUser = await store.dispatch('usersStore/loadLocalUser', userId)

  if (!localUser) {
    ElMessage.error('No user found with such id')
    await router.push('/users')
  }
}

function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      store.dispatch('usersStore/updateLocalUser', user.value)
      ElMessage.success('User successfully updated')
    } else {
      ElMessage.error('Error')
      return false
    }
  })
}

async function toUsersList() {
  await router.push('/users')
}
</script>

<style lang="scss">
.img {
  margin-bottom: 10px;
}

.user-detail {
  min-height: calc(100vh - 75px);
  height: 100%;
  background-color: #e5e5e5;

  &__title {
    font-size: 32px;
    font-weight: 600;
    padding: 20px;
  }

  &__card {
    padding: 20px;

    &-info {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      padding: 20px;
    }
  }

  &__action-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
  }
}
</style>
