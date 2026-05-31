import { Navigate, Route, Routes } from "react-router-dom"
import AppLayout from "./components/layout/AppLayout"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import DataExplorer from "./pages/DataExplorer"
import Home from "./pages/Home"
import ProvinceDetail from "./pages/ProvinceDetail"

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="province/:provinceSlug" element={<ProvinceDetail />} />
        <Route path="data" element={<DataExplorer />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
