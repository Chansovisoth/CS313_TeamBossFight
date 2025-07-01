// ===== LIBRARIES ===== //
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// ===== LAYOUTS ===== //
import Nav from "@/layouts/NavOLD";
import Footer from "@/layouts/FooterOLD";

// ===== COMPONENTS ===== //
import { MessageDisplay } from "./components/MessageDisplay";
// import { useAuth } from "./context/useAuth";
// import { setupInterceptors } from "./api";



export default function AppOLD() {
  const navigate = useNavigate();
  
  // ===== AUTHENTICATION INTERCEPTORS ===== //
  // const auth = useAuth();
  // useEffect(() => {
  //   setupInterceptors(auth, navigate);
  // }, [auth, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      {/* ===== NAVBAR ===== */}
      <Nav />

      {/* ===== MESSAGE DISPLAY ===== */}
      <MessageDisplay />

      {/* ===== PAGE CONTENT (Outlet for route rendering) ===== */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
