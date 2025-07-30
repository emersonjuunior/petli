import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Typewriter } from "react-simple-typewriter";

const MVV = () => {
  const motionRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(motionRef, {
    once: true,
    margin: "-130px 0px", // ativa a animação só depois de o conteúdo entrar mais
  });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#292929] pt-10 md:pt-15 lg:pt-20 pb-15 md:pb-25 lg:pb-30 border-b-[#363636] border-b-2 px-4 xl:px-0"
    >
      <div ref={motionRef} className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center gap-7 md:gap-12 lg:gap-16 xl:gap-20 md:h-[450px] lg:h-[500px] md:items-center">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="xs:self-end md:self-auto bg-linear-to-r from-[#282828] to-[#292929] shadow-lg border-[#353535] border-1 w-[320px] md:w-[240px] lg:w-[300px] xl:w-[350px] md:h-[360px] lg:h-[400px] rounded-lg p-3 lg:p-4 flex flex-col items-center justify-center cursor-pointer duration-400 md:hover:w-[270px] lg:hover:w-[360px] xl:hover:w-[420px]"
          >
            <img
              className="md:mb-2 w-[64px] min-w-[64px] h-[64px] min-h-[64px] md:w-[80px] lg:w-[100px] md:min-w-[80px] lg:min-w-[100px] md:min-h-[80px] lg:min-h-[100px] md:h-[80px] lg:h-[100px]"
              src="/mission.png"
              alt="Missão"
              loading="lazy"
            />
            <h3 className="uppercase font-mont font-semibold tracking-widest text-xl mb-2 md:mb-3">
              <span className="rectangle h-4"></span> Missão
            </h3>
            <p className="text-center max-w-[316px]">
              Facilitar e incentivar a adoção responsável de animais, conectando
              pessoas e pets com empatia e responsabilidade.
            </p>
          </motion.article>
          <div className="order-[-1] md:order-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mb-4 md:mb-6 xl:min-w-[322px] w-fit mx-auto"
            >
              <h2 className="w-fit text-3xl lg:text-[40px] xl:text-[52px] tracking-widest font-mont font-semibold">
                Mot
                <Typewriter words={["ivação"]} loop={1} typeSpeed={100} />
              </h2>
              <div className="h-[3px] w-[20%] md:w-[23%] bg-primaryRed"></div>
            </motion.div>
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.5,
              }}
              className="bg-linear-to-r from-[#282828] to-[#292929] shadow-lg border-[#353535] border-1 w-[320px] md:w-[240px] lg:w-[300px] xl:w-[350px] md:h-[360px] lg:h-[400px] rounded-lg p-3 lg:p-4 flex flex-col items-center justify-center self-end cursor-pointer duration-400 md:hover:w-[270px] lg:hover:w-[360px] xl:hover:w-[420px]"
            >
              <img
                className="md:mb-2 lg:mb-3 w-[64px] min-w-[64px] h-[64px] min-h-[64px] md:w-[80px] lg:w-[100px] md:min-w-[80px] lg:min-w-[100px] md:min-h-[80px] lg:min-h-[100px] md:h-[80px] lg:h-[100px]"
                src="/values.png"
                alt="Valores"
                loading="lazy"
              />
              <h3 className="uppercase font-mont font-semibold tracking-widest text-xl mb-2 md:mb-3">
                <span className="rectangle h-4"></span> Visão
              </h3>
              <p className="text-center max-w-[316px]">
                Ajudar animais a encontrarem um lar acolhedor, com carinho e
                cuidado, dando uma nova chance através da adoção.
              </p>
            </motion.article>
          </div>
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.8,
            }}
            className="bg-linear-to-r from-[#282828] to-[#292929] shadow-lg border-[#353535] border-1 w-[320px] md:w-[240px] lg:w-[300px] xl:w-[350px] md:h-[360px] lg:h-[400px] rounded-lg p-3 lg:p-4 flex flex-col items-center justify-center cursor-pointer duration-400 md:hover:w-[270px] lg:hover:w-[360px] xl:hover:w-[420px]"
          >
            <img
              className="md:mb-3 w-[64px] min-w-[64px] h-[64px] min-h-[64px] md:w-[80px] lg:w-[100px] md:min-w-[80px] lg:min-w-[100px] md:min-h-[80px] lg:min-h-[100px] md:h-[80px] lg:h-[100px]"
              src="/vision.png"
              alt="Visão"
              loading="lazy"
            />
            <h3 className="uppercase font-mont font-semibold tracking-widest text-xl mb-2 md:mb-3">
              <span className="rectangle h-4"></span> Valores
            </h3>
            <p className="text-center max-w-[316px]">
              Amor, empatia, responsabilidade, transparência e tecnologia a
              serviço da vida.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default MVV;
