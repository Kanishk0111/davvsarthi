"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Users,
  BookOpen,
  Award,
  GraduationCap,
  Megaphone,
  X,
  Info,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

/* ================= DATA ================= */

const stats = [
  { icon: Users, value: "50,000+", label: "Students" },
  { icon: BookOpen, value: "120+", label: "Courses" },
  { icon: Award, value: "A+", label: "NAAC Grade" },
];

const DARK_BLUE = "#0B3C5D";

const IMPORTANT_DATES = {
  UG: new Date("2026-06-15T23:59:59"),
  PG: new Date("2026-06-30T23:59:59"),
};

const MarqueeItem = ({ text }: { text: string }) => {
  return (
    <div
      className="
        flex items-center
        px-5 py-2
        rounded-full
        border
        text-sm font-medium
        whitespace-nowrap
        transition-all
        hover:shadow-md
      "
      style={{
        backgroundColor: "rgba(11, 60, 93, 0.06)", // DARK_BLUE tint
        borderColor: "rgba(11, 60, 93, 0.2)",
        color: "#0B3C5D",
      }}
    >
      <span className="mr-2 text-[10px] opacity-70">●</span>
      {text}
    </div>
  );
};


/* ================= UTILS ================= */

const getCountdown = (target: Date) => {
  const diff = target.getTime() - new Date().getTime();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
};

/* ================= PAGE ================= */

const Index = () => {
  const [showNotice, setShowNotice] = useState(false);
  const [programType, setProgramType] = useState<"UG" | "PG">("UG");
  const [countdown, setCountdown] = useState(getCountdown(IMPORTANT_DATES.UG));

  useEffect(() => {
  const isStudentLoggedIn =
    sessionStorage.getItem("student_logged_in") === "true";

  const hasSeenNotice =
    sessionStorage.getItem("admission_notice_seen") === "true";

  if (isStudentLoggedIn && !hasSeenNotice) {
    setShowNotice(true);
  }
}, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(IMPORTANT_DATES[programType]));
    }, 60000);
    return () => clearInterval(interval);
  }, [programType]);

  const closeNotice = () => {
    sessionStorage.setItem("admission_notice_seen", "true");
    setShowNotice(false);
  };

  return (
    <Layout>
      {/* ================= ADMISSION NOTICE POPUP ================= */}
      {showNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeNotice}
          />

          <div className="relative bg-white rounded-2xl shadow-2xl w-[92%] max-w-lg p-6 space-y-6 animate-slide-up">
            <button
              onClick={closeNotice}
              className="absolute top-4 right-4 text-muted-foreground"
            >
              <X />
            </button>

            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center animate-pulse"
                style={{ backgroundColor: `${DARK_BLUE}15` }}
              >
                <Info style={{ color: DARK_BLUE }} />
              </div>
              <h2 className="text-lg font-semibold" style={{ color: DARK_BLUE }}>
                Admission Notice – 2025
              </h2>
            </div>

            {/* UG / PG Toggle */}
            <div className="flex gap-2">
              {(["UG", "PG"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setProgramType(type);
                    setCountdown(getCountdown(IMPORTANT_DATES[type]));
                  }}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
                    programType === type
                      ? "text-white"
                      : "border text-muted-foreground"
                  }`}
                  style={
                    programType === type
                      ? { backgroundColor: DARK_BLUE }
                      : {}
                  }
                >
                  {type} Programs
                </button>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              Admissions for <strong>{programType}</strong> programmes will be
              conducted as per CUET guidelines and university merit rules.
            </p>

            {countdown && (
              <div className="bg-muted/40 rounded-xl p-4 flex items-center gap-3">
                <Clock className="text-primary" />
                <div>
                  <p className="font-semibold text-sm">
                    Last Date to Apply
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {countdown.days} days · {countdown.hours} hrs ·{" "}
                    {countdown.minutes} mins remaining
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Link to="/Instructions">
                <Button
                  size="sm"
                  style={{ backgroundColor: DARK_BLUE }}
                  onClick={closeNotice}
                >
                  View Instructions
                </Button>
              </Link>
              <Button size="sm" variant="outline" onClick={closeNotice}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">

        {/* Announcement Bar */}
        <div
          className="w-full py-3 px-4 flex items-center justify-center gap-3 text-white text-sm md:text-base"
          style={{ backgroundColor: DARK_BLUE }}
        >
          <Megaphone className="w-5 h-5" />
          Admissions Open 2025 · UG & PG via CUET
        </div>

        <div
          className="relative min-h-[85vh] flex items-center"
          style={{
            backgroundImage: "url('/images/hero/college3.avif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white/60" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">

              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/80 border mb-8">
                <GraduationCap className="w-6 h-6" style={{ color: DARK_BLUE }} />
                <span className="font-semibold" style={{ color: DARK_BLUE }}>
                  Welcome to DAVV Sarthi
                </span>
              </div>

              <h1
                className="text-4xl md:text-6xl font-bold mb-6"
                style={{ color: DARK_BLUE }}
              >
                Your Journey to DAVV Starts Here
              </h1>

              <p
                className="text-lg mb-10 max-w-2xl mx-auto"
                style={{ color: `${DARK_BLUE}CC` }}
              >
                One platform to explore courses, understand eligibility, follow
                admission steps, and track important dates for DAVV admissions.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">
                <Link to="/eligibility">
                  <Button size="lg" style={{ backgroundColor: DARK_BLUE }}>
                    Check Eligibility <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <Link to="/prediction">
                  <Button size="lg" style={{ backgroundColor: DARK_BLUE }}>
                    Predict Admission <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <Link to="/courses">
                  <Button size="lg" variant="outline">
                    Explore Courses <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/70 border rounded-2xl p-4 text-center"
                  >
                    <stat.icon
                      className="w-6 h-6 mx-auto mb-2"
                      style={{ color: DARK_BLUE }}
                    />
                    <div className="font-bold text-xl">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
     {/* ================= ADMISSION UPDATES MARQUEE ================= */}
<section
  className="py-5 border-t border-b overflow-hidden"
  style={{
    background:
      "linear-gradient(90deg, rgba(11,60,93,0.04), rgba(11,60,93,0.02), rgba(11,60,93,0.04))",
    borderColor: "rgba(11,60,93,0.15)",
  }}
>
  <div className="relative w-full">

    <div className="flex overflow-hidden">
      <div className="marquee gap-6">

        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-6">

            <MarqueeItem text="Admissions 2025 open via CUET (UG / PG)" />
            <MarqueeItem text="Centralized counseling as per DAVV norms" />
            <MarqueeItem text="Previous year cutoffs available" />
            <MarqueeItem text="Document verification mandatory" />
            <MarqueeItem text="Merit based seat allotment" />
            <MarqueeItem text="Multiple counseling rounds" />

          </div>
        ))}
      </div>
    </div>

  </div>
</section>

    </Layout>
  );
};

export default Index;
