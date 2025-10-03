<template>
  <div class="container">
    <h1>All Books (JSON)</h1>
    <p v-if="errorMsg" style="color: red">{{ errorMsg }}</p>
    <pre v-if="books"
      >{{ books }}
    </pre>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GetAllBookAPI',
  data() {
    return {
      books: null,
      errorMsg: '',
    }
  },
  async mounted() {
    try {
      const response = await axios.get(
        'https://us-central1-fit5032-week6-77761.cloudfunctions.net/getAllBooks',
      )
      this.books = JSON.stringify(response.data, null, 2)
    } catch (err) {
      this.errorMsg = 'Failed to load books.'
      console.error(err)
    }
  },
}
</script>
