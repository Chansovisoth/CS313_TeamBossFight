// ===== LIBRARIES ===== //
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// ===== SECTIONS ===== //
import Nav from "@/pages/Nav1";
import Footer from "@/pages/Footer1";

// ===== COMPONENTS ===== //
import { MessageDisplay } from "./components/MessageDisplay";
// import { useAuth } from "./context/useAuth";
// import { setupInterceptors } from "./api";



export default function App() {
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
