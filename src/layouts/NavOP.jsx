// ===== LIBRARIES ===== //
import { Calendar, Sword, BookOpen, Settings, Home, Moon, Sun, User, LogOut, BarChart3 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// ===== CONTEXTS ===== //
import { useThemeColor } from "@/theme/theme-provider";

// ===== NAVIGATION DATA ===== //
const mainNavItems = [
  {
    title: "Events",
    url: "/host/events/view",
    icon: Calendar,
  },
  {
    title: "Bosses",
    url: "/host/bosses/view",
    icon: Sword,
  },
  {
    title: "Question Bank",
    url: "/host/questionbank/categories/view",
    icon: BookOpen,
  },
  {
    title: "All Time Leaderboard",
    url: "/host/all_leaderboard",
    icon: BarChart3,
  },
  {
    title: "User Management",
    url: "/host/users/view",
    icon: User,
  },
];

// Mock host user data
const mockHostUser = {
  name: "Host",
  email: "host@gmail.com",
  avatar: null,
};

const NavOP = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useThemeColor();
  
  // For now, assume host is always logged in
  const user = mockHostUser;

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* ===== SIDEBAR HEADER ===== */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              onClick={() => navigate("/host/events/view")}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-sidebar-primary-foreground">
                <img src="/src/assets/Swords.png" alt="UniRAID" className="size-6 object-contain" />
              </div>
              {/* LOGO */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">UniRAID</span>
                <span className="truncate text-xs text-muted-foreground">Host Panel</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url || location.pathname.startsWith(item.url.replace('/view', ''))}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {/* Dark Mode Toggle */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={toggleColorScheme}
              tooltip={`Switch to ${colorScheme === "light" ? "dark" : "light"} mode`}
            >
              {colorScheme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
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
                    <AvatarImage src={mockHostUser.avatar || "/placeholder.svg"} alt={mockHostUser.name} />
                    <AvatarFallback className="rounded-lg bg-orange-500 text-white">
                      H
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{mockHostUser.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{mockHostUser.email}</span>
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
                      <AvatarImage src={mockHostUser.avatar || "/placeholder.svg"} alt={mockHostUser.name} />
                      <AvatarFallback className="rounded-lg bg-orange-500 text-white">
                        H
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{mockHostUser.name}</span>
                      <span className="truncate text-xs text-muted-foreground">{mockHostUser.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {!user ? (
                  <>
                    <DropdownMenuItem onClick={() => navigate("/host/auth")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Login</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => navigate("/host/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/")}>
                      <Home className="mr-2 h-4 w-4" />
                      <span>Back to Player</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        // handleLogout(); // if using context
                        navigate("/host/auth");
                      }}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default NavOP;