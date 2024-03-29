export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function VanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen">
      {children}
    </div>
  )
}
