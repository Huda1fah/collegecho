
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, MessageSquare, BookOpen, School, Home, Users, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LogoAnimation from "../3d/LogoAnimation";

const collegeList = [
  "IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur", 
  "BITS Pilani", "NIT Trichy", "AIIMS Delhi", "Delhi University"
];

const examsList = [
  "JEE Main", "JEE Advanced", "NEET", "GATE", 
  "CAT", "UPSC", "NET", "CLAT"
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        className="fixed top-4 right-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white/80 backdrop-blur-lg shadow-xl transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo and Brand */}
        <div className="flex flex-col items-center justify-center p-4 border-b border-gray-200">
          <div className="w-24 h-24">
            <LogoAnimation />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo to-primary bg-clip-text text-transparent">
            Campus Echo
          </h1>
          <p className="text-xs text-muted-foreground">Indian College Community</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Main
            </h3>
            <div className="space-y-1">
              <Link to="/" className="nav-link active flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link to="/forums" className="nav-link flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Forums</span>
              </Link>
              <Link to="/exams" className="nav-link flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Entrance Exams</span>
              </Link>
              <Link to="/colleges" className="nav-link flex items-center gap-2">
                <School className="h-4 w-4" />
                <span>College Groups</span>
              </Link>
              <Link to="/explore" className="nav-link flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span>Explore</span>
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Popular Exams
            </h3>
            <div className="space-y-1">
              {examsList.slice(0, 4).map((exam) => (
                <Link key={exam} to={`/exams/${exam.toLowerCase().replace(/\s+/g, '-')}`} className="nav-link block">
                  {exam}
                </Link>
              ))}
              <Link to="/exams" className="text-xs text-primary hover:underline">
                View all exams →
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Top Colleges
            </h3>
            <div className="space-y-1">
              {collegeList.slice(0, 4).map((college) => (
                <Link key={college} to={`/colleges/${college.toLowerCase().replace(/\s+/g, '-')}`} className="nav-link block">
                  {college}
                </Link>
              ))}
              <Link to="/colleges" className="text-xs text-primary hover:underline">
                View all colleges →
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
