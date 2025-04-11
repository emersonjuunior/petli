import Lottie from "lottie-react";
import animation404 from "../assets/404-animation.json";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="w-full max-w-2xl h-[75vh] mx-auto flex flex-col items-center justify-center gap-3">
      <Lottie animationData={animation404} className="w-lg md:w-2xl px-2" />
      <h1 className="text-xl md:text-xl text-center font-medium max-w-9/10">
        Não conseguimos encontrar essa página. 🔍
      </h1>
      <Link to="/">
        <button className="text-lg font-medium shadow-md bg-primaryRed px-20 py-2 rounded-lg cursor-pointer duration-300 hover:bg-rose-700">Voltar</button>
      </Link>
    </main>
  );
};

export default NotFound;
