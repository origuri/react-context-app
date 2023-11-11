import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { OrderContextProvider } from "./context/OrderContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OrderContextProvider>
      <App />
    </OrderContextProvider>
  </React.StrictMode>
);
