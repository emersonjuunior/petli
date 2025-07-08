import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { usePetContext } from "../context/PetContext";
import PetCard from "./PetCard";
import { Typewriter } from "react-simple-typewriter";

const PetsSlide = () => {
  const { allPets } = usePetContext();

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
      className="border-b-[#363636] border-b-2 py-25"
      id="available-pets"
      ref={sectionRef}
    >
      <div className="w-fit mx-auto mb-10 min-w-[600px] mih-h-[48px]">
        <h2 className="text-5xl tracking-widest font-mont font-semibold mb-2">
          Prontos par
          {startTyping && (
            <Typewriter words={["a adoção"]} loop={1} typeSpeed={100} />
          )}
          {!startTyping && <span className="opacity-0">adotar?</span>}
        </h2>
        <div className="h-[3px] w-[27%] bg-primaryRed"></div>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={3}
        centeredSlides={true}
        loop={true}
        grabCursor={true}
        breakpoints={{
          300: {
            spaceBetween: 100,
          },
          767: {
            spaceBetween: 20,
          },
        }}
      >
        {homePets.map((pet) => (
          <SwiperSlide>
            <PetCard
              key={pet.id}
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
    </section>
  );
};

export default PetsSlide;
