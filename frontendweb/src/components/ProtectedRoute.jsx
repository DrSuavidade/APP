import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = Cookies.get('token'); // Verifica se o token existe nos cookies

  // Se não houver token, redireciona para a página de login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se o token existir, renderiza o componente filho (a rota protegida)
  return children;
};

export default ProtectedRoute;