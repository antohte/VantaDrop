import apiClient from './apiClient'

const cleApi = import.meta.env.VITE_RAPIDAPI_KEY

const formater = (item) => {
  const nom = item?.shoeName || item?.name || item?.title || 'sneaker inconnue'
  const image = item?.thumbnail || item?.image?.original || item?.image || ''
  const prixBrut = item?.retailPrice || item?.retail || item?.lowestResellPrice?.stockX || null
  const prix = typeof prixBrut === 'number' ? prixBrut : Number(prixBrut)

  return {
    id: item?.id || item?.sku || nom,
    nom,
    image,
    prix: Number.isFinite(prix) ? prix : null
  }
}

const imageValide = (url) => {
  if (!url || typeof url !== 'string') return false
  return url.startsWith('http://') || url.startsWith('https://')
}

const PRIX_MIN = 10
const PRIX_MAX = 10000
const prixValide = (prix) => typeof prix === 'number' && Number.isFinite(prix) && prix >= PRIX_MIN && prix <= PRIX_MAX

export const recupererSneakers = async (limite = 12) => {
  if (!cleApi) {
    throw new Error('ajout VITE_RAPIDAPI_KEY dans .env')
  }

  const limiteDemandee = Math.max(limite, 1)
  const parPage = 100
  const nbPages = Math.ceil(limiteDemandee / parPage)

  try {
    const resultat = []

    for (let page = 1; page <= nbPages; page += 1) {
      const reponse = await apiClient.get('/sneakers', {
        params: { limit: parPage, page }
      })

      const donnees = reponse.data?.results || reponse.data || []

      if (!Array.isArray(donnees) || donnees.length === 0) {
        break
      }

      const valides = donnees
        .map(formater)
        .filter((e) => imageValide(e.image) && prixValide(e.prix))

      resultat.push(...valides)

      if (resultat.length >= limiteDemandee) {
        break
      }
    }

    return resultat.slice(0, limiteDemandee)
  } catch (err) {
    throw new Error('erreur API sneakers')
  }
}
