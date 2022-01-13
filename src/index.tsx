import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as SupabaseProvider } from "react-supabase";
import { client as supabaseClient } from "./services/supabase";
import App from "./App";

ReactDOM.render(
  <StrictMode>
    <ChakraProvider>
      <SupabaseProvider value={supabaseClient}>
        <App />
      </SupabaseProvider>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById("root")
);
