import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import LoadingScreen from "./components/common/Loading/LoadingScreen";
import "./index.css";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Suspense fallback={<LoadingScreen />}>
      <App />
    </Suspense>
  </BrowserRouter>
);
