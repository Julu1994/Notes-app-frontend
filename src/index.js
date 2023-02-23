import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/mui-theme";
import ContextProvider from "./store/ContextProvider";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ContextProvider>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <App />
                    <Toaster
                        position="top-right"
                        toastOptions={{ duration: 3500 }}
                    />
                </ThemeProvider>
            </BrowserRouter>
        </ContextProvider>
    </React.StrictMode>
);
