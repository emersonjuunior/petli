import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <section className="relative min-h-[92vh] w-screen bg-[url('/kittens.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="absolute inset-0 bg-bgBlack/91 backdrop-blur-[3px] border-b-[#363636] border-b-2"></div>
      <div className="relative z-10 h-full min-h-[92vh] w-full max-w-7xl mx-auto pt-[13%]">
        <h1 className="text-6xl mb-4 font-medium">
          Adote um novo{" "}
          <Typewriter
            words={["amigo.", "companheiro.", "amor."]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={300}
            deleteSpeed={200}
            delaySpeed={1500}
          />
        </h1>
        <p className="text-2xl max-w-[700px] mb-8">
          Encontre seu novo melhor amigo ou ajude um bichinho a encontrar um lar. Dê um final feliz para quem só
          precisa de amor.
        </p>
        <div className="flex items-center gap-8">
          <button className="font-semibold w-[250px] h-[56px] text-slate-900 bg-white border-white border-2 rounded-2xl tracking-widest uppercase font-mont duration-300 cursor-pointer hover:bg-transparent hover:text-white shadow-lg">
            Quero Doar
          </button>
          <button className="border-accentBlue font-mont w-[250px] h-[56px] cursor-pointer rounded-lg pet-btn inline-block font-bold text-white border-3 relative overflow-hidden z-10 bg-transparent">
            <span className="relative z-10 uppercase tracking-wider">
              Quero Adotar
            </span>
            <span className="absolute button-span inset-0 bg-accentBlue transform -translate-x-full transition-all duration-300 z-0"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
