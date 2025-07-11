// ===== LIBRARIES ===== //
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// ===== LAYOUTS ===== //
// import Nav from "@/layouts/Nav";
import Footer from "@/layouts/Footer";

// ===== COMPONENTS ===== //
import { MessageDisplay } from "./components/MessageDisplay";
// import { useAuth } from "./context/useAuth";
// import { setupInterceptors } from "./api";



export default function App() {
  // const navigate = useNavigate();
  
  // ===== AUTHENTICATION INTERCEPTORS ===== //
  // const auth = useAuth();
  // useEffect(() => {
  //   setupInterceptors(auth, navigate);
  // }, [auth, navigate]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* ===== NAVBAR ===== */}
      

      {/* ===== MESSAGE DISPLAY ===== */}
      <MessageDisplay />

      {/* ===== PAGE CONTENT (Outlet for route rendering) ===== */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
