import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const MyUserInfo = lazy(() => import("@/pages/My/UserInfo/index.jsx"));
const MyUpdatePwd = lazy(() => import("@/pages/My/UpdatePwd/index.jsx"));
const MyUpdateAvatar = lazy(() => import("@/pages/My/UpdateAvatar/index.jsx"));

const MyInformation = () => {
  return (
    <Routes>
      <Route path="/userinfo" element={<MyUserInfo />} />
      <Route path="/updatepwd" element={<MyUpdatePwd />} />
      <Route path="/update/avatar" element={<MyUpdateAvatar />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default MyInformation;
