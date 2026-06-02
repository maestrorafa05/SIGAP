import { useState } from "react"
import { Menu, Search, X } from "lucide-react"
import { Link, NavLink } from "react-router-dom"
import { NAV_ITEMS } from "../../data/constants"

export default function Topbar() {
  const [open, setOpen] = useState(false)

  function navClass({ isActive }) {
    return [
      "text-[12px] leading-none transition hover:text-white",
      isActive ? "text-white" : "text-white/70",
    ].join(" ")
  }

  return (
    <header className="sticky top-0 z-[5000] isolate">
      <div className="h-11 bg-apple-black text-white">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-6">
          <Link
            to="/"
            className="apple-display text-[12px] font-semibold leading-none text-white"
            onClick={() => setOpen(false)}
          >
            SIGAP SUMATERA
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={navClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-4 text-[12px] leading-none text-white/70 md:flex">
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span>1993-2020</span>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white md:hidden"
            aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="relative z-[5001] border-b border-white/10 bg-apple-black px-4 py-4 text-white md:hidden">
          <nav className="mx-auto grid max-w-[1440px] gap-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    "rounded-lg px-3 py-3 text-[17px] transition",
                    isActive ? "bg-white/12 text-white" : "text-white/72",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
