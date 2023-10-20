import "./App.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebSocketProvider from "./config/WebSocket";
import PrivateRoute from "./components/routes/PrivateRoute";
import Layout from "./layouts/Layout";
import AussieSlots from "./pages/AussieSlots";
import Cases from "./pages/Cases";
import Dice from "./pages/Dice";
import Faucet from "./pages/Faucet";
import Home from "./pages/Home";
import Limbo from "./pages/Limbo";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/profile/Settings";
import Roulette from "./pages/Roulette";
import Hilo from "./pages/Hilo";
import Bonuses from "./pages/Bonuses";
import Affiliates from "./pages/Affiliates";
import Fairness from "./pages/Fairness";
import Support from "./pages/Support";
import Reload from "./pages/Reload";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminEditUser from "./pages/admin/AdminEditUser";
import AdminBets from "./pages/admin/AdminBets";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminP2PTransactions from "./pages/admin/AdminP2PTransactions";
import AdminSupport from "./pages/admin/AdminSupport";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminGames from "./pages/admin/AdminGames";
import Faq from "./pages/Faq";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ChangePassword from "./pages/ChangePassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import Install from "./pages/Install";
import Crash from "./pages/Crash";

import LegacyOfDead from "./components/Casino/LegacyOfDead";

import { Notifications } from "react-push-notification";

// let vh = window.innerHeight * 0.01;
// // Then we set the value in the --vh custom property to the root of the document
// document.documentElement.style.setProperty("--vh", `${vh}px`);

// window.addEventListener("resize", () => {
//   // We execute the same script as before
//   let vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty("--vh", `${vh}px`);
// });

function App() {
  return (
    <>
      <Notifications />
      <WebSocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/provably-fair" element={<Fairness />} />
              <Route path="/support" element={<Support />} />
              <Route path="/free/faucet" element={<Faucet />} />

              <Route path="/casino/aussie-slots" element={<AussieSlots />} />
              <Route path="/casino/case-opening" element={<Cases />} />
              <Route path="/casino/hash-dice" element={<Dice />} />
              <Route path="/casino/roulette" element={<Roulette />} />
              <Route path="/casino/limbo" element={<Limbo />} />
              <Route path="/casino/hilo" element={<Hilo />} />
              <Route path="/casino/crash" element={<Crash />} />
              <Route element={<PrivateRoute />}>
                <Route path="/casino/LegacyOfDead" element={<LegacyOfDead />} /> // for test 
                <Route path="/bonuses" element={<Bonuses />} />
                <Route path="/affiliates" element={<Affiliates />} />
                <Route path="/profile" element={<Profile />} exact />
                <Route path="/settings" element={<Settings />} exact />
              </Route>
              <Route path="/faq" element={<Faq />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
            </Route>
            <Route path="/reload" element={<Reload />} />
            <Route path="/install" element={<Install />} />
            <Route
              path="/change-password/:token"
              element={<ChangePassword />}
            />
            <Route path="/confirm-account/:id" element={<ConfirmAccount />} />
            <Route path="/admin-panel" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="users/:id" element={<AdminEditUser />} />
              <Route path="bets" element={<AdminBets />} />
              <Route path="transactions" element={<AdminTransactions />} />
              <Route
                path="transactions-p2p"
                element={<AdminP2PTransactions />}
              />
              <Route path="support" element={<AdminSupport />} />
              <Route path="payment-methods" element={<AdminPayments />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="games" element={<AdminGames />} />
            </Route>
          </Routes>
        </Router>
      </WebSocketProvider>
    </>
  );
}

export default App;
