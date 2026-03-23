import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:19003/api/feed/'

export const useImagesStore = defineStore('images', () => {
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchImages = async () => {
    loading.value = true
    error.value = null

    try {
      const { data } = await axios.get(API_URL)
      const array = Array.isArray(data) ? data : (data?.data || data?.items || [])
      posts.value = array.map((item, i) => ({
        id: item.id || item._id || i + 1,
        username: item.username || `usuario_${i + 1}`,
        userAvatar: item.userAvatar || `https://i.pravatar.cc/40?u=${i + 1}`,
        image: item.url || item.image || item.path || item.src || null,
        caption: item.caption || item.description || 'Sem descrição',
        likes: item.likes || 0,
        comments: item.comments || [],
        liked: !!item.liked
      }))
    } catch (err) {
      error.value = err?.response?.data?.message || err.message || 'Erro ao carregar imagens'
    } finally {
      loading.value = false
    }
  }

  const toggleLike = (post) => {
    if (!post) return
    post.liked = !post.liked
    post.likes += post.liked ? 1 : -1
  }

  return { posts, loading, error, fetchImages, toggleLike }
})