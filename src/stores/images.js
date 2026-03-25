import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:19003/api/feed/'

export const useImagesStore = defineStore('images', () => {
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)
  const savedImages = ref([])

  const fetchImages = async () => {
    console.log('[fetchImages] Iniciando carregamento...')
    loading.value = true
    error.value = null

    try {
      console.log(`[fetchImages] Requisição GET para ${API_URL}`)
      const response = await axios.get(API_URL)
      const data = response.data
      console.log('[fetchImages] Resposta recebida:', data)

      let array = []

      if (Array.isArray(data)) {
        array = data
        console.log('[fetchImages] Resposta é um array diretamente.')
      }
      else if (data?.data && Array.isArray(data.data)) {
        array = data.data
        console.log('[fetchImages] Array encontrado em data.data')
      } else if (data?.items && Array.isArray(data.items)) {
        array = data.items
        console.log('[fetchImages] Array encontrado em data.items')
      }
      else if (data?.posts && Array.isArray(data.posts)) {
        array = data.posts
        console.log('[fetchImages] Array encontrado em data.posts')
      } else if (data?.feed && Array.isArray(data.feed)) {
        array = data.feed
        console.log('[fetchImages] Array encontrado em data.feed')
      } else if (data?.results && Array.isArray(data.results)) {
        array = data.results
        console.log('[fetchImages] Array encontrado em data.results')
      }
 
      else if (typeof data === 'object' && data !== null) {
        const possibleArrays = Object.values(data).filter(v => Array.isArray(v))
        if (possibleArrays.length > 0) {
          array = possibleArrays[0]
          console.log('[fetchImages] Usando o primeiro array encontrado no objeto:', Object.keys(data).find(k => Array.isArray(data[k])))
        } else {
          console.warn('[fetchImages] Nenhum array encontrado na resposta. Estrutura:', Object.keys(data))
        }
      }

      console.log(`[fetchImages] Array extraído com ${array.length} itens`)

      posts.value = array.map((item, i) => {
        const mapped = {
          id: item.id || item._id || i + 1,
          username: item.author.name || "Aleluia  ",
          userAvatar: item.userAvatar || item.avatar || `https://i.pravatar.cc/40?u=${i + 1}`,
          image: item.file || item.image || item.url || item.photo || item.foto || null,
          caption: item.caption || item.description || item.title || item.text || 'Sem descrição',
          likes: item.likes || item.likeCount || 0,
          comments: item.comments || [],
          liked: !!item.liked
        }
        console.log(`[fetchImages] Item ${i} mapeado:`, mapped)
        return mapped
      }).filter(post => post.image) 

      console.log('[fetchImages] posts finalizado (filtrado):', posts.value)
      if (posts.value.length === 0) {
        console.warn('[fetchImages] Nenhum post com imagem válida foi encontrado. Verifique se a API retorna URLs de imagem válidas nos campos: file, image, url, photo, foto')
      }
    } catch (err) {
      console.error('[fetchImages] Erro capturado:', err)
      error.value = err?.response?.data?.message || err.message || 'Erro ao carregar imagens'
      console.error('[fetchImages] Mensagem de erro final:', error.value)
    } finally {
      loading.value = false
      console.log('[fetchImages] Finalizado. loading = false')
    }
  }

  const toggleLike = (post) => {
    if (!post) {
      console.warn('[toggleLike] Tentativa de dar like em post inválido:', post)
      return
    }

    console.log(`[toggleLike] Post antes: id=${post.id}, liked=${post.liked}, likes=${post.likes}`)
    post.liked = !post.liked
    post.likes += post.liked ? 1 : -1
    console.log(`[toggleLike] Post depois: liked=${post.liked}, likes=${post.likes}`)
  }

  const saveImage = (post) => {
    if (!post || !post.image) {
      console.warn('[saveImage] Tentativa de salvar post inválido:', post)
      return
    }

    const alreadySaved = savedImages.value.some(saved => saved.id === post.id)
    if (!alreadySaved) {
      savedImages.value.push({
        ...post,
        savedAt: new Date().toISOString()
      })
      console.log('[saveImage] Imagem salva:', post.id)
    } else {
      console.log('[saveImage] Imagem já estava salva:', post.id)
    }
  }

  const removeSavedImage = (imageId) => {
    const index = savedImages.value.findIndex(img => img.id === imageId)
    if (index > -1) {
      savedImages.value.splice(index, 1)
      console.log('[removeSavedImage] Imagem removida:', imageId)
    }
  }

  const isImageSaved = (imageId) => {
    return savedImages.value.some(img => img.id === imageId)
  }

  return { posts, loading, error, savedImages, fetchImages, toggleLike, saveImage, removeSavedImage, isImageSaved }
}, { persist: true })