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

// ===== PLAYER PAGES ===== //
import App from "./App";
import AppOP from "./AppOP";
import AppOLD from "./AppOLD";
import PlayerHomeOLD from "./pages/Player/HomeOLD";
import PlayerHome from "./pages/Player/Home";
import PlayerBadges from "./pages/Player/Badges";
import PlayerAbout from "./pages/Player/About";
import PlayerAuthentication from "./pages/Player/Authentication";

// ===== HOST PAGES ===== //
import HostAuthentication from "./pages/Host/Authentication";
import HostBossesView from "./pages/Host/Bosses/View";
import HostBossesCreate from "./pages/Host/Bosses/Create";
import HostBossesEdit from "./pages/Host/Bosses/Edit";

import HostEventsView from "./pages/Host/Events/View";
import PlayerQR from "./pages/Player/QR";
import PlayerBossBattle from "./pages/Player/BossBattle";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <MessageProvider>
          <Routes>
            {/* ===== PLAYER ROUTES ===== */}
            <Route path="/" element={<App />}>
              <Route index element={<PlayerHome />} />
            </Route>

            <Route path="/qr" element={<App />}>
              <Route index element={<PlayerQR />} />
            </Route>

            <Route path="/boss-battle" element={<App />}>
              <Route index element={<PlayerBossBattle />} />
            </Route>

            <Route path="/badges" element={<App />}>
              <Route index element={<PlayerBadges />} />
            </Route>

            <Route path="/about" element={<App />}>
              <Route index element={<PlayerAbout />} />
            </Route>

            <Route path="/auth" element={<App />}>
              <Route index element={<PlayerAuthentication />} />
            </Route>

            {/* ===== HOST ROUTES ===== */}
            {/* Host Authentication */}
            <Route path="/host/auth" element={<App />}>
              <Route index element={<HostAuthentication />} />
            </Route>

            {/* Host Bosses/Create */}
            <Route path="/host/bosses/create" element={<AppOP />}>
              <Route index element={<HostBossesCreate />} />
            </Route>
            
            {/* Host Bosses Edit */}
            <Route path="/host/bosses/edit" element={<AppOP />}>
              <Route index element={<HostBossesEdit />} />
            </Route>

            {/* Host Bosses View */}
            <Route path="/host/bosses/view" element={<AppOP />}>
              <Route index element={<HostBossesView />} />
            </Route>

            {/* Host Events View */}
            <Route path="/host/events/view" element={<AppOP />}>
              <Route index element={<HostEventsView />} />
            </Route>

            {/* Host Events Assign Boss */}
            <Route path="/host/events/assign_boss" element={<AppOP />}>
              <Route index element={<HostEventsAssignBoss />} />
            </Route>

            {/* Host Events Boss Template */}
            <Route path="/host/events/boss_template" element={<AppOP />}>
              <Route index element={<HostEventsBossTemplate />} />
            </Route>

            {/* Old Home Page */}
            <Route path="/old" element={<AppOLD />}>
              <Route index element={<PlayerHomeOLD />} />
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