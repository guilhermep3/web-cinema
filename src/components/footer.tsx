import Link from "next/link"

export const Footer = () => {

  return (
    <footer className="text-center text-sm py-8 bg-zinc-900">
      <p>Developed by <Link href="https://github.com/guilhermep3" target="_blank" className="hover:underline">Guilherme Pereira</Link></p>
    </footer>
  )
}