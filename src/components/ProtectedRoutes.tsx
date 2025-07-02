import React, { ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = localStorage.getItem("aboda-shop-login");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export const GuestRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = localStorage.getItem("aboda-shop-login");
  return !isLoggedIn ? children : <Navigate to="/" replace />;
};
