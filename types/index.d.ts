type ReactProps = Readonly<{
  children?: React.ReactNode
}>

namespace Spotify {
  interface Track {
    artists: Array<{ name: string }>
    name: string
    preview_url: string | null
  }
}
