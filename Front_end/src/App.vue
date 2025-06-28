<template>
  <div class="container">
    <h2>🎈 Tambah Post</h2>
    <form @submit.prevent="addPost">
      <input v-model="newPost.title" placeholder="Judul" required />
      <input v-model="newPost.body" placeholder="Konten" required />
      <button type="submit">🚀 Kirim</button>
    </form>

    <hr />

    <h2>📜 Daftar Post</h2>
    <ul>
      <li
        v-for="post in posts"
        :key="post.id"
        class="post-card"
        :style="{ backgroundColor: post.color }"
      >
        {{ post.emoji }} <strong>{{ post.title }}</strong> - {{ post.body }}
        <button @click="editPost(post)">Edit</button>
        <button @click="deletePost(post.id)">Delete</button>
      </li>
    </ul>

    <!-- Form Edit -->
    <div v-if="editedPost.id" class="edit-form">
      <h3>Edit Post</h3>
      <form @submit.prevent="updatePost">
        <input v-model="editedPost.title" placeholder="Judul" />
        <input v-model="editedPost.body" placeholder="Konten" />
        <button type="submit">Simpan</button>
        <button @click="cancelEdit">Batal</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      posts: [],
      newPost: {
        title: '',
        body: ''
      },
      editedPost: {
        id: null,
        title: '',
        body: ''
      },
      emojiList: ['😂', '🎉', '😎', '🤩', '✨', '🔥', '🍕', '🎯', '🥳'],
      colorList: ['#FFC0CB', '#FFD700', '#ADFF2F', '#87CEFA', '#FFB6C1', '#D8BFD8']
    }
  },
  mounted() {
    this.loadPosts()
  },
  methods: {
    loadPosts() {
      const savedPosts = JSON.parse(localStorage.getItem('posts')) || []
      this.posts = savedPosts
    },
    savePosts() {
      localStorage.setItem('posts', JSON.stringify(this.posts))
    },
    randomEmoji() {
      const rand = Math.floor(Math.random() * this.emojiList.length)
      return this.emojiList[rand]
    },
    randomColor() {
      const rand = Math.floor(Math.random() * this.colorList.length)
      return this.colorList[rand]
    },
    addPost() {
      const newId = Date.now()
      const newItem = {
        id: newId,
        title: this.newPost.title,
        body: this.newPost.body,
        emoji: this.randomEmoji(),
        color: this.randomColor()
      }
      this.posts.push(newItem)
      this.savePosts()
      this.newPost.title = ''
      this.newPost.body = ''
      alert('🎉 Post berhasil ditambahkan! (confetti palsu hehe)')
    },
    editPost(post) {
      this.editedPost = { ...post }
    },
    cancelEdit() {
      this.editedPost = { id: null, title: '', body: '' }
    },
    updatePost() {
      const idx = this.posts.findIndex(p => p.id === this.editedPost.id)
      if (idx !== -1) {
        this.posts[idx].title = this.editedPost.title
        this.posts[idx].body = this.editedPost.body
        this.savePosts()
      }
      this.cancelEdit()
    },
    deletePost(id) {
      if (confirm('Yakin ingin menghapus post ini?')) {
        this.posts = this.posts.filter(p => p.id !== id)
        this.savePosts()
      }
    }
  }
}
</script>

<style scoped>
body {
  font-family: 'Comic Sans MS', cursive, sans-serif;
  background: linear-gradient(to right, #fbc2eb, #a6c1ee);
  padding: 20px;
  color: #333;
}

.container {
  max-width: 750px;
  margin: auto;
  background-color: #ffffffc9;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
}

h2, h3 {
  text-align: center;
  font-weight: bold;
  color: #333;
}

form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
  justify-content: center;
}

input {
  flex: 1 1 40%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background-color: #f0f0f0;
  color: #333;
  font-size: 16px;
}

button {
  padding: 12px 18px;
  border: none;
  background: linear-gradient(45deg, #ff6ec4, #7873f5);
  color: white;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
}

ul {
  list-style: none;
  padding: 0;
}

.post-card {
  padding: 15px;
  margin-bottom: 12px;
  border-radius: 12px;
  font-size: 17px;
  box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
  animation: fadeIn 0.5s ease-out;
}

.post-card strong {
  font-size: 19px;
}

.post-card button {
  margin-left: 10px;
  background: linear-gradient(to right, #fc5c7d, #6a82fb);
  border: none;
  padding: 8px 12px;
  color: white;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
}

.edit-form {
  margin-top: 30px;
  padding: 20px;
  background: #e0e0ff;
  border-radius: 15px;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
