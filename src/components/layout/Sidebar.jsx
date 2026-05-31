import { NavLink } from "react-router-dom"
import { Map } from "lucide-react"
import { NAV_ITEMS } from "../../data/constants"

function navClass({ isActive }) {
  return [
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
    isActive
      ? "bg-forest-700 text-white shadow-panel"
      : "text-slate-600 hover:bg-forest-50 hover:text-forest-800",
  ].join(" ")
}

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="flex h-full flex-col border-r border-slate-200 bg-white px-4 py-5">
      <NavLink to="/" onClick={onNavigate} className="mb-8 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-700 text-white shadow-panel">
          <Map className="h-5 w-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-base font-bold tracking-wide text-forest-900">
            SIGAP
          </span>
          <span className="block text-xs font-semibold uppercase text-harvest-600">
            SUMATERA
          </span>
        </span>
      </NavLink>

      <nav className="space-y-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={onNavigate}
              className={navClass}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto rounded-lg border border-forest-100 bg-forest-50 p-4">
        <p className="text-xs font-semibold uppercase text-forest-700">MVP GIS</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Data historis padi Sumatera dengan titik ibu kota provinsi.
        </p>
      </div>
    </aside>
  )
}
