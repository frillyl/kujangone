import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/karyawan/Login";
import MainLayout from "./layouts/MainLayout";
import DashboardAdmin from "./pages/karyawan/admin/Dashboard";

const router = createBrowserRouter ([
  { path: "/karyawan/login", element: <Login /> },
  {
    path: "/admin/dashboard",
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardAdmin /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}