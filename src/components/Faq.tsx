import { useState, useRef, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

const Faq = () => {
  const [startTyping, setStartTyping] = useState(false);
  const [adoptionQuestion, setAdoptionQuestion] = useState(0);
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

  const handleAdoptionQuestion = (num: number) => {
    if (num === adoptionQuestion) {
      setAdoptionQuestion(0);
    } else {
      setAdoptionQuestion(num);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#292929] pt-20 pb-30 border-b-[#363636] border-b-2"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-fit mx-auto mb-10 min-w-[635px] mih-h-[48px]">
          <h2 className="text-5xl tracking-widest font-mont font-semibold mb-2">
            Perguntas f
            {startTyping && (
              <Typewriter words={["requentes"]} loop={1} typeSpeed={100} />
            )}
            {!startTyping && <span className="opacity-0">adotar?</span>}
          </h2>
          <div className="h-[3px] w-[27%] bg-primaryRed"></div>
        </div>
        <article>
          <h3 className="text-2xl mb-4">Adoção</h3>
          <ul className="flex flex-col gap-3">
            <li
              className="border-[#363636] border-1"
              onClick={() => handleAdoptionQuestion(1)}
            >
              <div className="bg-linear-to-r from-[#282828] via-[#292929] to-[#303030] w-full flex justify-between items-center bg-bgBlack py-3 px-5 cursor-pointer">
                <h4 className="text-lg font-medium">
                  Como funciona o processo de adoção?
                </h4>
                <i
                  className={`${
                    adoptionQuestion === 1 ? "rotate-180" : ""
                  } transition-all duration-700 text-lg fa-solid fa-caret-down`}
                ></i>
              </div>

              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  adoptionQuestion === 1
                    ? "max-h-[500px] py-3 px-5"
                    : "max-h-0 py-0 px-5"
                } bg-[#333333] font-light`}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati voluptatem nisi repudiandae natus similique
                  quibusdam vitae voluptatibus sapiente, assumenda reiciendis in
                  quisquam magni molestias ipsum placeat adipisci iste id
                  tempora amet at cupiditate ratione? Neque sapiente dolorem
                  velit, ut eaque odio. Distinctio eveniet deserunt odio ex
                  eaque. Voluptatibus vel, quae eum hic illum voluptatum
                  exercitationem quasi sequi, numquam, libero doloribus maiores
                  corporis quidem! Voluptate repellat eius doloremque officia
                  asperiores explicabo animi aliquam culpa ratione accusamus
                  voluptas ad, itaque architecto distinctio!
                </p>
              </div>
            </li>
            <li
              className="border-[#363636] border-1"
              onClick={() => handleAdoptionQuestion(2)}
            >
              <div className="bg-linear-to-r from-[#282828] via-[#292929] to-[#303030] w-full flex justify-between items-center bg-bgBlack py-3 px-5 cursor-pointer">
                <h4 className="text-lg font-medium">
                  Como funciona o processo de adoção?
                </h4>
                <i
                  className={`${
                    adoptionQuestion === 2 ? "rotate-180" : ""
                  } transition-all duration-700 text-lg fa-solid fa-caret-down`}
                ></i>
              </div>

              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  adoptionQuestion === 2
                    ? "max-h-[500px] py-3 px-5"
                    : "max-h-0 py-0 px-5"
                } bg-[#333333] font-light`}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati voluptatem nisi repudiandae natus similique
                  quibusdam vitae voluptatibus sapiente, assumenda reiciendis in
                  quisquam magni molestias ipsum placeat adipisci iste id
                  tempora amet at cupiditate ratione? Neque sapiente dolorem
                  velit, ut eaque odio. Distinctio eveniet deserunt odio ex
                  eaque. Voluptatibus vel, quae eum hic illum voluptatum
                  exercitationem quasi sequi, numquam, libero doloribus maiores
                  corporis quidem! Voluptate repellat eius doloremque officia
                  asperiores explicabo animi aliquam culpa ratione accusamus
                  voluptas ad, itaque architecto distinctio!
                </p>
              </div>
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default Faq;
