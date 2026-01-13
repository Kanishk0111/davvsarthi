import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, ShieldCheck } from "lucide-react";

const Login = () => {
  const [role, setRole] = useState<"student" | "admin">("student");
  const navigate = useNavigate();

  const handleLogin = () => {
  localStorage.setItem("role", role);

  if (role === "student") {
    // ✅ mark student as logged in (used for notice popup)
    sessionStorage.setItem("student_logged_in", "true");
    sessionStorage.removeItem("admission_notice_seen"); // reset per login
    navigate("/student/dashboard");
  } else {
    navigate("/admin/dashboard");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-lg border p-8 space-y-6">

        {/* LOGO + TITLE */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10">
            <img
              src="/images/hero/logo.png"
              alt="DAVV Sarthi Logo"
              className="w-10 h-10 object-contain"
            />
          </div>

          <h1
            className="text-2xl font-bold tracking-wide text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            DAVV Sarthi
          </h1>

          <p className="text-sm text-muted-foreground">
            Choose your portal to continue
          </p>
        </div>

        {/* ROLE SELECTOR */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Login as
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                role === "student"
                  ? "bg-primary text-primary-foreground shadow"
                  : "hover:bg-muted"
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Student
            </button>

            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                role === "admin"
                  ? "bg-primary text-primary-foreground shadow"
                  : "hover:bg-muted"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              Admin
            </button>
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <Button
          className="w-full h-11 text-sm font-semibold tracking-wide"
          onClick={handleLogin}
        >
          Continue →
        </Button>

        {/* FOOTER TEXT */}
        <p className="text-center text-xs text-muted-foreground">
          DAVV Sarthi • Admission Guidance Platform
        </p>
      </div>
    </div>
  );
};

export default Login;
