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
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="flex flex-col flex-1 min-h-screen overflow-hidden">
                <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main id="main-content" className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8" >
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
