import { NavLink } from "react-router-dom"
import { Map } from "lucide-react"
import { NAV_ITEMS } from "../../data/constants"

function navClass({ isActive }) {
  return [
    "flex items-center gap-3 rounded-full px-4 py-3 text-[14px] font-normal transition",
    isActive
      ? "bg-apple-blue text-white"
      : "text-apple-muted hover:bg-apple-pearl hover:text-apple-blue",
  ].join(" ")
}

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="flex h-full flex-col border-r border-apple-hairline bg-white px-4 py-5">
      <NavLink to="/" onClick={onNavigate} className="mb-8 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-apple-blue text-white">
          <Map className="h-5 w-5" aria-hidden="true" />
        </span>
        <span>
          <span className="apple-display block text-[17px] font-semibold text-apple-ink">
            SIGAP
          </span>
          <span className="block text-[12px] font-normal text-apple-muted">
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

      <div className="mt-auto rounded-[18px] border border-apple-hairline bg-apple-pearl p-4">
        <p className="text-[12px] font-semibold text-apple-blue">MVP GIS</p>
        <p className="mt-2 text-[14px] leading-[1.43] text-apple-muted">
          Data historis padi Sumatera dengan titik ibu kota provinsi.
        </p>
      </div>
    </aside>
  )
}
