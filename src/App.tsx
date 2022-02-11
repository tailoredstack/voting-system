import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@components/Layout";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Poll } from "./pages/Poll";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/poll" element={<Poll />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
