import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import NewApp from "./protectedRoutesExp/App2";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App3 from "./example2/App3";

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider> */}
    {/* <BrowserRouter>
      <NewApp />
    </BrowserRouter> */}
    <App3 />
  </React.StrictMode>
);
