import axios from 'axios'

const BASE = 'https://discord.com/api/v10'
const ID = import.meta.env.VITE_DISCORD_CLIENT_ID
const URI = import.meta.env.VITE_DISCORD_REDIRECT_URI

export const getDiscordAuthUrl = () => {
  const p = new URLSearchParams({
    client_id: ID,
    redirect_uri: URI,
    response_type: 'token',
    scope: 'identify email'
  })
  return `${BASE}/oauth2/authorize?${p}`
}

export const getTokenFromFragment = () => {
  const p = new URLSearchParams(window.location.hash.replace('#', ''))
  const t = p.get('access_token')
  return t ? { accessToken: t } : null
}

/**
 * Fetch Discord user profile using the access token
 */
export const fetchDiscordUser = async (accessToken) => {
  try {
    const response = await axios.get(`${DISCORD_API_BASE}/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    return {
      id: response.data.id,
      username: response.data.username,
      discriminator: response.data.discriminator,
      avatar: response.data.avatar
        ? `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}.png`
        : null,
      email: response.data.email,
      verified: response.data.verified,
      mfa_enabled: response.data.mfa_enabled,
    }
  } catch (error) {
    console.error('Failed to fetch Discord user profile:', error)
    throw error
  }
}

export const saveAuthToken = (t) => localStorage.setItem('token', t.accessToken)
export const getAuthToken = () => localStorage.getItem('token')
export const clearAuthToken = () => localStorage.removeItem('token')