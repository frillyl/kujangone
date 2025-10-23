import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="flex flex-col flex-1">
                <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main id="main-content" className="flex-1 p-4 md:p-6 overflow-y-auto relative" >
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
