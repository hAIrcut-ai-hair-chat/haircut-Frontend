<script setup>
import { ref, onMounted } from 'vue'
import { useImagesStore } from '@/stores/images'
import LateralBar from '../components/LateralBar.vue'

const { posts, loading, error, fetchImages, toggleLike, saveImage, isImageSaved } = useImagesStore()
onMounted(fetchImages)

const toggleSave = (post) => {
  if (isImageSaved(post.id)) {
    console.log('Imagem já salva')
  } else {
    saveImage(post)
  }
}

const lightboxImage = ref(null)
const openLightbox = (post) => {
  if (post.image) lightboxImage.value = post.image
}
const closeLightbox = () => lightboxImage.value = null
</script>

<template>
  <div class="explore-layout">
    <main class="main-content">
      <div v-if="loading" class="loading-state">
        <p>Carregando imagens...</p>
      </div>
      <div v-else-if="error" class="error-state">
        <p>Erro ao carregar imagens: {{ error }}</p>
        <button @click="fetchImages" class="retry-btn">Tentar novamente</button>
      </div>
      <div v-else-if="posts.length === 0" class="empty-explore">
        <p>Nenhuma imagem encontrada. Atualize a página.</p>
        <button @click="fetchImages" class="retry-btn" style="margin-top: 1rem;">Tentar novamente</button>
      </div>
      <div v-else class="explore-grid">
        <div
          v-for="post in posts"
          :key="post.id"
          class="grid-item"
          :class="{ 'no-image': !post.image }"
        >
          <img
            v-if="post.image"
            :src="post.image"
            :alt="'Post de @' + post.username"
            class="grid-image"
            loading="lazy"
            @error="handleImageError(post)"
            @click="openLightbox(post)"
            style="cursor: pointer"
          />
          <div v-else class="no-image-placeholder">
            <span>Sem imagem</span>
            <small>{{ post.caption }}</small>
          </div>
          <div class="item-overlay">
            <div class="overlay-content">
              <span class="username">@{{ post.username }}</span>
              <span class="caption">{{ post.caption }}</span>
              <div class="actions">
                <button 
                  class="save-btn" 
                  :class="{ saved: isImageSaved(post.id) }" 
                  @click.stop="toggleSave(post)"
                  :title="isImageSaved(post.id) ? 'Remover dos salvos' : 'Salvar imagem'"
                >
                  <span class="heart" aria-hidden="true">{{ isImageSaved(post.id) ? '❤️' : '🤍' }}</span>
                </button>
                <button 
                  class="like-btn" 
                  :class="{ liked: post.liked }" 
                  @click.stop="toggleLike(post)"
                  aria-label="Curtir post"
                >
                  <span class="heart" aria-hidden="true">❤️</span>
                  {{ post.likes }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <LateralBar />

    <div v-if="lightboxImage" class="lightbox-overlay" @click.self="closeLightbox">
      <img :src="lightboxImage" class="lightbox-image" />
      <button class="close-btn" @click="closeLightbox">✕</button>
    </div>
  </div>
</template>

<style scoped>
.explore-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  position: relative;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.main-content {
  flex: 1;
  max-width: 100%;
  margin: 0 auto;
  padding: clamp(0.75rem, 2vw, 1rem);
  transition: margin-right 0.3s ease;
}
:deep(.lateral-bar.expanded) ~ .main-content {
  margin-right: 280px;
}
.empty-explore, .loading-state, .error-state {
  text-align: center;
  padding: clamp(2rem, 5vw, 3rem) clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(1rem, 2vw, 1.1rem);
  background: var(--bg-primary);
  border-radius: 12px;
  margin: 2rem 0;
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}
.error-state {
  background: var(--bg-primary);
  color: #ff6b6b;
}
.retry-btn {
  margin-top: 1rem;
  padding: clamp(0.4rem, 2vw, 0.6rem) clamp(0.8rem, 3vw, 1.2rem);
  background: var(--text-primary);
  color: var(--bg-primary);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: clamp(0.85rem, 2vw, 1rem);
  transition: background-color 0.2s ease;
}
.retry-btn:hover { background: var(--text-secondary); }
.explore-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(clamp(150px, 20vw, 250px), 1fr));
  gap: clamp(0.5rem, 2vw, 1rem);
  margin-bottom: 2rem;
}
.grid-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--bg-primary);
  aspect-ratio: 1 / 1;
  cursor: pointer;
  box-shadow: 0 2px 8px var(--shadow-medium);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.grid-item:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px var(--shadow-medium);
}
.grid-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.no-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
  color: var(--text-secondary);
  font-size: 0.9rem;
}
.no-image-placeholder span {
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  color: var(--text-primary);
}
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
.grid-item:hover .item-overlay { opacity: 1; }
.overlay-content {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.95rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  width: 100%;
}
.username { font-weight: 600; font-size: 1rem; }
.caption {
  font-size: 0.85rem;
  opacity: 0.9;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}
.save-btn, .like-btn {
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
.save-btn:hover, .like-btn:hover { background-color: rgba(255, 255, 255, 0.1); }
.save-btn.saved { color: #ff6b6b; }
.like-btn.liked .heart { color: #ff4444; transform: scale(1.1); }
.heart { font-size: 1.1rem; transition: transform 0.2s ease; }
@media (max-width: 768px) { .explore-grid { grid-template-columns: repeat(2, 1fr); gap: 0.8rem; } .main-content { margin-right: 0 !important; } }
@media (max-width: 480px) { .main-content { padding: 0.5rem; } .explore-grid { grid-template-columns: 1fr; gap: 0.8rem; } }

/* Lightbox */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  box-sizing: border-box;
}
.lightbox-image {
  max-width: 90%;
  max-height: 90%; 
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  transition: transform 0.3s ease;
}
.close-btn {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  font-size: 1.5rem;
  padding: 0.3rem 0.6rem;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1010;
}
.close-btn:hover { background: rgba(0,0,0,0.8); }
</style>