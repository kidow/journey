'use client'

import { useEffect } from 'react'

interface Props {
  data: Spotify.Track[]
}

export default function SpotifyClient({ data }: Props): React.ReactElement {
  useEffect(() => {
    console.log('data', data)
  }, [])
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2">
      <iframe
        className="rounded-xl"
        src="https://open.spotify.com/embed/playlist/2OSSZOnLXPEbfrAQbTuGoe?utm_source=generator"
        width="100%"
        height="152"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  )
}
