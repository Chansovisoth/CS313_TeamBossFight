"use client"

// ===== LIBRARIES ===== //
import { useMemo, useState, useEffect, useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Sun,
  Moon,
  Flame,
  Badge,
  House,
  BookA,
  LogOut,
  User,
  Settings,
  Trophy,
  QrCode,
  Users,
  BarChart3,
  Shield,
} from "lucide-react"

// ===== COMPONENTS ===== //
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AlertLogout from "./AlertLogout"

// ===== CONTEXTS ===== //
import { useThemeColor } from "@/theme/theme-provider"
import { useAuth } from "@/context/useAuth";

export function NavSidebar({ ...props }) {
  const { colorScheme, toggleColorScheme } = useThemeColor()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // ===== AUTHENTICATION HANDLERS ===== //
  const { logout } = useAuth();
  const handleLogout = useCallback(async () => {
    try {
      logout();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [logout, navigate]);

  // ===== NAVIGATION DATA ===== //
  const navigationItems = useMemo(
    () => [
      {
        title: "Main",
        items: [
          {
            title: "Home",
            url: "/",
            icon: House,
            isActive: location.pathname === "/",
          },
          {
            title: "Badges",
            url: "/badges",
            icon: Badge,
            isActive: location.pathname === "/badges",
          },
          {
            title: "Leaderboard",
            url: "/leaderboard",
            icon: Trophy,
            isActive: location.pathname === "/leaderboard",
          },
          {
            title: "QR",
            url: "/qr",
            icon: QrCode,
            isActive: location.pathname === "/qr",
          },  
        ],
      },
      // {
      //   title: "Information",
      //   items: [
      //     {
      //       title: "About",
      //       url: "/about",
      //       icon: BookA,
      //       isActive: location.pathname === "/about",
      //     },
      //   ],
      // },
    ],
    [location.pathname],
  )

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* ===== SIDEBAR HEADER ===== */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              onClick={() => navigate("/")}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-sidebar-primary-foreground">
                <img src="/src/assets/Swords.png" alt="UniRAID" className="size-6 object-contain" />
              </div>
              {/* LOGO */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">UniRAID</span>
                <span className="truncate text-xs text-muted-foreground">Group Boss Battle</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ===== SIDEBAR CONTENT ===== */}
      <SidebarContent>
        {navigationItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                      <button onClick={() => navigate(item.url)} className="flex items-center gap-2 w-full">
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* ===== SIDEBAR FOOTER ===== */}
      <SidebarFooter>
        {/* Theme Toggle */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={toggleColorScheme}
              tooltip={`Switch to ${colorScheme === "light" ? "dark" : "light"} mode`}
            >
              {colorScheme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
              <span>{colorScheme === "light" ? "Dark Mode" : "Light Mode"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <Separator />

        {/* User Menu */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                    <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      BF
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name || "User"}</span>
                    <span className="truncate text-xs text-muted-foreground">{user?.email || ""}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                      <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                        BF
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.name || "User"}</span>
                      <span className="truncate text-xs text-muted-foreground">{user?.email || ""}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                {/* User Management for admin/host only */}
                {(user?.role === "admin" || user?.role === "host") && (
                  <DropdownMenuItem onClick={() => navigate("/host/events/view")}>
                    <Users className="mr-2 h-4 w-4" />
                    <span>View as Host</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowLogoutDialog(true)}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* Logout Confirmation Dialog */}
      <AlertLogout
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />

      <SidebarRail />
    </Sidebar>
  )
}

// Default export for compatibility with existing imports
export default NavSidebar
