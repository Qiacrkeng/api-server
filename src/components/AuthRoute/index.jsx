import { getToken } from "@/utils/token.js";
import React from "react";
import { Navigate } from "react-router-dom";
/**
 *
 * @param {{children:import("react").FunctionComponent}} param0
 * @returns
 */
const AuthRoute = ({ children }) => {
  const token = getToken();
  if (token) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
};
export default AuthRoute;
