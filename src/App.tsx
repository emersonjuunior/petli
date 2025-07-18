import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUserContext } from "./context/UserContext";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import CreateUsernameModal from "./components/CreateUsernameModal";
import Scroll from "./components/Scroll";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Success from "./components/Success";
import CreatePet from "./pages/CreatePet";
import PetProfile from "./pages/PetProfile";
import EditProfile from "./pages/EditProfile";
import EditPet from "./pages/EditPet";
import MyAdoptions from "./pages/MyAdoptions";
import MyDonations from "./pages/MyDonations";
import WantAdopt from "./pages/WantAdopt";
import NeedAuth from "./components/NeedAuth";

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
      <Scroll />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/cadastro" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/:usernameId" element={<Profile />} />
        <Route path="/editar/:petId" element={user ? <EditPet /> : <Home />} />
        <Route path="/novo-pet" element={user ? <CreatePet /> : <NeedAuth />} />
        <Route path="/quero-adotar" element={<WantAdopt />} />
        <Route path="/pet/:petId" element={<PetProfile />} />
        <Route
          path="/editar-perfil"
          element={user ? <EditProfile /> : <Home />}
        />
        <Route
          path="/minhas-adocoes"
          element={user ? <MyAdoptions /> : <Home />}
        />
        <Route
          path="/minhas-doacoes"
          element={user ? <MyDonations /> : <Home />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
