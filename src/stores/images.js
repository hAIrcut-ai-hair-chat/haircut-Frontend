import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:19003/api/feed/'

export const useImagesStore = defineStore('images', () => {
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchImages = async () => {
    console.log('[fetchImages] Iniciando carregamento...')
    loading.value = true
    error.value = null

    try {
      console.log(`[fetchImages] Requisição GET para ${API_URL}`)
      const response = await axios.get(API_URL)
      const data = response.data
      console.log('[fetchImages] Resposta recebida:', data)

      // --- Estratégia de extração do array ---
      let array = []

      // 1. Se for um array diretamente
      if (Array.isArray(data)) {
        array = data
        console.log('[fetchImages] Resposta é um array diretamente.')
      }
      // 2. Se for um objeto com a propriedade 'data' ou 'items' que seja array
      else if (data?.data && Array.isArray(data.data)) {
        array = data.data
        console.log('[fetchImages] Array encontrado em data.data')
      } else if (data?.items && Array.isArray(data.items)) {
        array = data.items
        console.log('[fetchImages] Array encontrado em data.items')
      }
      // 3. Se for um objeto com outras propriedades comuns (ex: posts, feed, results)
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
      // 4. Se não encontrou, tenta achar o primeiro valor que seja array dentro do objeto  
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
          username: item.username || `usuario_${i + 1}`,
          userAvatar: item.userAvatar || `https://i.pravatar.cc/40?u=${i + 1}`,
          image: item.file,
          caption: item.caption || item.description || 'Sem descrição',
          likes: item.likes || 0,
          comments: item.comments || [],
          liked: !!item.liked
        }
        console.log(`[fetchImages] Item ${i} mapeado:`, mapped)
        return mapped
      })

      console.log('[fetchImages] posts finalizado:', posts.value)
      if (posts.value.length === 0) {
        console.warn('[fetchImages] Nenhum post foi carregado. Verifique a estrutura da resposta no log acima.')
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

  return { posts, loading, error, fetchImages, toggleLike }
})