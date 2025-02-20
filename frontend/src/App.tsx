import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/layout";

import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/slices/loginSlice";
import {
  DashboardPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  QueueDetailsPage,
  QueueListPage,
  SignUpPage,
} from "./pages";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(login(JSON.parse(user)));
    }
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {/* PUBLIC ROUTES */}
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route index element={<DashboardPage />} />
          <Route path=":id">
            <Route index element={<QueueListPage />} />
            <Route path=":subId" element={<QueueDetailsPage />} />
            <Route />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
