import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <ul className="flex justify-between items-center p-8">
        <li>
          <Link href="/">
            <a className="text-blue-500 no-underline">Voter</a>
          </Link>
        </li>
        <ul className="flex justify-between items-center space-x-4">
          <button className="btn btn-white no-underline">Login</button>
        </ul>
      </ul>
    </nav>
  )
}