import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/student/dashboard" },
  { name: "Courses", path: "/courses" },
  { name: "Admission Overview", path: "/instructions" },
  {name: "Counselling Updates", path: "/live-seat-availability" },
  { name: "Eligibility", path: "/eligibility" },
  { name: "Prediction", path: "/prediction" },
  { name: "Reservation", path: "/reservation" },
  { name: "Fees", path: "/fees" },
  { name: "Cutoffs", path: "/cutoffs" },
  { name: "FAQ", path: "/faq" },
];

const StudentNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Active route check
  const isActive = (path: string) => location.pathname.startsWith(path);

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* LOGO */}
          <Link to="/student/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <img
                src="/images/hero/logo.png"
                alt="DAVV Sarthi Logo"
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />
            </div>

            <div className="flex flex-col leading-tight">
              <span
                className="text-lg md:text-xl font-bold text-foreground tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                DAVV Sarthi
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground">
                Student Portal
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-2 flex-nowrap justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap px-2 py-1 rounded-md text-[13px] font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/notify">
              <Button size="sm" className="flex items-center gap-1">
                 Notify Me
              </Button>
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link to="/notify">
              <Button size="sm" className="flex items-center gap-1">
                 Notify Me
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default StudentNavbar;
