import axios from 'axios'

const BASE_DISCORD = 'https://discord.com/api/v10'
const ID_CLIENT = import.meta.env.VITE_DISCORD_CLIENT_ID
const URI_REDIRECTION = import.meta.env.VITE_DISCORD_REDIRECT_URI

const obtenirUriRedirection = () => {
  if (URI_REDIRECTION) return URI_REDIRECTION
  return `${window.location.origin}/auth/callback`
}

export const obtenirUrlAuthDiscord = () => {
  if (!ID_CLIENT) {
    throw new Error('VITE_DISCORD_CLIENT_ID manquant dans .env')
  }

  const parametres = new URLSearchParams({
    client_id: ID_CLIENT,
    redirect_uri: obtenirUriRedirection(),
    response_type: 'token',
    scope: 'identify email'
  })
  return `${BASE_DISCORD}/oauth2/authorize?${parametres}`
}

export const obtenirTokenDepuisFragment = () => {
  const parametres = new URLSearchParams(window.location.hash.replace('#', ''))
  const token = parametres.get('access_token')
  return token ? { tokenAcces: token } : null
}

export const recupererUtilisateurDiscord = async (tokenAcces) => {
  try {
    const reponse = await axios.get(`${BASE_DISCORD}/users/@me`, {
      headers: {
        Authorization: `Bearer ${tokenAcces}`,
        'Content-Type': 'application/json',
      },
    })

    return {
      id: reponse.data.id,
      username: reponse.data.username,
      discriminator: reponse.data.discriminator,
      avatar: reponse.data.avatar
        ? `https://cdn.discordapp.com/avatars/${reponse.data.id}/${reponse.data.avatar}.png`
        : null,
      email: reponse.data.email,
      verified: reponse.data.verified,
      mfa_enabled: reponse.data.mfa_enabled,
    }
  } catch (erreur) {
    console.error('Erreur pendant la récupération du profil Discord :', erreur)
    throw erreur
  }
}

export const sauvegarderTokenAuth = (donneesToken) => localStorage.setItem('token', donneesToken.tokenAcces)
export const obtenirTokenAuth = () => localStorage.getItem('token')
export const supprimerTokenAuth = () => localStorage.removeItem('token')