import Link from 'next/link';
import { logout } from '../actions';

export default function Header() {
  const siteUrl = process.env.SITE_URL;
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-bold text-navy">
          Protutor360 <span className="font-normal text-zinc-500">Blog Admin</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          {siteUrl && (
            <a href={`${siteUrl}/blog`} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-navy">
              View blog ↗
            </a>
          )}
          <form action={logout}>
            <button type="submit" className="text-zinc-600 hover:text-navy">
              Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
