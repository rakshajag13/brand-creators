import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import AppBar from "./AppBar";
import { Login } from "./Login";
import { Register } from "./Register";
import Contacts from "./Contacts";
import PaymentComponent from "./Payments";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "context/AuthContext";
import { ResetPassword } from "./ResetPassword";
import { ForgotPassword } from "./ForgotPassword";
import { ContactProvider } from "context/ContactContext";
import { BrandSignup } from "./brandSignup";
import { Settings } from "./Settings";
import CreatorDashboard from "./Creators/CreatorDashboard";

const App = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = user?.role;
  const handleRedirect = React.useCallback(() => {
    if (user?.role === "CREATOR") {
      return navigate("/dashboard");
    }
    navigate("/contacts");
  }, [navigate, user]);


  // Define route configurations
  const routes = {
    public: [
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/brand-signup",
        element: <BrandSignup />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "/login",
        element: <Login />,
      },

    ],
    protected: userRole === "CREATOR" ? [{
      path: "/dashboard",
      element: <CreatorDashboard />
    }] : [
      {
        path: "/contacts",
        element: (
          <ContactProvider>
            <Contacts />
          </ContactProvider>
        ),
      },
      {
        path: "/payments",
        element: <PaymentComponent />,
      },
      {
        path: "/settings",
        element: <Settings />
      },

    ],
  };

  useEffect(() => {
    const publicPaths = routes.public.map((route) => route.path);
    if (isLoggedIn() && publicPaths.includes(location.pathname)) {
      handleRedirect();
      //navigate("/contacts");
    }
  }, [handleRedirect, isLoggedIn, location.pathname, navigate, routes.public]);

  return (
    <div>
      {isLoggedIn() && <AppBar />}
      <Routes>
        {/* Public Routes */}
        {routes.public.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              isLoggedIn() ? <Navigate to={user?.role === "CREATOR" ? "/dashboard" : "/contacts"} replace /> : element
            }
          />
        ))}

        {/* Protected Routes */}
        {routes.protected.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute>{element}</ProtectedRoute>}
          />
        ))}

        {/* Catch-All Route */}
        <Route
          path="*"
          element={
            isLoggedIn() ? (
              <Navigate to={user?.role === "CREATOR" ? "/dashboard" : "/contacts"} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
