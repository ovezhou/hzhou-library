<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/init'
import { authState, hydrateFromLocalStorage } from '@/stores/authState'
import BHeader from '@/components/BHeader.vue'

onMounted(hydrateFromLocalStorage)

const router = useRouter()
const email = computed(() => authState.email)
const role = computed(() => authState.role)

const logout = async () => {
  await signOut(auth)
  localStorage.removeItem('uid')
  localStorage.removeItem('email')
  localStorage.removeItem('role')

  authState.uid = ''
  authState.email = ''
  authState.role = ''

  router.replace('/firelogin')
}
</script>

<template>
  <div class="main-container">
    <header class="nav-header">
      <BHeader />
      <div class="auth-inline">
        <span v-if="email">
          {{ email }}
          <span v-if="role"> ({{ role }})</span>
        </span>
        <span v-else>Guest</span>
        <button v-if="email" class="btn btn-outline-secondary btn-sm ms-2" @click="logout">
          Logout
        </button>
      </div>
    </header>

    <main class="main-box">
      <!-- <JSONView />
      <LibraryRegistrationForm /> -->
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 1rem;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.auth-inline {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.main-box {
  margin-top: 80px;
  padding: 1rem;
}
</style>
