import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pool from './db.js'

dotenv.config({ path: '.env.api' })

const app = express()
const port = Number(process.env.API_PORT || 3001)

app.use(cors({ origin: true }))
app.use(express.json())

app.get('/api/sante', (req, res) => {
  res.json({ ok: true })
})

app.get('/api/profils/:discordId', async (req, res) => {
  try {
    const discordId = String(req.params.discordId || '').trim()
    if (!discordId) return res.status(400).json({ erreur: 'discordId manquant' })

    const [lignes] = await pool.query(
      'SELECT discord_id, pseudo, avatar, email, argent, xp, niveau, caisses_ouvertes, items_json FROM profils WHERE discord_id = ? LIMIT 1',
      [discordId]
    )

    if (!lignes.length) return res.status(404).json({ erreur: 'profil introuvable' })

    const p = lignes[0]
    res.json({
      discordId: p.discord_id,
      pseudo: p.pseudo,
      avatar: p.avatar,
      email: p.email,
      argent: Number(p.argent || 0),
      xp: Number(p.xp || 0),
      niveau: Number(p.niveau || 1),
      caissesOuvertes: Number(p.caisses_ouvertes || 0),
      items: p.items_json ? JSON.parse(p.items_json) : []
    })
  } catch (erreur) {
    res.status(500).json({ erreur: erreur.message })
  }
})

app.post('/api/profils/sync', async (req, res) => {
  try {
    const body = req.body || {}
    const discordId = String(body.discordId || '').trim()
    if (!discordId) return res.status(400).json({ erreur: 'discordId manquant' })

    const pseudo = body.pseudo || 'Anonyme'
    const avatar = body.avatar || null
    const email = body.email || null
    const argent = Number(body.argent || 0)
    const xp = Number(body.xp || 0)
    const niveau = Number(body.niveau || (1 + Math.floor(xp / 100)))
    const caissesOuvertes = Number(body.caissesOuvertes || 0)
    const items = Array.isArray(body.items) ? body.items : []

    await pool.query(
      `INSERT INTO profils (discord_id, pseudo, avatar, email, argent, xp, niveau, caisses_ouvertes, items_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         pseudo = VALUES(pseudo),
         avatar = VALUES(avatar),
         email = VALUES(email),
         argent = VALUES(argent),
         xp = VALUES(xp),
         niveau = VALUES(niveau),
         caisses_ouvertes = VALUES(caisses_ouvertes),
         items_json = VALUES(items_json)`,
      [discordId, pseudo, avatar, email, argent, xp, niveau, caissesOuvertes, JSON.stringify(items)]
    )

    const [lignes] = await pool.query(
      'SELECT discord_id, pseudo, avatar, email, argent, xp, niveau, caisses_ouvertes, items_json FROM profils WHERE discord_id = ? LIMIT 1',
      [discordId]
    )

    const p = lignes[0]
    res.json({
      discordId: p.discord_id,
      pseudo: p.pseudo,
      avatar: p.avatar,
      email: p.email,
      argent: Number(p.argent || 0),
      xp: Number(p.xp || 0),
      niveau: Number(p.niveau || 1),
      caissesOuvertes: Number(p.caisses_ouvertes || 0),
      items: p.items_json ? JSON.parse(p.items_json) : []
    })
  } catch (erreur) {
    res.status(500).json({ erreur: erreur.message })
  }
})

app.listen(port, () => {
  console.log(`API MySQL active sur http://localhost:${port}`)
})
