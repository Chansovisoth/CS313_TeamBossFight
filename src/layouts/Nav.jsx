// ===== LIBRARIES ===== //
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Sun, Moon, Flame, Badge, Menu, House, BookA, LogOut } from "lucide-react";

// ===== COMPONENTS ===== //
import { useNavigate } from "react-router-dom";
import { useThemeColor } from "@/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// ===== CONTEXTS ===== //
// import { useAuth } from "@/context/useAuth";
import { apiClient } from "../api";



const Nav = () => {
  
  const { colorScheme, toggleColorScheme } = useThemeColor();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  // ===== AUTHENTICATION HANDLERS ===== //
  // const { user, logout } = useAuth();
  // const handleLogout = useCallback(async () => {
  //   try {
  //     await apiClient.post("/auth/logout");
  //     logout();
  //     navigate("/auth");
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // }, [logout, navigate]);

  // ===== HANDLERS ===== //
  const closeMenu = () => {
    setIsMenuClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsMenuClosing(false);
    }, 180); // Match animation duration
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
    }
  };

  // Close menu when clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        isMenuOpen &&
        !isMenuClosing
      ) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isMenuClosing]);

  // Navigation items - edit here to change both PC and mobile nav tabs
  const navItems = useMemo(() => [
    // ...(!user
    //   ? [
          {
            icon: Flame,
            label: "Events",
            onClick: () => navigate("/"),
          },
          {
            icon: Badge,
            label: "Badges",
            onClick: () => navigate("/badges"),
          },
          {
            icon: BookA,
            label: "About",
            onClick: () => navigate("/about"),
          },
          
    //     ]
    //   : []),
  ], [navigate]); // removed user dependency

  // Action items - edit here to change both PC and mobile
  const actionItems = useMemo(() => [
    {
      icon: colorScheme === "light" ? Moon : Sun,
      label: colorScheme === "light" ? "Dark Mode" : "Light Mode",
      onClick: toggleColorScheme,
      title: `Toggle ${colorScheme === "light" ? "dark" : "light"} mode`,
    },
    // ...(user
    //   ? [
    //       {
    //         icon: LogOut,
    //         label: "Logout",
    //         onClick: handleLogout,
    //       },
    //     ]
    //   : []),
  ], [colorScheme, toggleColorScheme]); // removed user and handleLogout dependencies



  // ==== RENDER ====
  return (
    <nav className="px-4 sm:px-12 md:px-20 lg:px-20 xl:px-50 2xl:px-80">
      <div className="p-4 flex justify-between items-center text-foreground relative">
        {/* Logo Section */}
        <div className="logo-container flex items-center gap-2 sm:gap-4 min-w-0">
          <img
            className="logo-image w-10 sm:w-12 md:w-16 h-auto object-contain shrink-0"
            src="/Fox.png"
            alt="Team Boss Fight"
          />
          <h1 className="logo-title text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
            Team
            <br />
            <span className="text-primary">BossFight</span>
          </h1>
        </div>

        {/* PC buttons */}
        <div className="hidden sm:flex items-center gap-4">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="gap-2"
                onClick={item.onClick}
              >
                <IconComponent
                  className={item.iconProps?.className || "w-4 h-4"}
                />
                {item.label}
              </Button>
            );
          })}

          {actionItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={`action-${index}`}
                onClick={item.onClick}
                variant="outline"
                size="icon"
                className="w-9 h-9"
                title={item.title}
              >
                <IconComponent className="w-4 h-4" />
              </Button>
            );
          })}

          {/* Profile Picture */}
          <div className="ml-2">
            <img
              src="/Furry.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-border hover:border-primary transition-colors cursor-pointer"
              title="Profile"
            />
          </div>
        </div>

        {/* Mobile Button */}
        <div className="sm:hidden flex items-center gap-2" ref={dropdownRef}>
          {/* Profile Picture on Mobile */}
          <img
            src="/Furry.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover border-2 border-border hover:border-primary transition-colors cursor-pointer"
            title="Profile"
          />
          
          <Button
            onClick={toggleMenu}
            variant="outline"
            size="icon"
            className="w-8 h-8"
          >
            <Menu className="w-4 h-4" />
          </Button>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div
              className={`absolute top-full right-4 mt-[-20px] w-48 bg-background border rounded-lg shadow-lg flex flex-col p-2 z-50 ${
                isMenuClosing
                  ? "animated-fadeOut-up-fast"
                  : "animated-fadeIn-down-fast"
              }`}
            >
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className="justify-start gap-2 w-full"
                    onClick={() => {
                      item.onClick();
                      closeMenu();
                    }}
                  >
                    <IconComponent
                      className={item.iconProps?.className || "w-4 h-4"}
                    />
                    {item.label}
                  </Button>
                );
              })}

              {/* Divider */}
              <Separator className="my-2" />

              {actionItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={`action-mobile-${index}`}
                    onClick={() => {
                      item.onClick();
                      // Close menu for logout but not for theme toggle
                      if (item.label === "Logout") {
                        closeMenu();
                      }
                    }}
                    variant="ghost"
                    className="justify-start gap-2 w-full"
                  >
                    <IconComponent className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
