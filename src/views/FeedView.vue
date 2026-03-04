<!-- Explore.vue -->
<script setup>
import { ref } from 'vue'
import LateralBar from '../components/LateralBar.vue'

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
  },
  {
    id: 3,
    username: 'carlos_oli',
    userAvatar: 'https://i.pravatar.cc/40?u=3',
    image: 'https://picsum.photos/600/400?random=3',
    caption: 'Degradê perfeito 🔥',
    likes: 24,
    comments: [],
    liked: false
  },
  {
    id: 4,
    username: 'maria123',
    userAvatar: 'https://i.pravatar.cc/40?u=4',
    image: 'https://picsum.photos/600/400?random=4',
    caption: 'Finalização com pomada',
    likes: 12,
    comments: [],
    liked: false
  },
  {
    id: 5,
    username: 'lucas_fer',
    userAvatar: 'https://i.pravatar.cc/40?u=5',
    image: 'https://picsum.photos/600/400?random=5',
    caption: 'Corte militar 👊',
    likes: 32,
    comments: [],
    liked: false
  },
  {
    id: 6,
    username: 'julia_m',
    userAvatar: 'https://i.pravatar.cc/40?u=6',
    image: 'https://picsum.photos/600/400?random=6',
    caption: 'Franja nova!',
    likes: 19,
    comments: [],
    liked: false
  }
])

// Função para adicionar novo post
const addNewPost = (postData) => {
  const newPost = {
    id: Date.now(),
    username: 'usuario_atual',
    userAvatar: `https://i.pravatar.cc/40?u=${Date.now()}`,
    image: postData.imageUrl || null,
    caption: postData.text,
    likes: 0,
    comments: [],
    liked: false
  }
  posts.value.unshift(newPost)
}

// Função para curtir/descurtir post
const toggleLike = (post) => {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

// Expõe funções para componentes pais
defineExpose({ addNewPost })
</script>

<template>
  <div class="explore-layout">
    <!-- Conteúdo principal -->
    <main class="main-content">
      <!-- Estado vazio -->
      <div v-if="posts.length === 0" class="empty-explore">
        <p>Nenhum post ainda. Seja o primeiro a compartilhar!</p>
      </div>

      <!-- Grid de posts -->
      <div v-else class="explore-grid">
        <div
          v-for="post in posts"
          :key="post.id"
          class="grid-item"
          :class="{ 'no-image': !post.image }"
        >
          <!-- Imagem do post -->
          <img
            v-if="post.image"
            :src="post.image"
            :alt="'Post de @' + post.username"
            class="grid-image"
            loading="lazy"
          />
          <div v-else class="no-image-placeholder">
            <span>Sem imagem</span>
          </div>

          <!-- Overlay com informações -->
          <div class="item-overlay">
            <div class="overlay-content">
              <span class="username">@{{ post.username }}</span>
              <span class="likes">
                <button 
                  class="like-btn" 
                  :class="{ liked: post.liked }" 
                  @click.stop="toggleLike(post)"
                  aria-label="Curtir post"
                >
                  <span class="heart" aria-hidden="true">❤️</span>
                  {{ post.likes }}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Barra lateral fixa -->
    <LateralBar />
  </div>
</template>

<style scoped>
.explore-layout {
  display: flex;
  min-height: 100vh;
  position: relative;
}

/* Conteúdo principal */
.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  transition: margin-right 0.3s ease;
}

/* Ajuste quando a sidebar está expandida */
:deep(.lateral-bar.expanded) + .main-content {
  margin-right: 250px; /* Largura da sidebar expandida */
}

/* Estado vazio */
.empty-explore {
  text-align: center;
  color: #666;
  padding: 3rem 1rem;
  font-size: 1.1rem;
  background: #f9f9f9;
  border-radius: 12px;
  margin: 2rem 0;
}

.empty-explore p {
  margin: 0;
}
.explore-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}
.grid-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f5f5f5;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.grid-item:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Imagem */
.grid-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: filter 0.3s ease;
}

/* Placeholder para posts sem imagem */
.no-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0e0e0 0%, #f0f0f0 100%);
  color: #666;
  font-size: 0.9rem;
}

.no-image-placeholder span {
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
}

/* Overlay */
.item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  opacity: 0;
  transition: opacity 0.2s ease;
  padding: 1rem;
  box-sizing: border-box;
}

.grid-item:hover .item-overlay {
  opacity: 1;
}

/* Conteúdo do overlay */
.overlay-content {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.95rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  width: 100%;
}

.username {
  font-weight: 600;
  font-size: 1rem;
}

/* Botão de like */
.likes {
  display: flex;
  align-items: center;
}

.like-btn {
  background: none;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.like-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.like-btn.liked .heart {
  color: #ff4444;
  transform: scale(1.1);
}

.heart {
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}

/* Media queries */
@media (max-width: 1024px) {
  .main-content {
    max-width: calc(100% - 80px); /* Considerando sidebar colapsada */
  }
}

@media (max-width: 768px) {
  .explore-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  
  .main-content {
    max-width: 100%;
    margin-right: 0 !important;
  }
  
  :deep(.lateral-bar.expanded) + .main-content {
    margin-right: 0; 
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0.5rem;
  }

  .explore-grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .empty-explore {
    margin: 1rem 0;
    padding: 2rem 1rem;
  }
}
</style>