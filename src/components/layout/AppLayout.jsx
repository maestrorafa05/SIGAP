import { Outlet } from "react-router-dom"
import Topbar from "./Topbar"

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-apple-parchment text-apple-ink">
      <Topbar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}
