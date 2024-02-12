import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import {
  LoginScreen,
  RegisterScreen,
  DashboardScreen,
  NotFound,
} from "./screens";
import { PublicRoute, PrivateRoute } from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/*" element={<App />}>
      <Route element={<PublicRoute />}>
        <Route index element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="dashboard" element={<DashboardScreen />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
