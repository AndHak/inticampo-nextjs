import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "../../login/store/authStore";
import { 
  LayoutDashboard, 
  Briefcase, 
  Settings, 
  LogOut, 
  ChevronRight,
  Sprout,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    title: "Portafolio",
    icon: Briefcase,
    href: "/admin/portafolio",
  },
  {
    title: "Servicios",
    icon: Settings,
    href: "/admin/services",
  },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col flex-1">
      <div className="p-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Admin Panel</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-gray-500 hover:text-[#1a4a2e]">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                isActive 
                  ? "bg-[#1a4a2e] text-white shadow-xl shadow-green-900/10" 
                  : "text-gray-500 hover:bg-green-50 hover:text-[#1a4a2e]"
              )}
            >
              <item.icon size={20} className={cn("transition-transform group-hover:scale-110 shrink-0", isActive && "text-white")} />
              <span className="font-bold text-sm tracking-tight">{item.title}</span>
              {isActive && (
                <div className="absolute right-4 hidden sm:block">
                  <ChevronRight size={14} />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3.5 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform shrink-0" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-3 bg-white rounded-2xl shadow-lg border border-gray-100 text-[#1a4a2e]"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-gray-100 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[60] lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

