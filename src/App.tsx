import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUserContext } from "./context/UserContext";

// components
import Header from "./components/Header";
import Loading from "./components/Loading";
import CreateUsernameModal from "./components/CreateUsernameModal";

// pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Success from "./components/Success";
import CreatePet from "./pages/CreatePet";
import PetProfile from "./pages/PetProfile";

function App() {
  const { user, displayName, loading, successNotification, successMsg } =
    useUserContext();
  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Header />
      {successNotification && <Success msg={successMsg} />}
      {user && displayName === "Google" && <CreateUsernameModal />}
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/novo-pet" element={user ? <CreatePet /> : <Home />} />
        <Route path="/pet/:petId" element={<PetProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
