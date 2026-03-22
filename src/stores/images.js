import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:19003'

export const useImagesStore = defineStore('images', () => {
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)

  const normalizeImageUrl = (url) => {
    if (!url) return null
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url
    return `${API_BASE_URL}/${cleanUrl}`
  }

  const transformPost = (item, index) => {
    let imageUrl = null
    if (typeof item === 'string') {
      imageUrl = item
    } else {
      imageUrl = item.url || item.image || item.path || null
    }

    return {
      id: item.id || Date.now() + index,
      username: item.username || `usuario_${index + 1}`,
      userAvatar: item.userAvatar || `https://i.pravatar.cc/40?u=${index + 1}`,
      image: normalizeImageUrl(imageUrl),
      caption: item.caption || item.description || 'Sem descrição',
      likes: item.likes ?? 0,
      comments: Array.isArray(item.comments) ? item.comments : [],
      liked: item.liked ?? false
    }
  }

  const fetchImages = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get(`${API_BASE_URL}/api/feed/`)
      consolo

      let dataArray = []
      if (Array.isArray(response.data)) {
        dataArray = response.data
      } else if (response.data && typeof response.data === 'object') {
        dataArray = response.data.data || response.data.items || [response.data]
      } else {
        throw new Error('Formato de resposta inválido')
      }

      posts.value = dataArray.map(transformPost)
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Erro ao carregar imagens'
      console.error('Erro na requisição:', err)
    } finally {
      loading.value = false
    }
  }

  const toggleLike = (post) => {
    if (!post) return
    post.liked = !post.liked
    post.likes += post.liked ? 1 : -1
  }

  const addNewPost = (postData) => {
    const { imageUrl, text } = postData
    if (!text && !imageUrl) return

    const newPost = {
      id: Date.now(),
      username: 'usuario_atual',
      userAvatar: `https://i.pravatar.cc/40?u=${Date.now()}`,
      image: normalizeImageUrl(imageUrl),
      caption: text || '',
      likes: 0,
      comments: [],
      liked: false
    }

    posts.value.unshift(newPost)
  }

  return { posts, loading, error, fetchImages, toggleLike, addNewPost }
})