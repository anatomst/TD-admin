<template>
  <div class="users-list">
    <div class="users-list__header">
      <h1 class="users-list__title">Users</h1>
      <el-input
        v-model="search"
        size="large"
        :prefix-icon="Search"
        placeholder="Type to search"
        input-style="max-width: 400px"
        style="--el-input-focus-border-color: #181818"
      />
    </div>

    <el-table
      :data="filterTableData"
      :table-layout="tableLayout"
      style="width: 100%; --el-table-border-color: #e5e5e5"
      border
      size="large"
      row-class-name="users-list__row"
    >
      <el-table-column label="Avatar" width="80">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-image :src="scope.row.avatar" alt="avatar" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="First Name" prop="first_name" />
      <el-table-column label="Last Name" prop="last_name" />
      <el-table-column label="Email" prop="email" />
      <el-table-column align="right" width="195">
        <template #default="scope">
          <el-button size="large" type="info" round @click="toUserDetails(scope.row)"
            >Edit</el-button
          >
          <el-button
            size="large"
            type="danger"
            color="#c10000"
            round
            @click="deleteUser(scope.row.id)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="example-pagination-block">
      <el-pagination
        layout="prev, pager, next"
        :current-page="currentPage"
        :total="12"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getItem, setItem } from '@/helpers/persistanceStorage'

const router = useRouter()
const store = useStore()

const currentPage = ref(1)
const search = ref('')
const tableLayout = ref('auto')
const users = ref([])

onMounted(loadUsers)

async function loadUsers() {
  const localUsers = getItem('users')
  const localMeta = getItem('meta')

  if (!localUsers || currentPage.value != localMeta?.page) {
    await store.dispatch('usersStore/getUsersList', currentPage.value)
    users.value = store.state.usersStore.users
    setItem('users', store.state.usersStore.users)
    setItem('meta', store.state.usersStore.meta)
  } else {
    users.value = localUsers
  }
}

const filterTableData = computed(() =>
  users.value.filter(
    (data) => !search.value || data?.first_name.toLowerCase().includes(search.value.toLowerCase())
  )
)

async function handlePageChange(newPage: number) {
  currentPage.value = newPage
  setItem('users', undefined)
  await loadUsers()
}

async function deleteUser(id: number) {
  users.value = users.value.filter((user) => user.id !== id)
  ElMessage.success('User successfully deleted')
}

async function toUserDetails(data: object) {
  setItem('chosenUser', data)
  await store.commit('usersStore/SET_USER', data)
  await router.push(`/users/${data.id}`)
}
</script>

<style scoped lang="scss">
.users-list {
  min-height: calc(100vh - 75px);
  height: 100%;
  background-color: #e5e5e5;
  .el-table {
    --el-table-header-text-color: #181818;
  }

  .el-pagination {
    --el-pagination-text-color: black;
    --el-pagination-hover-color: #ff0000;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 20px;
  }

  &__title {
    font-size: 32px;
    font-weight: 600;
    margin-right: 20px;
  }

  .example-pagination-block {
    display: flex;
    justify-content: end;
    margin: 20px;
  }
}
</style>
