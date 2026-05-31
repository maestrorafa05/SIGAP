import { Menu, Search } from "lucide-react"
import { useLocation } from "react-router-dom"

const pageTitles = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/data": "Data Explorer",
  "/about": "About",
}

function getTitle(pathname) {
  if (pathname.startsWith("/province/")) return "Detail Provinsi"
  return pageTitles[pathname] ?? "SIGAP SUMATERA"
}

export default function Topbar({ onMenuClick }) {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
            aria-label="Buka navigasi"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-forest-700">
              SIGAP SUMATERA
            </p>
            <h1 className="truncate text-lg font-bold text-slate-900">
              {getTitle(location.pathname)}
            </h1>
          </div>
        </div>

        <div className="hidden items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex">
          <Search className="h-4 w-4" aria-hidden="true" />
          <span>Dataset 1993-2020</span>
        </div>
      </div>
    </header>
  )
}
