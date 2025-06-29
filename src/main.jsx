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
import MainLanding from "./pages/MainLanding";
// import Authentication from "./pages/Authentication";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <MessageProvider>
          <Routes>
            <Route path="/" element={<App />}>

              <Route path="/" element={<MainLanding />} />

              {/* <Route
                path="auth"
                element={
                  <GuestRoute>
                    <Authentication />
                  </GuestRoute>
                }
              /> */}

              <Route
                path="*"
                element={
                  <div className="text-center font-bold">ERROR 404: PAGE DOES NOT EXIST</div>
                }
              />
            </Route>

          </Routes>
        </MessageProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);