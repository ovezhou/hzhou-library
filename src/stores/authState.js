import { reactive } from 'vue'

export const authState = reactive({
  uid: '',
  email: '',
  role: '',
})

export function hydrateFromLocalStorage() {
  authState.uid = localStorage.getItem('uid') || ''
  authState.email = localStorage.getItem('email') || ''
  authState.role = localStorage.getItem('role') || ''
}
