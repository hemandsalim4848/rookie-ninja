'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '⬛' },
  { href: '/admin/brands', label: 'Brands', icon: '🏷️' },
  { href: '/admin/categories', label: 'Categories', icon: '🗂️' },
  { href: '/admin/products/browse', label: 'Products', icon: '📦' },
  { href: '/admin/products', label: 'Add Product', icon: '➕' },
  { href: '/admin/users', label: 'Users', icon: '👤' },
]

export default function AdminSidebar({ role, user }: { role: string; user: any }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-[#0A1628] flex flex-col shrink-0 sticky top-0 h-screen">

      {/* Logo */}
      <div className="px-6 py-8 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#15A7DC] rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">RN</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">Rookie Ninja</p>
            <p className="text-white/30 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map(item => {
          if (item.href === '/admin/users' && role !== 'admin') return null
          const isActive = item.href === '/admin/products/browse'
            ? pathname.startsWith('/admin/products/browse')
            : item.href === '/admin/products'
            ? pathname === '/admin/products'
            : item.href === '/admin/categories'
            ? pathname.startsWith('/admin/categories')
            : pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#15A7DC] text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/6'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-4 py-5 border-t border-white/8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#15A7DC]/20 flex items-center justify-center text-[#15A7DC] text-xs font-bold uppercase">
            {user?.name?.[0] || user?.email?.[0]}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-medium truncate">{user?.name || 'Admin'}</p>
            <p className="text-white/30 text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full text-left text-xs text-white/30 hover:text-red-400 transition-colors py-1"
        >
          → Sign out
        </button>
      </div>
    </aside>
  )
}