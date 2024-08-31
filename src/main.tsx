import React from "react";
import ReactDOM from "react-dom/client";
import { App as AntdApp } from "antd";
import App from "./App.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AntdApp>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </AntdApp>
  </React.StrictMode>
);
