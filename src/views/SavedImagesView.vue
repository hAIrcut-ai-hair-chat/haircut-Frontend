<script setup>
import { ref, computed } from 'vue'
import LateralBar from '@/components/LateralBar.vue'
import { useImagesStore } from '@/stores/images'

const { savedImages, removeSavedImage } = useImagesStore()

const viewMode = ref('grid')
const searchQuery = ref('')
const breadcrumbs = ref(['Imagens Salvas'])

const filteredItems = computed(() => {
  if (!savedImages.value || !Array.isArray(savedImages.value)) {
    return []
  }
  let filtered = savedImages.value.map((img, index) => ({
    id: img.id,
    name: `Imagem_${img.id}.jpg`,
    type: 'image',
    thumbnail: img.image,
    updated: 'Salvo recentemente',
    originalPost: img
  }))

  if (searchQuery.value) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered
})

const imageIcon = '🖼️'

const removeImage = (item) => {
  if (confirm(`Tem certeza que deseja remover "${item.name}" das imagens salvas?`)) {
    removeSavedImage(item.id)
  }
}

const downloadImage = async (item) => {
  try {
    const response = await fetch(item.thumbnail)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = item.name
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  } catch (error) {
    console.error('Erro ao fazer download:', error)
    alert('Erro ao fazer download da imagem')
  }
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/300x200?text=Imagem+indisponível'
}
</script>

<template>
  <div class="drive-container">
    <div class="lateral-bar">
      <LateralBar />
    </div>

    <div class="main-content">
      <div class="header">
        <div class="breadcrumbs">
          {{ breadcrumbs[0] }}
        </div>

        <div class="actions">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Pesquisar imagens salvas..."
            class="search-box"
          />

          <button
            @click="viewMode = 'grid'"
            :class="{ active: viewMode === 'grid' }"
            class="view-btn"
          >
            ☐
          </button>

          <button
            @click="viewMode = 'list'"
            :class="{ active: viewMode === 'list' }"
            class="view-btn"
          >
            ☷
          </button>
        </div>
      </div>

      <div class="files-area" :class="viewMode">
        <div v-if="filteredItems.length === 0" class="empty-state">
          <div class="empty-icon">📷</div>
          <h3>Nenhuma imagem salva</h3>
          <p>Explore o feed e salve suas imagens favoritas!</p>
        </div>

        <div v-for="item in filteredItems" :key="item.id" class="file-item">
          <!-- GRID -->
          <div v-if="viewMode === 'grid'" class="grid-card">
            <div class="icon">
              <img
                :src="item.thumbnail"
                :alt="item.name"
                class="thumbnail"
                @error="handleImageError"
              />
            </div>

            <div class="info">
              <span class="name">{{ item.name }}</span>
              <span class="updated">{{ item.updated }}</span>
            </div>

            <div class="actions-overlay">
              <button class="action-btn delete-btn" @click="removeImage(item)" title="Remover">
                🗑️
              </button>
              <button class="action-btn download-btn" @click="downloadImage(item)" title="Download">
                ⬇️
              </button>
            </div>
          </div>

          <!-- LIST -->
          <div v-else class="list-row">
            <span class="icon">{{ imageIcon }}</span>
            <span class="name">{{ item.name }}</span>
            <span class="updated">{{ item.updated }}</span>
            <div class="list-actions">
              <button class="action-btn delete-btn" @click="removeImage(item)" title="Remover">
                🗑️
              </button>
              <button class="action-btn download-btn" @click="downloadImage(item)" title="Download">
                ⬇️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.drive-container {
  display: grid;
  grid-template-columns: 1fr 6fr;
  height: 100vh;
  background: #ffffff;
  font-family: 'Inter', sans-serif;
}

.main-content {
  padding: 30px;
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.breadcrumbs {
  font-size: 1.4rem;
  font-weight: 600;
  color: #1e1e1e;
}

.actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-box {
  padding: 10px 16px;
  border-radius: 25px;
  border: 1px solid #ddd;
  width: 260px;
  transition: 0.2s;
}

.search-box:focus {
  outline: none;
  border-color: #6366f1;
}

.view-btn {
  border: 1px solid #ddd;
  background: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.view-btn.active {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
}

.files-area {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
  min-height: 400px;
}

.files-area.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.files-area.list {
  display: flex;
  flex-direction: column;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: #666;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.empty-state p {
  margin: 0;
  font-size: 0.9rem;
}

.grid-card {
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
}

.grid-card:hover {
  background: #f9fafc;
  transform: translateY(-3px);
}

.grid-card:hover .actions-overlay {
  opacity: 1;
}

.thumbnail {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
}

.info {
  margin-top: 10px;
}

.name {
  display: block;
  font-weight: 500;
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.updated {
  font-size: 0.8rem;
  color: #666;
}

.actions-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.action-btn {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.action-btn:hover {
  transform: scale(1.1);
}

.delete-btn:hover {
  background: #ff4757;
  color: white;
}

.download-btn:hover {
  background: #3742fa;
  color: white;
}

.list-row {
  display: grid;
  grid-template-columns: 40px 2fr 1fr 100px;
  padding: 15px;
  border-bottom: 1px solid #f1f1f1;
  align-items: center;
}

.list-row:hover {
  background: #f9fafc;
}

.list-row .icon {
  font-size: 1.3rem;
}

.list-row .name {
  font-weight: 500;
}

.list-row .updated {
  text-align: right;
  color: #666;
  font-size: 0.85rem;
}

.list-actions {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .drive-container {
    grid-template-columns: 1fr;
  }

  .main-content {
    padding: 15px;
  }

  .search-box {
    width: 200px;
  }

  .files-area.grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }

  .list-row {
    grid-template-columns: 30px 1fr 80px;
  }

  .list-actions {
    display: none;
  }
}
</style>