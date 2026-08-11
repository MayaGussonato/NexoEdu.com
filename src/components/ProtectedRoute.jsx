import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, perfil, perfis }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  if (perfil && usuario.perfil !== perfil) {
    return <Navigate to="/" replace />;
  }

  if (perfis && !perfis.includes(usuario.perfil)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;