import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import VerifyAccount from "./pages/VerifyAccount";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import MainLayout from "./layouts/MainLayout";
import DashboardAdmin from "./pages/karyawan/admin/Dashboard";
import DashboardAnggota from "./pages/anggota/Dashboard";
import DataAnggota from "./pages/karyawan/master/Anggota";
import DataKaryawan from "./pages/karyawan/master/Karyawan";
import DataAgen from "./pages/karyawan/master/Agen";

const router = createBrowserRouter ([
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/change-password", element: <ChangePassword /> },
  { path: "/verify-account", element: <VerifyAccount /> },
  {
    path: "/dashboard/admin",
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardAdmin /> },
    ],
  },
  {
    path: "/dashboard/anggota",
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardAnggota /> },
    ],
  },
  {
    path: "/master/anggota",
    element: <MainLayout />,
    children: [
      { index: true, element: <DataAnggota /> },
    ],
  },
  {
    path: "/master/karyawan",
    element: <MainLayout />,
    children: [
      { index: true, element: <DataKaryawan /> },
    ],
  },
  {
    path: "/master/agen",
    element: <MainLayout />,
    children: [
      { index: true, element: <DataAgen /> }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />
}