"use client";

import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import { loginAction } from "../actions/authActions";

export const CardLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const result = await loginAction(formData);

      if (result.success) {
        login(username, remember);
        router.push("/admin/dashboard");
      } else {
        setError(result.error || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-green-100 flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <div className="w-16 h-16 bg-[#1a4a2e] rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg shadow-green-900/20">
            <Lock className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-black text-[#1a4a2e]">Panel de Control</h2>
          <p className="text-gray-500 text-sm font-medium">Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#1a4a2e] uppercase tracking-wider ml-1">Usuario</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1a4a2e] transition-colors" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all font-medium text-gray-700"
                placeholder="Ej. admin"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#1a4a2e] uppercase tracking-wider ml-1">Contraseña</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1a4a2e] transition-colors" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all font-medium text-gray-700"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a4a2e] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-gray-200 rounded-md peer-checked:bg-[#1a4a2e] peer-checked:border-[#1a4a2e] transition-all flex items-center justify-center">
                   <div className="w-2 h-2 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-600 group-hover:text-[#1a4a2e] transition-colors">Recordarme</span>
            </label>
            <button type="button" className="text-sm font-bold text-green-700 hover:text-green-800 transition-colors">
              ¿Olvidaste tu clave?
            </button>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg border border-red-100"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full bg-[#1a4a2e] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-800 transition-all active:scale-[0.98] shadow-lg shadow-green-900/20 disabled:opacity-70 disabled:pointer-events-none overflow-hidden relative group"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <span className="relative z-10">Iniciar Sesión</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-white/10 to-green-500/0 -translate-x-full group-hover:animate-shimmer" />
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};