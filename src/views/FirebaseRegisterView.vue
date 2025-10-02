<template>
  <h1>Creat an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { db } from '@/firebase/init'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()
// const register = () => {
//   createUserWithEmailAndPassword(auth, email.value, password.value)
//     .then((data) => {
//       console.log('Firebase Register Successful!')
//       router.push('/FireLogin')
//     })
//     .catch((error) => {
//       console.log(error.code)
//     })
// }
const register = async () => {
  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value.trim(),
    )
    const uid = cred.user.uid

    await setDoc(doc(db, 'users', uid), {
      email: email.value.trim(),
      role: 'user',
      createdAt: serverTimestamp(),
    })

    console.log('User registered:', { uid, email: email.value })
    router.push('/firelogin')
  } catch (e) {
    if (e.code === 'auth/email-already-in-use') {
      alert('This email is already registered. Please log in instead.')
      router.push('/firelogin')
    } else if (e.code === 'auth/invalid-email') {
      alert('Invalid email format. Please check your input.')
    } else if (e.code === 'auth/weak-password') {
      alert('Password should be at least 6 characters.')
    } else {
      alert('Registration failed. Please try again.')
    }
    console.error('Registration error:', e.code, e.message)
  }
}
</script>
