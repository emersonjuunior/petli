import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { benefits } from "../../data/benefits";

const Benefits = () => {
  const motionRef = useRef(null);
  const isInView = useInView(motionRef, {
    once: true,
    margin: "-130px 0px", // ativa a animação só depois de o conteúdo entrar mais
  });

  return (
    <section id="por-que-adotar" className="w-full bg-[#292929] pt-10 md:pt-15 lg:pt-20 pb-15 md:pb-25 lg:pb-30 border-b-[#363636] border-b-2 px-4 xl:px-0 scroll-mt-10">
      <motion.div
        ref={motionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="w-fit mx-auto mb-6 md:mb-9 min-w-[294px] md:min-w-[470px]"
        >
          <h2 className="text-3xl md:text-5xl tracking-widest font-mont font-semibold mb-2">
            Por q
            {isInView && (
              <Typewriter words={["ue adotar?"]} loop={1} typeSpeed={100} />
            )}
            {!isInView && <span className="opacity-0">ue adotar?</span>}
          </h2>
          <div className="h-[3px] w-[27%] bg-primaryRed"></div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-10 lg:px-0 gap-5 md:gap-12 lg:gap-6 xl:gap-10">
          {benefits.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.1, // atraso escalonado
                ease: "easeOut",
              }}
              className="flex flex-col gap-1 md:gap-2 bg-bgBlack border-[#353535] border-1 rounded-xl py-7 px-8 cursor-pointer duration-300 hover:scale-105 shadow-lg bg-linear-to-r from-[#272727] to-[#292929]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-11 md:size-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={card.icon}
                />
                {card.icon2 && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={card.icon2}
                  />
                )}
              </svg>
              <h4 className="text-lg font-medium tracking-wide uppercase">
                {card.title}
              </h4>
              <p>{card.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Benefits;
