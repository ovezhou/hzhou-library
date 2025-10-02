<!-- <template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">{{ book.name }} - ISBN: {{ book.isbn }}</li>
    </ul>
  </div>
</template>

<script>
import { db } from '@/firebase/init'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { onMounted } from 'vue'

export default {
  setup() {
    const books = ref([])

    const fetchBooks = async () => {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000))
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data })
        })
        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books: ', error)
      }
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      books,
    }
  },
}
</script> -->

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase/init'
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore'

const rows = ref([])
const loading = ref(false)

const editingId = ref(null)
const editIsbn = ref('')
const editName = ref('')

const loadAll = async () => {
  loading.value = true
  const snap = await getDocs(query(collection(db, 'books'), orderBy('isbn', 'desc')))
  rows.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  loading.value = false
}

const startEdit = (r) => {
  editingId.value = r.id
  editIsbn.value = String(r.isbn ?? '')
  editName.value = r.name ?? ''
}

const saveEdit = async (id) => {
  const n = Number(editIsbn.value)
  if (Number.isNaN(n)) {
    alert('ISBN must be a valid number')
    return
  }
  await updateDoc(doc(db, 'books', id), { isbn: n, name: editName.value })
  editingId.value = null
  await loadAll()
}

const cancelEdit = () => {
  editingId.value = null
}

const removeRow = async (id) => {
  if (!confirm('Delete this book?')) return
  await deleteDoc(doc(db, 'books', id))
  await loadAll()
}

// ---- Queries for Set 2 ----
const qAll = loadAll

const qWhereNameIsOve = async () => {
  loading.value = true
  const snap = await getDocs(query(collection(db, 'books'), where('name', '==', 'Ove Book')))
  rows.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  loading.value = false
}

const qOrderByIsbn = async () => {
  loading.value = true
  const snap = await getDocs(query(collection(db, 'books'), orderBy('isbn', 'asc')))
  rows.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  loading.value = false
}

const qLimit3 = async () => {
  loading.value = true
  const snap = await getDocs(query(collection(db, 'books'), orderBy('isbn', 'asc'), limit(3)))
  rows.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  loading.value = false
}

onMounted(loadAll)
</script>

<template>
  <div class="card p-3">
    <h3 class="mb-3">Books (isbn / name)</h3>

    <div class="d-flex flex-wrap gap-2 mb-3">
      <button class="btn btn-outline-secondary btn-sm" @click="qAll">
        All (orderBy isbn desc)
      </button>
      <button class="btn btn-outline-secondary btn-sm" @click="qWhereNameIsOve">
        where(name == 'Ove Book')
      </button>
      <button class="btn btn-outline-secondary btn-sm" @click="qOrderByIsbn">
        orderBy(isbn asc)
      </button>
      <button class="btn btn-outline-secondary btn-sm" @click="qLimit3">
        orderBy(isbn) + limit(3)
      </button>
    </div>

    <div v-if="loading">Loading...</div>
    <table v-else class="table table-sm align-middle">
      <thead>
        <tr>
          <th style="width: 140px">ISBN</th>
          <th>Name</th>
          <th style="width: 220px">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r.id">
          <td>
            <template v-if="editingId === r.id">
              <input class="form-control form-control-sm" v-model="editIsbn" />
            </template>
            <template v-else>{{ r.isbn }}</template>
          </td>
          <td>
            <template v-if="editingId === r.id">
              <input class="form-control form-control-sm" v-model="editName" />
            </template>
            <template v-else>{{ r.name }}</template>
          </td>
          <td>
            <template v-if="editingId === r.id">
              <button class="btn btn-primary btn-sm me-2" @click="saveEdit(r.id)">Save</button>
              <button class="btn btn-outline-secondary btn-sm" @click="cancelEdit">Cancel</button>
            </template>
            <template v-else>
              <button class="btn btn-outline-primary btn-sm me-2" @click="startEdit(r)">
                Edit
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="removeRow(r.id)">Delete</button>
            </template>
          </td>
        </tr>
        <tr v-if="rows.length === 0">
          <td colspan="3" class="text-muted">No data.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
