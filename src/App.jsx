import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Lider from "./pages/Lider/Lider";
import ProtectedRoute from "./components/ProtectedRoute";
import Professor from "./pages/Professor/Professor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute perfil="COORDENACAO">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lider"
          element={
            <ProtectedRoute>
              <Lider />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professor"
          element={
            <ProtectedRoute>
              <Professor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;