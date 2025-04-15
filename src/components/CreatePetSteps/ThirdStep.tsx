import { FormEvent, useState } from "react";

interface Props {
  vaccinated: string;
  setVaccinated: React.Dispatch<React.SetStateAction<string>>;
  setDewormed: React.Dispatch<React.SetStateAction<boolean | null>>;
  setNeutered: React.Dispatch<React.SetStateAction<boolean | null>>;
  specialCare: string;
  setSpecialCare: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const ThirdStep = ({
  vaccinated,
  setVaccinated,
  setDewormed,
  setNeutered,
  specialCare,
  setSpecialCare,
  setStep,
}: Props) => {
  const [isVaccinated, setIsVaccinated] = useState<string | null>(null);
  const [needSpecialCare, setNeedSpecialCare] = useState<string | null>(null);

  // envio de formulário
  const handleThirdStep = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStep(4);
  };

  return (
    <section className="bg-bgGray rounded-lg shadow-lg h-[585px] min-h-fit">
      <h2 className="text-xl md:text-2xl font-medium p-4 md:px-8 md:py-6">
        Vamos falar um pouco sobre a saúde dele!
      </h2>
      <div className="px-3 md:px-9">
        <div className="w-full h-[.5px] bg-[#555252] mx-auto mb-5"></div>
      </div>
      <form
        onSubmit={handleThirdStep}
        className="px-3 md:px-10 flex flex-col gap-4 md:gap-6"
      >
        <div className="px-3 md:px-7 flex flex-col gap-4 md:gap-7 h-[370px]">
          <fieldset className="flex w-full">
            <label className="flex flex-col gap-2 flex-1">
              <span className="font-medium">Vacinado? 💉</span>
              <div className="flex gap-1 md:gap-3 flex-col">
                <div>
                  <input
                    type="radio"
                    name="isVaccinated"
                    value="true"
                    className="cursor-pointer mr-2"
                    required
                    onChange={() => {
                      setIsVaccinated("true");
                      setVaccinated("");
                    }}
                  />
                  Sim
                </div>
                <div>
                  <input
                    type="radio"
                    name="isVaccinated"
                    value="false"
                    className="cursor-pointer mr-2"
                    onChange={() => {
                      setVaccinated("Nenhuma por enquanto.");
                      setIsVaccinated("false");
                    }}
                  />
                  Não
                </div>
              </div>
            </label>
            <label className="flex-1 md:flex-2 flex flex-col gap-2 max-w-[320px]">
              <span className="font-medium">Se sim, quais vacinas?</span>
              <textarea
                className={`w-full min-h-[80px] max-h-[80px] border-1 rounded-lg outline-none text-sm px-2 py-1 ${
                  isVaccinated === "true"
                    ? "border-gray-400 focus:border-[#596A95]"
                    : "text-gray-100 border-gray-300 cursor-not-allowed opacity-20"
                }`}
                maxLength={200}
                required
                disabled={!(isVaccinated === "true")}
                value={vaccinated}
                onChange={(e) => setVaccinated(e.target.value)}
              ></textarea>
            </label>
          </fieldset>
          <fieldset className="flex w-full">
            <label className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                Necessita de cuidados especiais? ❤️‍🩹
              </span>
              <div className="flex gap-1 md:gap-3 flex-col">
                <div>
                  <input
                    type="radio"
                    name="needSpecialCare"
                    value="true"
                    className="cursor-pointer mr-2"
                    required
                    onChange={() => {
                      setNeedSpecialCare("true");
                      setSpecialCare("");
                    }}
                  />{" "}
                  Sim
                </div>
                <div>
                  <input
                    type="radio"
                    name="needSpecialCare"
                    value="false"
                    className="cursor-pointer mr-2"
                    onChange={() => {
                      setSpecialCare("Não necessita.");
                      setNeedSpecialCare("false");
                    }}
                  />{" "}
                  Não
                </div>
              </div>
            </label>
            <label className="flex-1 md:flex-2 flex flex-col gap-2 max-w-[320px]">
              <span className="font-medium">Se sim, quais cuidados?</span>
              <textarea
                className={`w-full min-h-[80px] max-h-[80px] border-1 rounded-lg outline-none text-sm px-2 py-1 ${
                  needSpecialCare === "true"
                    ? "border-gray-400 focus:border-[#596A95]"
                    : "text-gray-100 border-gray-300 cursor-not-allowed opacity-20"
                    
                }`}
                maxLength={300}
                required
                disabled={!(needSpecialCare === "true")}
                value={specialCare}
                onChange={(e) => setSpecialCare(e.target.value)}
              ></textarea>
            </label>
          </fieldset>
          <fieldset className="flex w-full gap-2">
            <label className="flex flex-col gap-2 flex-1">
              <span className="font-medium">Castrado? 🩹</span>
              <div className="flex gap-2">
                <div>
                  <input
                    type="radio"
                    name="neutered"
                    value="true"
                    className="cursor-pointer"
                    required
                    onChange={() => setNeutered(true)}
                  />{" "}
                  Sim
                </div>
                <div>
                  <input
                    type="radio"
                    name="neutered"
                    value="false"
                    className="cursor-pointer"
                    onChange={() => setNeutered(false)}
                  />{" "}
                  Não
                </div>
              </div>
            </label>
            <label className="flex flex-col gap-2 flex-1 md:flex-2 max-w-[320px]">
              <span className="font-medium whitespace-nowrap">
                Vermifugado? 💊
              </span>
              <div className="flex gap-2">
                <div>
                  <input
                    type="radio"
                    name="dewormed"
                    value="true"
                    className="cursor-pointer"
                    required
                    onChange={() => setDewormed(true)}
                  />{" "}
                  Sim
                </div>
                <div>
                  <input
                    type="radio"
                    name="dewormed"
                    value="false"
                    className="cursor-pointer"
                    onChange={() => setDewormed(false)}
                  />{" "}
                  Não
                </div>
              </div>
            </label>
          </fieldset>
        </div>
        <div className="w-full h-[.5px] bg-[#555252] mx-auto"></div>
        <div className="flex w-full items-center h-[50px] gap-1 justify-end">
          <div className="flex gap-2 md:gap-6 items-center">
            <span
              className="text-sm md:text-base font-light cursor-pointer"
              onClick={() => setStep((prev) => prev - 1)}
            >
              Voltar
            </span>
            <button
              type="submit"
              className="font-medium sm:text-lg bg-[#614cfc] px-3 sm:px-8 h-[35px] sm:h-[45px] rounded-xl cursor-pointer duration-200 hover:bg-[#614cfcda]"
            >
              Avançar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ThirdStep;
