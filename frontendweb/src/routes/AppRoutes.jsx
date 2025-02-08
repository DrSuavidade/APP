import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import RegisterPage from "../pages/RegisterPage";
import ConfirmRegisterPage from "../pages/ConfirmRegisterPage";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ForgotPasswordConfirm from "../pages/ForgotPasswordConfirm";
import HomePage from "../pages/HomePage";
import ReportsPage from "../pages/ReportsPage";
import ClubsPage from "../pages/ClubsPage";
import ScoutsViewPage from "../pages/ScoutsViewPage";
import ScoutsCreateEditPage from "../pages/ScoutsCreateEditPage";
import EventsViewPage from "../pages/EventsViewPage";
import AddScouterToEvent from "../pages/AddScouterToEvent";
import AddEventToScout from "../pages/AddEventToScout";
import EventsCreatePage from "../pages/EventsCreatePage";
import PlayersPage from "../pages/PlayersPage";
import PlayersCreatePage from "../pages/PlayersCreatePage";
import PlayersAddToEventPage from "../pages/PlayersAddToEventPage";
import TeamPage from "../pages/TeamPage";
import AddClubPage from "../pages/AddClubPage";
import AddTeamPage from "../pages/AddTeamPage";
import ShadowTeamPage from "../pages/ShadowTeamPage";
import Navbar from "../components/Navbar";
import ReportsHistory from "../pages/ReportsHistory";
import Page401 from "../pages/Page401";
import Microsite from "../pages/Microsite";
import ProtectedRoute from "../components/ProtectedRoute";
import Loader from "../components/Loader"; // Importando Loader
import "../CSS/ScrollBar.css";

const AppRoutes = () => {
  return <RoutesWithNavbar />;
};


// Gerenciando transição entre páginas
const RoutesWithNavbar = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location]);

  const hideNavbarRoutes = ["/login", "/register", "/register/confirm", "/forgot-password", "/forgot-password-confirm", "/microsite", "/erro401"];

  return (
    <div className="scroll-container">
      {loading && <Loader />} {/* Mostra o Loader ao mudar de rota */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <div className={`page-container ${loading ? "fade-out" : "fade-in"}`}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/confirm" element={<ConfirmRegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/forgot-password-confirm" element={<ForgotPasswordConfirm />} />
          <Route path="/microsite" element={<Microsite />} />
          <Route path="/erro401" element={<Page401 />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <ReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/history/:ID_JOGADORES"
            element={
              <ProtectedRoute>
                <ReportsHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clubs"
            element={
              <ProtectedRoute>
                <ClubsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scouts"
            element={
              <ProtectedRoute>
                <ScoutsViewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scouts/new"
            element={
              <ProtectedRoute>
                <ScoutsCreateEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <EventsViewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/AddScoutToEvent"
            element={
              <ProtectedRoute>
                <AddScouterToEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/AddEventToScout"
            element={
              <ProtectedRoute>
                <AddEventToScout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/new"
            element={
              <ProtectedRoute>
                <EventsCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/players/new"
            element={
              <ProtectedRoute>
                <PlayersCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/players/add-to-event"
            element={
              <ProtectedRoute>
                <PlayersAddToEventPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team"
            element={
              <ProtectedRoute>
                <TeamPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team/add-club"
            element={
              <ProtectedRoute>
                <AddClubPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team/add/:id_clube"
            element={
              <ProtectedRoute>
                <AddTeamPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team/shadow"
            element={
              <ProtectedRoute>
                <ShadowTeamPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/players"
            element={
              <ProtectedRoute>
                <PlayersPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AppRoutes;
