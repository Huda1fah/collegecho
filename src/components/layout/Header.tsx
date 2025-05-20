
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Bell, User, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import LoginModal from "../auth/LoginModal";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  // For demo purposes
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between py-3 px-5 md:px-10 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      {/* Logo (visible only on mobile) */}
      <div className="md:hidden">
        <h2 className="text-lg font-bold bg-gradient-to-r from-indigo to-primary bg-clip-text text-transparent">
          Campus Echo
        </h2>
      </div>

      {/* Search Bar */}
      <div className={cn(
        "relative hidden md:flex items-center w-full max-w-md mx-4 transition-all duration-300",
        searchFocused ? "scale-105" : ""
      )}>
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search forums, colleges, or topics..."
          className="pl-10 pr-4 w-full rounded-full bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      {/* Right Navigation */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-72 overflow-y-auto py-2">
                  {["Your post received 10 upvotes", "Rahul commented on your post", "New JEE forum post needs your attention"].map((notification, i) => (
                    <DropdownMenuItem key={i} className="cursor-pointer py-3 px-4">
                      <div className="flex flex-col gap-1">
                        <span>{notification}</span>
                        <span className="text-xs text-muted-foreground">
                          {i === 0 ? "5 minutes ago" : i === 1 ? "2 hours ago" : "1 day ago"}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full bg-gradient-to-tr from-saffron via-white to-green"
                >
                  <User className="h-5 w-5 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-posts">My Posts</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button 
            onClick={() => setShowLoginModal(true)} 
            variant="ghost"
            className="flex items-center gap-2 bg-gradient-to-r from-indigo to-primary text-white hover:opacity-90"
          >
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </Button>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLogin={handleLogin}
        />
      )}
    </header>
  );
};

export default Header;
