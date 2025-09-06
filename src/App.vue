<script setup>
import BHeader from './components/BHeader.vue'
import JSONView from './components/JSON.vue'
import LibraryRegistrationForm from './components/LibraryRegistrationForm.vue'
</script>

<template>
  <div class="main-container">
    <header class="nav-header">
      <BHeader />
    </header>

    <main class="main-box">
      <!-- <JSONView />
      <LibraryRegistrationForm /> -->
      <router-view></router-view>
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

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: #007bff;
}

.nav-link.router-link-exact-active {
  font-weight: bold;
  color: #0056b3;
}

.main-box {
  margin-top: 80px;
  padding: 1rem;
}
</style>
