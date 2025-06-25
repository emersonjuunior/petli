import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { PetProvider } from "./context/PetContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <PetProvider>
        <App />
      </PetProvider>
    </UserProvider>
  </StrictMode>
);
