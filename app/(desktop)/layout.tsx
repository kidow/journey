export default function Layout({ children }: ReactProps): React.ReactElement {
  return (
    <main className="max-w-160 min-h-screen mx-auto sm:shadow-xl">
      {children}
    </main>
  )
}
