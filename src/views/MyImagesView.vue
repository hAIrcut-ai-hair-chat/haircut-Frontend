<script setup>
import { ref, computed } from 'vue'
import LateralBar from '@/components/LateralBar.vue'

const items = ref([
  { id: 1, name: 'Cortes Modernos', type: 'folder', updated: '2 dias atrás' },
  { id: 2, name: 'Penteados Femininos', type: 'folder', updated: '5 dias atrás' },
  { id: 3, name: 'Coloração', type: 'folder', updated: '1 semana atrás' },

  {
    id: 5,
    name: 'Corte_undercut.jpg',
    type: 'image',
    thumbnail: 'https://source.unsplash.com/300x300/?undercut,men',
    updated: 'hoje'
  },
  {
    id: 6,
    name: 'Cacheado_01.jpg',
    type: 'image',
    thumbnail: 'https://source.unsplash.com/300x300/?curly,hair',
    updated: '3 dias atrás'
  },
  {
    id: 7,
    name: 'Liso_02.png',
    type: 'image',
    thumbnail: 'https://source.unsplash.com/300x300/?straight,hair,woman',
    updated: '4 dias atrás'
  }
])

const viewMode = ref('grid')
const searchQuery = ref('')
const breadcrumbs = ref(['Minhas Imagens'])

const filteredItems = computed(() => {
  let filtered = items.value

  if (searchQuery.value) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered.sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1
    if (a.type !== 'folder' && b.type === 'folder') return 1
    return 0
  })
})

const folderIcon = '📁'
const imageIcon = '🖼️'
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
            placeholder="Pesquisar cortes..."
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
        <div v-for="item in filteredItems" :key="item.id" class="file-item">

          <!-- GRID -->
          <div v-if="viewMode === 'grid'" class="grid-card">

            <div class="icon">
              <span v-if="item.type === 'folder'" class="folder-icon">
                {{ folderIcon }}
              </span>

              <img
                v-else
                :src="item.thumbnail"
                :alt="item.name"
                class="thumbnail"
              />
            </div>

            <div class="info">
              <span class="name">{{ item.name }}</span>
              <span class="updated">{{ item.updated }}</span>
            </div>
          </div>

          <!-- LIST -->
          <div v-else class="list-row">
            <span class="icon">
              {{ item.type === 'folder' ? folderIcon : imageIcon }}
            </span>

            <span class="name">{{ item.name }}</span>
            <span class="updated">{{ item.updated }}</span>
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
  background: #f4f6f9;
  font-family: 'Inter', sans-serif;
  font-left: 

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
}

.files-area.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.files-area.list {
  display: flex;
  flex-direction: column;
}

.grid-card {
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s;
}

.grid-card:hover {
  background: #f9fafc;
  transform: translateY(-3px);
}

.folder-icon {
  font-size: 3rem;
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
}

.updated {
  font-size: 0.85rem;
  color: #666;
}

.list-row {
  display: grid;
  grid-template-columns: 40px 2fr 1fr;
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

.list-row .updated {
  text-align: right;
  color: #666;
}
</style>