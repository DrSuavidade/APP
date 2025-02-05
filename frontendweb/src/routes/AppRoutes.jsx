import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import ConfirmRegisterPage from '../pages/ConfirmRegisterPage';
import LoginPage from '../pages/LoginPage';
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ForgotPasswordConfirm from "../pages/ForgotPasswordConfirm";
import HomePage from '../pages/HomePage';
import ReportsPage from '../pages/ReportsPage';
import ClubsPage from '../pages/ClubsPage';
import ScoutsViewPage from '../pages/ScoutsViewPage';
import ScoutsCreateEditPage from '../pages/ScoutsCreateEditPage';
import EventsViewPage from '../pages/EventsViewPage';
import AddScouterToEvent from '../pages/AddScouterToEvent';
import AddEventToScout from '../pages/AddEventToScout';
import EventsCreatePage from '../pages/EventsCreatePage';
import PlayersPage from '../pages/PlayersPage';
import PlayersCreatePage from '../pages/PlayersCreatePage';
import PlayersEditPage from '../pages/PlayersEditPage';
import PlayersReportsPage from '../pages/PlayersReportsPage';
import PlayersAddToEventPage from '../pages/PlayersAddToEventPage';
import TeamPage from '../pages/TeamPage';
import AddClubPage from '../pages/AddClubPage';
import AddTeamPage from '../pages/AddTeamPage';
import ShadowTeamPage from '../pages/ShadowTeamPage';
import Navbar from '../components/Navbar';
import ReportsHistory from '../pages/ReportsHistory';
import "../CSS/ScrollBar.css";

const AppRoutes = () => {
  return (
    <Router>
      <RoutesWithNavbar />
    </Router>
  );
};

// Componente auxiliar para gerenciar a Navbar e a Scrollbar
const RoutesWithNavbar = () => {
  const location = useLocation();

  // Rotas onde a Navbar NÃO deve aparecer
  const hideNavbarRoutes = ["/login", "/register", "/register/confirm", "/forgot-password", "/forgot-password-confirm"];

  return (
    <div className="scroll-container"> {/* Aplicando a classe da scrollbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/confirm" element={<ConfirmRegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/forgot-password-confirm" element={<ForgotPasswordConfirm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/reports/history/:ID_JOGADORES" element={<ReportsHistory />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/scouts" element={<ScoutsViewPage />} />
        <Route path="/scouts/new" element={<ScoutsCreateEditPage />} />
        <Route path="/events" element={<EventsViewPage />} />
        <Route path="/events/AddScoutToEvent" element={<AddScouterToEvent />} />
        <Route path="/events/AddEventToScout" element={<AddEventToScout />} />
        <Route path="/events/new" element={<EventsCreatePage />} />
        <Route path="/players/new" element={<PlayersCreatePage />} />
        <Route path="/players/:id/edit" element={<PlayersEditPage />} />
        <Route path="/players/reports" element={<PlayersReportsPage />} />
        <Route path="/players/add-to-event" element={<PlayersAddToEventPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/team/add-club" element={<AddClubPage />} />
        <Route path="/team/add/:id_clube" element={<AddTeamPage />} />
        <Route path="/team/shadow" element={<ShadowTeamPage />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/clubs/:ID_USER" element={<ClubsPage />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
