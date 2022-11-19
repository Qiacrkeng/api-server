import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";

const Login = lazy(() => import("./pages/Login/index.jsx"));
const Article = lazy(() => import("@/pages/Article/index.jsx"));
const LayoutApp = lazy(() => import("@/pages/Layout/index.jsx"));
const Home = lazy(() => import("@/pages/Home/index.jsx"));
const AuthRoute = lazy(() => import("@/components/AuthRoute/index.jsx"));
const My = lazy(() => import("@/pages/My/index.jsx"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "tranlate(-50%,-50%)",
              textAlign: "center",
            }}
          >
            Loading...
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <LayoutApp />
              </AuthRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/article/*" element={<Article />} />
            <Route path="/my/*" element={<My />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
