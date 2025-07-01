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
import Login from "./pages/Login";
// import Authentication from "./pages/Authentication";



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

            <Route path="/badges" element={<App />}>
              <Route index element={<MainBadges />} />
            </Route>

            <Route path="/about" element={<App />}>
              <Route index element={<MainLanding />} />
            </Route>

            <Route path="/login" element={<App />}>
              <Route index element={<Login />} />
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