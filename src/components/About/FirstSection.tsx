import { useState } from "react";

const FirstSection = () => {
  const [imgLoad, setImgLoad] = useState(true);

  return (
    <section className="min-h-fit md:min-h-[92vh] px-4 md:px-5 pb-4 border-b-[#363636] border-b-2">
      <div className="w-full max-w-7xl mx-auto border-1 flex items-center gap-10">
        <div>
          {imgLoad && <div className="animate-pulse w-xl"></div>}
          <div
            className={`${
              imgLoad ? "hidden" : ""
            } flex items-center justify-center w-xl border-1`}
          >
            <img
              onLoad={() => setImgLoad(false)}
              src="/about-illustration.png"
              alt="Ilustração de pessoas adotando animais de estimação."
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <h1>Sobre nós</h1>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
