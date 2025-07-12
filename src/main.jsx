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

// ===== MASTER PAGES ===== //
import App from "./App";
import AppOP from "./AppOP";
import AppOLD from "./AppOLD";

// ===== PLAYER PAGES ===== //
import Error from "./pages/Error";
import PlayerHomeOLD from "./pages/Player/HomeOLD";
import PlayerHome from "./pages/Player/Home";
import PlayerBadges from "./pages/Player/Badges";
import PlayerAbout from "./pages/Player/About";
import PlayerAuthentication from "./pages/Player/Authentication";
import PlayerQR from "./pages/Player/QR";
import PlayerBossBattle from "./pages/Player/BossBattle";

// ===== HOST PAGES ===== //
import HostAuthentication from "./pages/Host/Authentication";

import HostBossesView from "./pages/Host/Bosses/View";
import HostBossesCreate from "./pages/Host/Bosses/Create";
import HostBossesEdit from "./pages/Host/Bosses/Edit";

import HostEventsView from "./pages/Host/Events/View";
import HostEventsAssignBoss from "./pages/Host/Events/AssignBoss";
import HostEventsBossTemplate from "./pages/Host/Events/BossTemplate";
import HostEventsCreate from "./pages/Host/Events/Create";
import HostEventsEdit from "./pages/Host/Events/Edit";

import HostProfileView from "./pages/Host/Profile/View";
import HostProfileEdit from "./pages/Host/Profile/Edit";


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

            {/* Host Events Create */}
            <Route path="/host/events/create" element={<AppOP />}>
              <Route index element={<HostEventsCreate />} />
            </Route>

            {/* Host Events Edit */}
            <Route path="/host/events/edit" element={<AppOP />}>
              <Route index element={<HostEventsEdit />} />
            </Route>

            {/* Host Profile View */}
            <Route path="/host/profile/view" element={<AppOP />}>
              <Route index element={<HostProfileView />} />
            </Route>

            {/* Host Profile Edit */}
            <Route path="/host/profile/edit" element={<AppOP />}>
              <Route index element={<HostProfileEdit />} />
            </Route>

            {/* Old Home Page */}
            <Route path="/old" element={<AppOLD />}>
              <Route index element={<PlayerHomeOLD />} />
            </Route>

            {/* 404 Error Route */}
            <Route path="*" element={<App />}>
              <Route path="*" element={<Error />} />
            </Route>
            
          </Routes>
        </MessageProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);