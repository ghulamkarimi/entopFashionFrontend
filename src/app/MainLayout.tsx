"use client";

import UserPanel from "@/components/nav/UserPanel";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>    
            <div className="flex min-h-screen flex-col bg-[#f9f9f9]">
                <div className="flex-1">{children}</div>
            </div>
            <footer className="bg-white py-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </footer>
        </div>
    );
    }
export default MainLayout;