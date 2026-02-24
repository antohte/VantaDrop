import axios from 'axios'

const apiKey = import.meta.env.VITE_KICKS_API_KEY

console.log('🔑 Clé API KICKS:', apiKey ? apiKey.substring(0, 10) + '...' : 'NON CHARGÉE')

const kicksClient = axios.create({
  baseURL: 'https://api.kicks.dev/v1',
  headers: {
    'X-Api-Key': apiKey,
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export const kicksService = {
  async getTrending() {
    try {
      console.log('📊 Chargement Trending...')
      const response = await kicksClient.get('/trending')
      console.log('✅ Trending reçu:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ Erreur Trending KicksDB:', error)
      return null
    }
  },

  async searchSneakers(query) {
    try {
      const response = await kicksClient.get('/search', {
        params: { q: query }
      })
      return response.data
    } catch (error) {
      console.error('Erreur recherche:', error)
      return null
    }
  },

  async getPricesBySku(sku) {
    try {
      const response = await kicksClient.get(`/products/${sku}/prices`)
      return response.data
    } catch (error) {
      console.error('Erreur prix:', error)
      return null
    }
  }
}

export default kicksService
