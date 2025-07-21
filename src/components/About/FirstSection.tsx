import { useState } from "react";
import { Link } from "react-router-dom";

const FirstSection = () => {
  const [imgLoad, setImgLoad] = useState(true);

  return (
    <section className="min-h-fit px-4 md:px-5 border-b-[#363636] border-b-2 pt-10 pb-15">
      <div className="w-full max-w-7xl mx-auto flex items-center gap-6">
        <aside>
          {imgLoad && (
            <div className="animate-pulse w-xl h-[576px] bg-[#323232] rounded-xl"></div>
          )}
          <div
            className={`${
              imgLoad ? "hidden" : ""
            } flex items-center justify-center w-xl`}
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
          <h1 className="text-6xl font-medium tracking-widest mb-7 text-center">
            Sobre nós
          </h1>

          <div className="bg-bgGray py-1 rounded-md px-2 h-fit mb-7">
            <p className="text-xl tracking-[3px] uppercase font-medium whitespace-nowrap animate-text-slide inline-block font-mont">
              Conectando vidas, transformando histórias.
            </p>
          </div>

          <p className="text-xl mb-12">
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
          </p>

          <div className="flex items-center justify-center gap-12">
            <Link className="flex-1 max-w-[250px]" to="/quero-adotar">
              <button className="font-semibold w-full text-[15px] md:text-base h-[50px] md:h-[56px] text-slate-900 bg-white border-white border-2 rounded-2xl tracking-widest uppercase font-mont duration-300 cursor-pointer hover:bg-transparent hover:text-white shadow-lg">
                Quero Adotar
              </button>
            </Link>
            <Link className="flex-1 max-w-[250px]" to="/novo-pet">
              <button className="font-semibold w-full text-[15px] md:text-base h-[50px] md:h-[56px] text-slate-900 bg-white border-white border-2 rounded-2xl tracking-widest uppercase font-mont duration-300 cursor-pointer hover:bg-transparent hover:text-white shadow-lg">
                Quero Doar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
