import { headers } from 'next/headers'

import SpotifyClient from './client'

interface Success {
  access_token: string
  token_type: string
  expires_in: number
}
interface Failure {
  error: string
  error_description: string
}

export default async function Spotify(): Promise<React.ReactElement> {
  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')
  params.append('client_id', process.env.SPOTIFY_CLIENT_ID)
  params.append('client_secret', process.env.SPOTIFY_CLIENT_SECRET)
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  })
  const data: Awaited<Success | Failure> = await res.json()
  if ('error' in data) {
    console.error(data.error_description)
    throw new Error(data.error_description)
  }

  const headerList = await headers()
  const country = headerList.get('x-vercel-ip-country') || 'KR'
  const res2 = await fetch(
    `https://api.spotify.com/v1/playlists/2OSSZOnLXPEbfrAQbTuGoe/tracks?market=${country}&fields=items(track(id,name,preview_url,artists(name)))`,
    { headers: { Authorization: `Bearer ${data.access_token}` } }
  )
  const data2: Awaited<{ items: Spotify.Track[] }> = await res2.json()
  return <SpotifyClient data={data2?.items} />
}
