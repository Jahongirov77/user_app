// rrd imports
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// layouts
import MainLayout from "./layouts/MainLayout";

// components
import { ProtectedRoutes } from "./components";
import { Home, About, Login, Contact, Register } from "./pages";

// react redux
import { useDispatch, useSelector } from "react-redux";

// react imports
import { useEffect } from "react";

// slices
import { checkUser } from "./features/userSlice";

// pages

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
    },
  ]);

  useEffect(() => {
    dispatch(checkUser());
  }, []);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
