"use client";

import { usePathname } from "next/navigation";
import SidebarMenu from "@/components/nav/Menu";
import MobileMenu from "@/components/nav/MobileMenu";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/feature/store";
import { useEffect, useRef } from "react";
import {
  fetchCurrentUser,
  refreshAccessTokenThunk,
} from "@/feature/reducers/userSlice";
import Footer from "@/components/Footer";
import MarqueeComponent from "@/components/MarqueeComponent";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();
  const hasChecked = useRef(false); // 🆕 gegen doppelte Ausführung

  useEffect(() => {
    const checkLogin = async () => {
      if (hasChecked.current) return; // verhindert Endlosschleife
      hasChecked.current = true;

      try {
        const exp = Number(localStorage.getItem("exp"));
        const now = Math.floor(Date.now() / 1000);

        // Wenn kein exp oder abgelaufen: AccessToken erneuern
        if (!exp || now > exp - 60) {
          await dispatch(refreshAccessTokenThunk()).unwrap();
        }

        // Aktuellen Benutzer abrufen
        await dispatch(fetchCurrentUser()).unwrap();
      } catch (error) {
        console.warn("Nicht eingeloggt oder Token abgelaufen", error);
        localStorage.clear(); // optional
      }
    };

    checkLogin();
  }, [dispatch]);

  const pathName = usePathname();
  const hideLayout =
    pathName === "/login" ||
    pathName === "/register" ||
    pathName === "/forgot-password" ||
    pathName === "/reset-password";

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9]">
      {!hideLayout && (
        <>
        <div>
          <div className="hidden md:block">
            <div className="bg-gray-100 text-gray-700 font-semibold text-sm ">
              {/* MarqueeComponent */}
              <MarqueeComponent />
            </div>
          </div>
          <div className="block md:hidden">
            <div className="bg-gray-100 text-gray-700 font-semibold text-sm ">
              {/* MarqueeComponent */}
              <MarqueeComponent />
            </div>
          </div>
        </div>
          <div className="hidden md:block">
            <SidebarMenu />
          </div>
          <div className="block md:hidden">
            <MobileMenu />
          </div>
        </>
      )}

      <main className="flex-1">{children}</main>

      {!hideLayout && (
        
        <Footer />
      )}
    </div>
  );
};

export default MainLayout;
