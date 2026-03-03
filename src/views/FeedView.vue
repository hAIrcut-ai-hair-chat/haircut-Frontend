<!-- Feed.vue -->
<script setup>
import { ref } from 'vue'

// Dados mockados simulando posts
const posts = ref([
  {
    id: 1,
    username: 'joaosilva',
    userAvatar: 'https://i.pravatar.cc/40?u=1',
    image: 'https://picsum.photos/600/400?random=1',
    caption: 'Meu novo corte! 😎',
    likes: 15,
    comments: [
      { id: 1, user: 'maria123', text: 'Ficou incrível!' },
      { id: 2, user: 'carlos_oli', text: 'Combina com você' }
    ],
    liked: false
  },
  {
    id: 2,
    username: 'anabeatriz',
    userAvatar: 'https://i.pravatar.cc/40?u=2',
    image: 'https://picsum.photos/600/400?random=2',
    caption: 'Inspiração para o próximo corte ✂️',
    likes: 8,
    comments: [],
    liked: true
  }
])

// Função para adicionar novo post (vinda do componente de upload)
function addNewPost(postData) {
  const newPost = {
    id: Date.now(),
    username: 'usuario_atual', // poderia vir de um store
    userAvatar: 'https://i.pravatar.cc/40?u=' + Date.now(),
    image: postData.imageUrl || null,
    caption: postData.text,
    likes: 0,
    comments: [],
    liked: false
  }
  posts.value.unshift(newPost) // adiciona no início
}

// Funções de interação
function toggleLike(post) {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

function addComment(post, commentText) {
  if (!commentText.trim()) return
  post.comments.push({
    id: Date.now(),
    user: 'usuario_atual',
    text: commentText
  })
}

function sharePost(post) {
  // Simula compartilhamento (copia link ou abre modal)
  alert(`Compartilhar post: ${post.caption}`)
}

// Expondo para uso no componente pai (se necessário)
defineExpose({ addNewPost })
</script>

<template>
  <div class="feed-container">
    <div v-if="posts.length === 0" class="empty-feed">
      Nenhum post ainda. Seja o primeiro a compartilhar!
    </div>

    <div v-for="post in posts" :key="post.id" class="post-card">
      <!-- Cabeçalho do post -->
      <div class="post-header">
        <img :src="post.userAvatar" class="avatar" alt="avatar" />
        <span class="username">@{{ post.username }}</span>
      </div>

      <!-- Imagem do post (se houver) -->
      <div v-if="post.image" class="post-image">
        <img :src="post.image" alt="post image" />
      </div>

      <!-- Legenda -->
      <div class="post-caption">
        <strong>@{{ post.username }}</strong> {{ post.caption }}
      </div>

      <!-- Ações: like, comentário, compartilhar -->
      <div class="post-actions">
        <button 
          class="action-btn" 
          :class="{ liked: post.liked }"
          @click="toggleLike(post)"
        >
          <span class="btn-icon">❤️</span>
          <span>{{ post.likes }} curtidas</span>
        </button>

        <button class="action-btn" @click="$refs[`comment-${post.id}`].focus()">
          <span class="btn-icon">💬</span>
          <span>{{ post.comments.length }} comentários</span>
        </button>

        <button class="action-btn" @click="sharePost(post)">
          <span class="btn-icon">🔗</span>
          <span>Compartilhar</span>
        </button>
      </div>

      <!-- Seção de comentários -->
      <div class="comments-section">
        <div v-for="comment in post.comments" :key="comment.id" class="comment">
          <strong>@{{ comment.user }}</strong> {{ comment.text }}
        </div>

        <!-- Input para novo comentário -->
        <div class="add-comment">
          <input
            type="text"
            :ref="'comment-' + post.id"
            placeholder="Adicione um comentário..."
            @keyup.enter="e => {
              addComment(post, e.target.value)
              e.target.value = ''
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feed-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.empty-feed {
  text-align: center;
  color: #999;
  padding: 3rem;
  font-size: 1.1rem;
}

.post-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  padding: 1.2rem;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-weight: 600;
  color: #2d3748;
}

.post-image {
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
  max-height: 400px;
}

.post-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.post-caption {
  margin-bottom: 1rem;
  line-height: 1.5;
  color: #4a5568;
}

.post-actions {
  display: flex;
  gap: 1rem;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.8rem 0;
  margin-bottom: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  cursor: pointer;
  color: #4a5568;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #f7fafc;
}

.action-btn.liked {
  color: #e53e3e;
}

.btn-icon {
  font-size: 1.2rem;
}

.comments-section {
  padding-left: 0.5rem;
}

.comment {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: #2d3748;
}

.add-comment {
  margin-top: 0.8rem;
}

.add-comment input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  font-size: 0.9rem;
  outline: none;
  transition: border 0.2s;
}

.add-comment input:focus {
  border-color: #3182ce;
}
</style>