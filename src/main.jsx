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
import AppError from "./AppError";

// ===== PLAYER PAGES ===== //
import Error from "./pages/Error";
import PlayerAuthentication from "./pages/Player/Authentication";
import PlayerHome from "./pages/Player/Home";
import PlayerBadges from "./pages/Player/Badges";
import PlayerLeaderboard from "./pages/Player/Leaderboard";
import PlayerAbout from "./pages/Player/About";
import PlayerQR from "./pages/Player/QR";
// import PlayerBossPreview from "./pages/Player/BossPreview";
import PlayerBossBattle from "./pages/Player/BossBattle";

// ===== HOST PAGES ===== //
import HostAuthentication from "./pages/Host/Authentication";
// Bosses
import HostBossesView from "./pages/Host/Bosses/View";
import HostBossesCreate from "./pages/Host/Bosses/Create";
import HostBossesEdit from "./pages/Host/Bosses/Edit";
// Events
import HostEventsView from "./pages/Host/Events/View";
import HostEventsAssignBoss from "./pages/Host/Events/AssignBoss";
import HostEventsBossTemplate from "./pages/Host/Events/BossTemplate";
import HostEventsCreate from "./pages/Host/Events/Create";
import HostEventsEdit from "./pages/Host/Events/Edit";
import HostEventsPlayerbadges from "./pages/Host/Events/Playerbadges";
import HostEventsPlayerBadgesEdit from "./pages/Host/Events/Playerbadgesedit";
import HostEventsLeaderboard from "./pages/Host/Events/Leaderboard";
// Users
import HostUsersView from "./pages/Host/Users/View";
import HostUsersEdit from "./pages/Host/Users/Edit";
// Categories
import HostCategoriesView from "./pages/Host/Categories/View";
import HostCategoriesCreate from "./pages/Host/Categories/Create";
import HostCategoriesEdit from "./pages/Host/Categories/Edit";
// Categories Questions
import HostCategoriesQuesitonsView from "./pages/Host/Categories/Questions/View";
import HostCategoriesQuestionsCreate from "./pages/Host/Categories/Questions/Create";
import HostCategoriesQuestionsEdit from "./pages/Host/Categories/Questions/Edit";
// Profile
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

            <Route path="/leaderboard" element={<App />}>
              <Route index element={<PlayerLeaderboard />} />
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

            {/* Host Events Player Badges */}
            <Route path="/host/events/player_badges" element={<AppOP />}>
              <Route index element={<HostEventsPlayerbadges />} />
            </Route>

            {/* Host Events Player Badges Edit */}
            <Route path="/host/events/player_badges_edit" element={<AppOP />}>
              <Route index element={<HostEventsPlayerBadgesEdit />} />
            </Route>

            {/* Host Events Leaderboard */}
            <Route path="/host/events/leaderboard" element={<AppOP />}>
              <Route index element={<HostEventsLeaderboard />} />
            </Route>

            {/* Host Users View */}
            <Route path="/host/users/view" element={<AppOP />}>
              <Route index element={<HostUsersView />} />
            </Route>

            {/* Host Users Edit */}
            <Route path="/host/users/edit" element={<AppOP />}>
              <Route index element={<HostUsersEdit />} />
            </Route>

            
            {/* Host Categories View */}
            <Route path="/host/categories/view" element={<AppOP />}>
              <Route index element={<HostCategoriesView />} />
            </Route>

            {/* Host Categories Create */}
            <Route path="/host/categories/create" element={<AppOP />}>
              <Route index element={<HostCategoriesCreate />} />
            </Route>

            {/* Host Categories Edit */}
            <Route path="/host/categories/edit" element={<AppOP />}>
              <Route index element={<HostCategoriesEdit />} />
            </Route>

            {/* Host Categories Questions View */}
            <Route path="/host/categories/questions/view" element={<AppOP />}>
              <Route index element={<HostCategoriesQuesitonsView />} />
            </Route>

            {/* Host Categories Questions Create */}
            <Route path="/host/categories/questions/create" element={<AppOP />}>
              <Route index element={<HostCategoriesQuestionsCreate />} />
            </Route>

            {/* Host Categories Questions Edit */}
            <Route path="/host/categories/questions/edit" element={<AppOP />}>
              <Route index element={<HostCategoriesQuestionsEdit />} />
            </Route>

            {/* Host Profile View */}
            <Route path="/host/profile/view" element={<AppOP />}>
              <Route index element={<HostProfileView />} />
            </Route>

            {/* Host Profile Edit */}
            <Route path="/host/profile/edit" element={<AppOP />}>
              <Route index element={<HostProfileEdit />} />
            </Route>

            {/* 404 Error Route */}
            <Route path="*" element={<AppError />}>
              <Route path="*" element={<Error />} />
            </Route>
            
          </Routes>
        </MessageProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);