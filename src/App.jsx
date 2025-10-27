import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import DashboardAdmin from "./pages/karyawan/admin/Dashboard";

const router = createBrowserRouter ([
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard/admin",
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardAdmin /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}