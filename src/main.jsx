// ===== LIBRARIES ===== //
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ===== COMPONENTS ===== //
import { ThemeProvider } from "./theme/theme-provider";
// import { AuthProvider } from "./context/AuthContext";
// import { GuestRoute } from "./components/GuestRoute";
// import { ProtectedRoute } from "./components/ProtectedRoute";
import { MessageProvider } from "./context/MessageProvider";

// ===== STYLES ===== //
import "./index.css";

// ===== PAGES ===== //
import App from "./App";
import AppOLD from "./AppOLD";
import MainLandingOLD from "./pages/MainLandingOLD";
import MainLanding from "./pages/MainLanding";
import MainBadges from "./pages/MainBadges";
import MainAbout from "./pages/MainAbout";

import Authentication from "./pages/Authentication";

// ===== HOST PAGES ===== //

import HostAuthentication from "./pages/Host/Authentication";
import HostBossesCreate from "./pages/Host/Bosses/Create";


import MainQR from "./pages/MainQR";
import BossBattle from "./pages/BossBattle";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <MessageProvider>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<App />}>
              <Route index element={<MainLanding />} />
            </Route>

            <Route path="/qr" element={<App />}>
              <Route index element={<MainQR />} />
            </Route>

            <Route path="/boss-battle" element={<App />}>
              <Route index element={<BossBattle />} />
            </Route>

            <Route path="/badges" element={<App />}>
              <Route index element={<MainBadges />} />
            </Route>

            <Route path="/about" element={<App />}>
              <Route index element={<MainAbout />} />
            </Route>

            <Route path="/auth" element={<App />}>
              <Route index element={<Authentication />} />
            </Route>


            {/* Host Authentication */}
            <Route path="/host/auth" element={<App />}>
              <Route index element={<HostAuthentication />} />
            </Route>

            {/* Host Bosses/Create */}
            <Route path="/host/bosses/create" element={<App />}>
              <Route index element={<HostBossesCreate />} />
            </Route>


            

            {/* Old Landing Page */}
            <Route path="/old" element={<AppOLD />}>
              <Route index element={<MainLandingOLD />} />
            </Route>

            {/* 404 Error Route */}
            <Route
              path="*"
              element={
                <div className="text-center font-bold p-8">ERROR 404: PAGE DOES NOT EXIST</div>
              }
            />
          </Routes>
        </MessageProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);