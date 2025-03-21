import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Register from "./pages/Register";

function App() {
  return (
    <div className="min-h-screen min-w-screen pt-[100px] bg-bgBlack text-textWhite">
      <BrowserRouter>
        <Routes>
          <Route path="/cadastro" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
