"use client";

import { usePathname } from "next/navigation";
import SidebarMenu from "@/components/nav/SidebarMenu";
import MobileMenu from "@/components/nav/MobileMenu";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/feature/store";
import { useEffect, useRef } from "react";
import {
  fetchCurrentUser,
  refreshAccessTokenThunk,
} from "@/feature/reducers/userSlice";

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
        <footer className="bg-white py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </footer>
      )}
    </div>
  );
};

export default MainLayout;
