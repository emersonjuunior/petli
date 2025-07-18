import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { usePetContext } from "../../context/PetContext";
import PetCard from "../PetCard";
import { Typewriter } from "react-simple-typewriter";

const PetsSlide = () => {
  const { allPets } = usePetContext();

  const motionRef = useRef(null);
  const isInView = useInView(motionRef, {
    once: true,
    margin: "-130px 0px", // ativa a animação só depois de o conteúdo entrar mais
  });

  // seleciona os 6 primeiros pets (mais recentes)
  const homePets = allPets.filter((_, index) => index < 6);

  const [startTyping, setStartTyping] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
          observer.disconnect(); // dispara apenas uma vez
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="border-b-[#363636] border-b-2 py-15 md:py-20 lg:py-25 px-4 xl:px-0"
      id="available-pets"
      ref={sectionRef}
    >
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
          className="mx-auto mb-6 md:mb-10 max-w-[325px] md:min-w-[520px] md:max-w-[520px] mih-h-[48px]"
        >
          <h2 className="text-3xl md:text-5xl tracking-widest font-mont font-semibold mb-2">
            Esperando u
            {startTyping && (
              <Typewriter words={["m lar"]} loop={1} typeSpeed={100} />
            )}
            {!startTyping && <span className="opacity-0">adotar?</span>}
          </h2>
          <div className="h-[3px] w-[23%] md:w-[27%] bg-primaryRed"></div>
        </motion.div>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          slidesPerView={homePets.length < 3 ? homePets.length : 3}
          loop={homePets.length > 3}
          centeredSlides={true}
          grabCursor={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: homePets.length < 3 ? homePets.length : 3,
              spaceBetween: 40,
            },
          }}
        >
          {homePets.map((pet) => (
            <SwiperSlide key={pet.id}>
              <PetCard
                id={pet.id}
                name={pet.name}
                species={pet.species}
                image={pet.image}
                location={`${pet.city}, ${pet.state}`}
                age={pet.age}
                size={pet.size}
                gender={pet.gender}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default PetsSlide;
