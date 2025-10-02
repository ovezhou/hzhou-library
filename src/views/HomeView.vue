<script setup>
import { computed } from 'vue'
import LibraryRegistrationForm from '@/components/LibraryRegistrationForm.vue'
import AdminView from '@/views/AdminView.vue'

const email = computed(() => window.localStorage.getItem('email') || '')
const role = computed(() => window.localStorage.getItem('role') || '')
</script>

<template>
  <div>
    <h1>Home</h1>
    <p v-if="email">Welcome, {{ email }} (role: {{ role || 'N/A' }})</p>
    <p v-else>Please sign in first.</p>

    <div v-if="role === 'admin'">
      <h2>Admin Area</h2>
      <AdminView />
    </div>

    <div v-else-if="role === 'user'">
      <h2>User Area</h2>
      <LibraryRegistrationForm />
    </div>

    <div v-else>
      <p>Not logged in or without a role. Please log in.</p>
    </div>
  </div>
</template>
