import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUserContext } from "./context/UserContext";

// components
import Header from "./components/Header";

// pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  const { user, loading } = useUserContext();
  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="min-h-screen min-w-screen bg-bgBlack text-textWhite">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
