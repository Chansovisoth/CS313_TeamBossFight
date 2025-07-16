// ===== LIBRARIES ===== //
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ===== COMPONENTS ===== //
import { ThemeProvider } from "./theme/theme-provider";
import { AuthProvider } from "./context/AuthProvider";
// import { GuestRoute } from "./components/GuestRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MessageProvider } from "./context/MessageProvider";

// ===== STYLES ===== //
import "./index.css";

// ===== MASTER PAGES ===== //
import AppLanding from "./AppLanding";
import App from "./App";
import AppOP from "./AppOP";
import AppBattle from "./AppBattle";
import AppError from "./AppError";

// ===== LANDING PAGES ===== //
import Landing from "./pages/Landing";
import About from "./pages/About";
import Authentication from "./pages/Authentication";

// ===== PLAYER PAGES ===== //
import Error from "./pages/Error";
import PlayerHome from "./pages/Player/Home";
import PlayerBadges from "./pages/Player/Badges";
import PlayerLeaderboard from "./pages/Player/Leaderboard";
import PlayerProfile from "./pages/Player/Profile";
import PlayerQR from "./pages/Player/QR";
import PlayerBossPreview from "./pages/Player/BossPreview";
import PlayerBossBattle from "./pages/Player/BossBattle";

// ===== HOST PAGES ===== //
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
import HostEventsAllLeaderboard from "./pages/Host/Events/AllLeaderboard";
// Users
import HostUsersView from "./pages/Host/Users/View";
import HostUsersEdit from "./pages/Host/Users/Edit";
// QuestionBank - Categories
import HostCategoriesView from "./pages/Host/QuestionBank/Categories/View";
import HostCategoriesCreate from "./pages/Host/QuestionBank/Categories/Create";
import HostCategoriesEdit from "./pages/Host/QuestionBank/Categories/Edit";
// QuestionBank - Questions
import HostQuestionsIndex from "./pages/Host/QuestionBank/Questions/index";
import HostCategoriesQuesitonsView from "./pages/Host/QuestionBank/Questions/View";
import HostCategoriesQuestionsCreate from "./pages/Host/QuestionBank/Questions/Create";
import HostCategoriesQuestionsEdit from "./pages/Host/QuestionBank/Questions/Edit";
// Profile
import HostProfile from "./pages/Host/Profile/Profile";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <MessageProvider>
            <Routes>
              {/* ===== LANDING ROUTES ===== */}
              <Route path="/landing" element={<AppLanding />}>
                <Route index element={<Landing />} />
              </Route>

              <Route path="/about" element={<AppLanding />}>
                <Route index element={<About />} />
              </Route>

              <Route path="/auth" element={<AppLanding />}>
                <Route index element={<Authentication />} />
              </Route>

              {/* ===== PLAYER ROUTES ===== */}
              <Route path="/" element={<App />}>
                <Route index element={<PlayerHome />} />
              </Route>

              <Route path="/qr" element={<App />}>
                <Route index element={<PlayerQR />} />
              </Route>

              <Route path="/badges" element={<App />}>
                <Route index element={<PlayerBadges />} />
              </Route>

              <Route path="/leaderboard" element={<App />}>
                <Route index element={<PlayerLeaderboard />} />
              </Route>

              <Route path="/profile" element={<App />}>
                <Route index element={<PlayerProfile />} />
              </Route>

              <Route path="/boss-preview" element={<App />}>
                <Route index element={<PlayerBossPreview />} />
              </Route>

              <Route path="/boss-battle" element={<AppBattle />}>
                <Route index element={<PlayerBossBattle />} />
              </Route>

              {/* ===== HOST ROUTES ===== */}
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

              {/* Host Events All Leaderboard */}
              <Route path="/host/all_leaderboard" element={<AppOP />}>
                <Route index element={<HostEventsAllLeaderboard />} />
              </Route>

              {/* Host Users View */}
              <Route path="/host/users/view" element={<AppOP />}>
                <Route index element={<HostUsersView />} />
              </Route>

              {/* Host Users Edit */}
              <Route path="/host/users/edit" element={<AppOP />}>
                <Route index element={<HostUsersEdit />} />
              </Route>

              {/* Host QuestionBank Categories View */}
              <Route path="/host/questionbank/categories/view" element={<AppOP />}>
                <Route index element={<HostCategoriesView />} />
              </Route>

              {/* Host QuestionBank Categories Create */}
              <Route path="/host/questionbank/categories/create" element={<AppOP />}>
                <Route index element={<HostCategoriesCreate />} />
              </Route>

              {/* Host QuestionBank Categories Edit */}
              <Route path="/host/questionbank/categories/edit" element={<AppOP />}>
                <Route index element={<HostCategoriesEdit />} />
              </Route>

              {/* Host QuestionBank Questions Index */}
              <Route path="/host/questionbank/questions" element={<AppOP />}>
                <Route index element={<HostQuestionsIndex />} />
              </Route>

              {/* Host QuestionBank Questions View */}
              <Route path="/host/questionbank/questions/view" element={<AppOP />}>
                <Route index element={<HostCategoriesQuesitonsView />} />
              </Route>

              {/* Host QuestionBank Questions Create */}
              <Route path="/host/questionbank/questions/create" element={<AppOP />}>
                <Route index element={<HostCategoriesQuestionsCreate />} />
              </Route>

              {/* Host QuestionBank Questions Edit */}
              <Route path="/host/questionbank/questions/edit" element={<AppOP />}>
                <Route index element={<HostCategoriesQuestionsEdit />} />
              </Route>

              {/* Host Profile */}
              <Route path="/host/profile" element={<AppOP />}>
                <Route index element={<HostProfile />} />
              </Route>

              {/* Admin Events Create */}
              <Route path="/admin/events/create" element={<AppOP />}>
                <Route index element={<HostEventsCreate />} />
              </Route>

              {/* Admin Events Edit */}
              <Route path="/host/events/edit" element={<AppOP />}>
                <Route index element={<HostEventsEdit />} />
              </Route>

              {/* Admin Users View */}
              <Route path="/admin/users/view" element={<AppOP />}>
                <Route index element={<HostUsersView />} />
              </Route>

              {/* Admin Users Edit */}
              <Route path="/admin/users/edit" element={<AppOP />}>
                <Route index element={<HostUsersEdit />} />
              </Route>

              {/* 404 Error Route */}
              <Route path="/error" element={<Error />} />
              <Route path="*" element={<AppError />}>
                <Route path="*" element={<Error />} />
              </Route>
            </Routes>
          </MessageProvider>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);