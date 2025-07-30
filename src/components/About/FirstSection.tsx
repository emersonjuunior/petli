import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const FirstSection = () => {
  const [imgLoad, setImgLoad] = useState(true);

  return (
    <section className="min-h-fit px-4 border-b-[#363636] border-b-2 pt-6 md:pt-10 pb-12 md:pb-15">
      <div className="w-full max-w-7xl mx-auto flex items-center md:gap-4 lg:gap-5 xl:gap-6">
        <aside className="hidden md:block">
          {imgLoad && (
            <div className="animate-pulse w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] xl:w-xl xl:h-[576px] bg-[#323232] rounded-xl"></div>
          )}
          <div
            className={`${
              imgLoad ? "hidden" : ""
            } flex items-center justify-center w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] xl:w-xl xl:h-[576px]`}
          >
            <img
              onLoad={() => setImgLoad(false)}
              src="/about-illustration.png"
              alt="Ilustração de pessoas adotando animais de estimação."
              className="object-cover"
            />
          </div>
        </aside>
        <div className="flex-1 overflow-hidden max-w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-widest mb-3 md:mb-5 lg:mb-7 mx-auto w-fit md:min-w-[355px] text-center">
            Sob
            <Typewriter words={["re nós"]} loop={1} typeSpeed={120} />
          </h1>

          <div className="bg-bgGray py-1 rounded-md px-2 h-fit mb-3 md:mb-5 lg:mb-7">
            <p className="text-lg md:text-xl tracking-[3px] uppercase font-medium whitespace-nowrap animate-text-slide inline-block font-mont">
              Conectando vidas, transformando histórias.
            </p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:text-lg lg:text-xl mb-6 md:mb-9 lg:mb-12"
          >
            A <span className="text-accentBlue">Petli</span> nasceu com o
            propósito de facilitar e{" "}
            <span className="text-accentBlue">incentivar a adoção</span>{" "}
            responsável de animais de estimação. Criamos uma plataforma
            acessível, intuitiva e segura para{" "}
            <span className="text-accentBlue">aproximar</span> pessoas incríveis
            e pets que precisam de um novo lar. Todo animal merece{" "}
            <span className="text-accentBlue">
              amor, cuidado e uma segunda chance
            </span>
            !
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4 md:gap-7 lg:gap-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <Link className="flex-1 md:max-w-[230px] lg:max-w-[250px]" to="/quero-adotar">
              <motion.button
                variants={{
                  hidden: { opacity: 0, x: -40 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.8 }}
                className="font-semibold w-full text-sm md:text-base h-[50px] md:h-[56px] text-slate-900 bg-white border-white border-2 rounded-2xl tracking-widest uppercase font-mont duration-300 cursor-pointer hover:bg-transparent hover:text-white shadow-lg"
              >
                Quero Adotar
              </motion.button>
            </Link>
            <Link className="flex-1 md:max-w-[230px] lg:max-w-[250px]" to="/novo-pet">
              <motion.button
                variants={{
                  hidden: { opacity: 0, x: 40 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.8 }}
                className="font-semibold w-full text-sm md:text-base h-[50px] md:h-[56px] text-slate-900 bg-white border-white border-2 rounded-2xl tracking-widest uppercase font-mont duration-300 cursor-pointer hover:bg-transparent hover:text-white shadow-lg"
              >
                Quero Doar
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
