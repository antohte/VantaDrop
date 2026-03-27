import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const apiProfil = axios.create({ baseURL })

export const lireProfil = async (discordId) => {
  const r = await apiProfil.get(`/api/profils/${discordId}`)
  return r.data
}

export const synchroniserProfil = async (profil) => {
  const r = await apiProfil.post('/api/profils/sync', profil)
  return r.data
}
