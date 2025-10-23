import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/karyawan/Login";

const router = createBrowserRouter ([
  { path: "/karyawan/login", element: <Login /> },
]);

export default function App() {
  return <RouterProvider router={router} />
}