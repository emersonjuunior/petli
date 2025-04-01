import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUserContext } from "./context/UserContext";

// components
import Header from "./components/Header";
import Loading from "./components/Loading";

// pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Success from "./components/Success";
import CreatePet from "./pages/CreatePet";

function App() {
  const { user, loading, successNotification, successMsg } = useUserContext();
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen min-w-screen bg-bgBlack text-textWhite">
      <BrowserRouter>
        <Header />
        {successNotification && <Success msg={successMsg} />}
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/novo-pet" element={<CreatePet />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
