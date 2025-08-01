import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-fit md:min-h-[92vh] w-screen bg-[url('/dogs.jpg')] bg-cover bg-size bg-no-repeat bg-[position:79%_0%] md:bg-[position:75%_0%] lg:bg-center px-4 md:px-7 lg:px-10 pb-4">
      <div className="absolute inset-0 bg-bgBlack/90 backdrop-blur-[3px] border-b-[#363636] border-b-2"></div>
      <div className="relative z-10 h-full min-h-[92vh] w-full max-w-7xl mx-auto pt-[9vh] md:pt-[20vh] lg:pt-[23vh] space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[42px] md:text-[44px] lg:text-6xl mb-4 font-medium leading-tight"
        >
          Adote um novo <br className="md:hidden" />
          <Typewriter
            words={["amigo.", "companheiro.", "amor."]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={300}
            deleteSpeed={200}
            delaySpeed={1500}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl lg:text-2xl max-w-[700px] mb-5 md:mb-8 font-[250]"
        >
          Encontre seu novo melhor amigo ou ajude um bichinho a encontrar um
          lar. Dê um final feliz para quem só precisa de amor.
        </motion.p>

        <motion.div
          className="flex items-center gap-5 md:gap-8"
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
          <Link className="flex-1 max-w-[250px]" to="/novo-pet">
            <motion.button
              variants={{
                hidden: { opacity: 0, x: -40 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.8 }}
              className="font-semibold w-full text-[15px] md:text-base h-[50px] md:h-[56px] text-slate-900 bg-white border-white border-2 rounded-2xl tracking-widest uppercase font-mont duration-300 cursor-pointer hover:bg-transparent hover:text-white shadow-lg"
            >
              Quero Doar
            </motion.button>
          </Link>

          <Link className="flex-1 max-w-[250px]" to="/quero-adotar">
            <motion.button
              variants={{
                hidden: { opacity: 0, x: 40 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.8 }}
              className="border-accentBlue w-full text-[15px] md:text-base font-mont h-[50px] md:h-[56px] cursor-pointer rounded-lg pet-btn inline-block font-bold text-white border-3 relative overflow-hidden z-10 bg-transparent"
            >
              <span className="relative z-10 uppercase tracking-wider">
                Quero Adotar
              </span>
              <span className="absolute button-span inset-0 bg-accentBlue transform -translate-x-full transition-all duration-300 z-0"></span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
