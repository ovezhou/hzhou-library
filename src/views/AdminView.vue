<script setup>
import { computed } from 'vue'
import BookList from '@/components/BookList.vue'

const email = computed(() => localStorage.getItem('email') || '')
const role = computed(() => localStorage.getItem('role') || '')
</script>

<template>
  <div>
    <h1>Admin Dashboard</h1>
    <p>Welcome Admin: {{ email }} (role: {{ role }})</p>
    <BookList />
  </div>
</template>
