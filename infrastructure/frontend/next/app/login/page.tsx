"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { GraduationCap, Briefcase, Building2, Shield, Eye, EyeOff } from "lucide-react";

const roles = [
  {
    id: "etudiant",
    label: "Étudiant",
    description: "Formation initiale ou alternance",
    icon: GraduationCap,
    color: "bg-blue-500",
    border: "border-blue-500",
    bg: "bg-blue-50",
    href: "/etudiant",
    email: "etudiant@myges.fr",
  },
  {
    id: "intervenant",
    label: "Intervenant",
    description: "Cours & supports pédagogiques",
    icon: Briefcase,
    color: "bg-emerald-500",
    border: "border-emerald-500",
    bg: "bg-emerald-50",
    href: "/intervenant",
    email: "intervenant@myges.fr",
  },
  {
    id: "scolarite",
    label: "Administration",
    description: "Scolarité & pédagogie",
    icon: Building2,
    color: "bg-orange-500",
    border: "border-orange-500",
    bg: "bg-orange-50",
    href: "/scolarite",
    email: "admin@myges.fr",
  },
  {
    id: "superadmin",
    label: "Super Admin",
    description: "Gestion système & sécurité",
    icon: Shield,
    color: "bg-red-500",
    border: "border-red-500",
    bg: "bg-red-50",
    href: "/superadmin",
    email: "superadmin@myges.fr",
  },
] as const;

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const selected = roles.find((r) => r.id === selectedRole);

  const handleLogin = () => {
    if (!selected) return;
    setLoading(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("myges_role", selected.id);
    }
    setTimeout(() => router.push(selected.href), 700);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #001944 0%, #002C6E 55%, #1d4ed8 100%)",
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 backdrop-blur-sm bg-white/10 border border-white/20">
            <span className="text-2xl font-black text-white">M</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">MYGES 2.0</h1>
          <p className="text-white/50 mt-1.5 text-sm">Plateforme de gestion scolaire</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900">Connexion</h2>
          <p className="text-gray-500 text-sm mt-1 mb-6">
            Sélectionnez votre profil pour accéder à la plateforme
          </p>

          {/* Role grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-all text-center cursor-pointer",
                    isSelected
                      ? cn(role.border, role.bg)
                      : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-white",
                      role.color
                    )}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900 leading-none">
                      {role.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 leading-tight">
                      {role.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Demo hint */}
          {selected && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4 text-sm">
              <p className="font-semibold text-blue-900 text-xs mb-1">Identifiants de démonstration</p>
              <p className="text-blue-700 text-xs font-mono">{selected.email}</p>
              <p className="text-blue-700 text-xs font-mono">demo1234</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-3 mb-5">
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">Adresse email</label>
              <input
                type="email"
                placeholder="votre@email.fr"
                defaultValue={selected?.email ?? ""}
                key={selectedRole}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  defaultValue="demo1234"
                  className="w-full px-3 py-2.5 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={!selectedRole || loading}
            className={cn(
              "w-full py-2.5 rounded-xl font-semibold text-sm text-white transition-all",
              selectedRole && !loading
                ? "bg-[#001944] hover:bg-[#002C6E] cursor-pointer shadow-sm"
                : "bg-gray-300 cursor-not-allowed"
            )}
          >
            {loading ? "Connexion en cours…" : "Se connecter"}
          </button>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          MyGES 2.0 — Projet Annuel ESGI 5IW
        </p>
      </div>
    </div>
  );
}
