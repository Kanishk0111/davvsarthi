import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import FloatingChatbot from "@/components/chatbot/FloatingChatbot";



/* =======================
   STUDENT PAGES
======================= */
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Eligibility from "./pages/Eligibility";
import Prediction from "./pages/Prediction";
import Fees from "./pages/Fees";
import FAQ from "./pages/FAQ";
import Reservation from "./pages/Reservation";
import Cutoffs from "./pages/Cutoffs";
import Instructions from "./pages/Instructions";
import NotFound from "./pages/NotFound";
import Notify from "./pages/Notify";
import LiveSeatAvailability from "./pages/LiveSeatAvailability";
/* =======================
   ADMIN PAGES
======================= */
import AdminDashboard from "./admin/pages/Dashboard";
import AdminCourses from "./admin/pages/Courses";
import AdminEligibility from "./admin/pages/Eligibility";
import AdminFeeStructure from "./admin/pages/FeeStructure";
import AdminAdmissionProcess from "./admin/pages/AdmissionProcess";
import AdminPrograms from "./admin/pages/Programs";
import AdminSeats from "./admin/pages/Seats";
import AdminReservation from "./admin/pages/Reservation";
import AdminMeritRules from "./admin/pages/MeritRules";
import AdminInstructions from "./admin/pages/Instructions";
import AdminPreviousYearCutoffs from "./admin/pages/PreviousYearCutoffs";
import AdminNotFound from "./admin/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
  <Routes>
    {/* ROOT REDIRECT */}
    <Route path="/" element={<Navigate to="/login" replace />} />

    {/* LOGIN */}
    <Route path="/login" element={<Login />} />

    {/* =======================
        STUDENT ROUTES
    ======================= */}
    <Route
      path="/student/dashboard"
      element={
        <ProtectedRoute role="student">
          <Index />
        </ProtectedRoute>
      }
    />

    <Route path="/courses" element={<Courses />} />
    <Route path="/eligibility" element={<Eligibility />} />
    <Route path="/prediction" element={<Prediction />} />
    <Route path="/reservation" element={<Reservation />} />
    <Route path="/instructions" element={<Instructions />} />
    <Route path="/cutoffs" element={<Cutoffs />} />
    <Route path="/fees" element={<Fees />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/notify" element={<Notify />} />
    <Route path="/live-seat-availability" element={<LiveSeatAvailability />} /> 

    {/* =======================
        ADMIN ROUTES
    ======================= */}
    <Route
      path="/admin/dashboard"
      element={
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>
      }
    />

    <Route path="/admin/courses" element={<AdminCourses />} />
    <Route path="/admin/eligibility" element={<AdminEligibility />} />
    <Route path="/admin/fees" element={<AdminFeeStructure />} />
    <Route path="/admin/admission-process" element={<AdminAdmissionProcess />} />
    <Route path="/admin/programs" element={<AdminPrograms />} />
    <Route path="/admin/seats" element={<AdminSeats />} />
    <Route path="/admin/reservation" element={<AdminReservation />} />
    <Route path="/admin/merit-rules" element={<AdminMeritRules />} />
    <Route path="/admin/instructions" element={<AdminInstructions />} />
    <Route
      path="/admin/previous-year-cutoffs"
      element={<AdminPreviousYearCutoffs />}
    />
    <Route path="/admin/*" element={<AdminNotFound />} />

    {/* GLOBAL 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>

  {/*  GLOBAL FLOATING CHATBOT */}
  <FloatingChatbot />
</BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
