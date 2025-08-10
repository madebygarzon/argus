import { Home, Settings, BarChart3, History, MessageSquare, User } from "lucide-react";

// Navigation configuration for dashboard routes
export const dashboardNav = [
  { label: "Inicio", href: "/dashboard/inicio", icon: Home },
  { label: "Ajustes", href: "/dashboard/ajustes", icon: Settings },
  { label: "Métricas", href: "/dashboard/metricas", icon: BarChart3 },
  { label: "Históricos", href: "/dashboard/historicos", icon: History },
  { label: "Chat", href: "/dashboard/chat", icon: MessageSquare },
  { label: "Perfil", href: "/dashboard/perfil", icon: User },
] as const;
