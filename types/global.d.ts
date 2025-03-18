declare namespace NodeJS {
  interface Process {
    env: ProcessEnv
  }
  interface ProcessEnv {
    NODE_ENV: string
    NEXT_PUBLIC_BASE_URL: string

    SPOTIFY_CLIENT_ID: string
    SPOTIFY_CLIENT_SECRET: string
  }
}
