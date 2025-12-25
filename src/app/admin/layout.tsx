"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/modules/admin/login/store/authStore";
import { AdminSidebar } from "@/modules/admin/dashboard/components/AdminSidebar";
import { Toaster } from "sonner";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
    
    // Redirect to dashboard if logged in and trying to access login
    if (mounted && isAuthenticated && pathname === "/admin/login") {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router, pathname, mounted]);

  if (!mounted) return null;

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Only show content if authenticated
  if (!isAuthenticated) {
    return null; // Or a loader
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 h-screen overflow-y-auto px-4 md:px-8 py-20 lg:py-8">
        <div className="max-w-6xl mx-auto">
           <Toaster position="top-center" richColors />
           {children}
        </div>
      </main>
    </div>

  );
}

