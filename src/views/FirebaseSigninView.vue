<template>
  <h1>Sign in</h1>
  <p><input type="email" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/init'
import { authState } from '@/stores/authState'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()

// const signin = () => {
//   signInWithEmailAndPassword(getAuth(), email.value, password.value)
//     .then((data) => {
//       console.log('Firebase Register Successful!')
//       router.push('/')
//       console.log(auth.currentUser)
//     })
//     .catch((error) => {
//       console.log(error.code)
//     })
// }

const signin = async () => {
  try {
    const em = email.value.trim()
    const pw = password.value.trim()

    const cred = await signInWithEmailAndPassword(auth, em, pw)
    const uid = cred.user.uid

    const snap = await getDoc(doc(db, 'users', uid))
    const role = snap.exists() ? snap.data().role || '' : ''

    localStorage.setItem('uid', uid)
    localStorage.setItem('email', cred.user.email || '')
    localStorage.setItem('role', role)

    authState.uid = uid
    authState.email = cred.user.email || ''
    authState.role = role

    console.log('Logged in:', { uid, email: authState.email, role })

    if (role === 'admin') {
      router.replace('/admin')
    } else {
      router.replace('/')
    }
  } catch (e) {
    console.error('Login failed:', e.code, e.message)
    alert(e.message || 'Login failed.')
  }
}
</script>
