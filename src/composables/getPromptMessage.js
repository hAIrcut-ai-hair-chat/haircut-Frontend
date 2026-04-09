import { usePromptStore } from '@/stores/prompt'

async function getPromptMessage(prompt_message) {
  const promptStore = usePromptStore()

  if (!prompt_message || prompt_message.trim() === '') {
    promptStore.error = 'Por favor, insira uma descrição do corte de cabelo desejado'
    return null
  }

  if (prompt_message.length > 1000) {
    promptStore.error = 'A descrição não pode exceder 1000 caracteres'
    return null
  }

  promptStore.error = null
  return prompt_message.trim()
}

export default getPromptMessage
