import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import PetCard from "../components/PetCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Início | Petli</title>
        <meta
          name="description"
          content="A Petli é o lugar para você encontrar seu novo melhor amigo. O amor não se compra, se adota."
        />
      </Helmet>
      <main className="min-h-[3000px]">
        <h1>Home</h1>
        <Link to="/pet/magnolia-ALWm">Clique aqui</Link>

       
      </main>
    </>
  );
};

export default Home;
