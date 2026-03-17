import axios from 'axios'

const cleApi = import.meta.env.VITE_KICKS_API_KEY

console.log('🔑 Clé API KICKS :', cleApi ? cleApi.substring(0, 10) + '...' : 'NON CHARGÉE')

const clientKicks = axios.create({
  baseURL: 'https://api.kicks.dev/v1',
  headers: {
    'X-Api-Key': cleApi,
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export const serviceKicks = {
  async obtenirTendance() {
    try {
      console.log('📊 Chargement des tendances...')
      const reponse = await clientKicks.get('/trending')
      console.log('✅ Tendances reçues :', reponse.data)
      return reponse.data
    } catch (erreur) {
      console.error('❌ Erreur tendances KicksDB :', erreur)
      return null
    }
  },

  async rechercherSneakers(recherche) {
    try {
      const reponse = await clientKicks.get('/search', {
        params: { q: recherche }
      })
      return reponse.data
    } catch (erreur) {
      console.error('Erreur recherche :', erreur)
      return null
    }
  },

  async obtenirPrixParSku(sku) {
    try {
      const reponse = await clientKicks.get(`/products/${sku}/prices`)
      return reponse.data
    } catch (erreur) {
      console.error('Erreur prix :', erreur)
      return null
    }
  }
}

export default serviceKicks
