import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const apiProfil = axios.create({ baseURL })

export const lireProfil = async (discordId) => {
  try {
    const r = await apiProfil.get(`/api/profils/${discordId}`)
    return r.data
  } catch (err) {
    console.error('erreur lecture du profil:', err.message)
    throw new Error(err.response?.data?.erreur || 'impossible de charger profil')
  }
}

export const synchroniserProfil = async (profil) => {
  try {
    const r = await apiProfil.post('/api/profils/sync', profil)
    return r.data
  } catch (err) {
    console.error('erreur synchronisation du profil:', err.message)
    throw new Error(err.response?.data?.erreur || 'impossible de synchroniser profil')
  }
}

export const obtenirLeaderboard = async () => {
  try {
    const r = await apiProfil.get('/api/leaderboard')
    return r.data
  } catch (err) {
    console.error('erreur lors de la lecture du leaderboard:', err.message)
    throw new Error(err.response?.data?.erreur || 'impossible de charger le leaderboard')
  }
}
