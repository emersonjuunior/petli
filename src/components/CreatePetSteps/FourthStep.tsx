import { FormEvent } from "react";
import { useState } from "react";
import Error from "../Error";

interface Props {
  name: string;
  goodWithOtherAnimals: boolean | null;
  setGoodWithOtherAnimals: React.Dispatch<React.SetStateAction<boolean | null>>;
  goodWithChildren: boolean | null;
  setGoodWithChildren: React.Dispatch<React.SetStateAction<boolean | null>>;
  moreImages: string[];
  setMoreImages: React.Dispatch<React.SetStateAction<string[]>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const FourthStep = ({
  name,
  goodWithOtherAnimals,
  setGoodWithOtherAnimals,
  goodWithChildren,
  setGoodWithChildren,
  setStep,
  moreImages,
  setMoreImages,
}: Props) => {
  const [error, setError] = useState<string | null>(null);

  // input de enviar imagens
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // limita o envio a 3 imagens
    if (moreImages.length === 3) {
      setError("Limite de imagens atingido.");
      return;
    }

    if (file) {
      // mostra o preview da imagem
      setMoreImages((prev) => [...prev, URL.createObjectURL(file)]);
    }
  };

  const removeImage = (value: string) => {
    setMoreImages((images) => images.filter((image) => image != value));
  };

  const handleFourthStep = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
  };

  return (
    <div className="bg-bgGray rounded-lg shadow-lg h-[585px] min-h-fit">
      <h2 className="text-xl md:text-2xl font-medium p-4 md:px-8 md:py-6 max-w-9/10">
        Nos conte um pouco mais sobre ele!
      </h2>
      <div className="px-3 md:px-9">
        <div className="w-full h-[.5px] bg-[#555252] mx-auto mb-5"></div>
      </div>
      <form
        onSubmit={handleFourthStep}
        className="px-3 md:px-10 flex flex-col gap-4 md:gap-6"
      >
        <div className="px-3 md:px-7 flex flex-col gap-3 md:gap-4 h-[370px] min-h-fit">
          <fieldset className="flex w-full gap-2">
            <label className="flex flex-col gap-2 flex-1">
              <span className="font-medium text-sm md:text-base">
                Ele se dá bem com outros animais?
              </span>
              <div className="flex gap-2">
                <div>
                  <input
                    type="radio"
                    name="goodWithOtherAnimals"
                    value="true"
                    className="cursor-pointer"
                    required
                    onChange={() => setGoodWithOtherAnimals(true)}
                  />{" "}
                  Sim
                </div>
                <div>
                  <input
                    type="radio"
                    name="goodWithOtherAnimals"
                    value="false"
                    className="cursor-pointer"
                    onChange={() => setGoodWithOtherAnimals(false)}
                  />{" "}
                  Não
                </div>
              </div>
            </label>
            <label className="flex flex-col gap-2 flex-1">
              <span className="font-medium text-sm md:text-base">
                Ele se dá bem com crianças?
              </span>
              <div className="flex gap-2">
                <div>
                  <input
                    type="radio"
                    name="goodWithChildren"
                    value="true"
                    className="cursor-pointer"
                    required
                    onChange={() => setGoodWithChildren(true)}
                  />{" "}
                  Sim
                </div>
                <div>
                  <input
                    type="radio"
                    name="goodWithChildren"
                    value="false"
                    className="cursor-pointer"
                    onChange={() => setGoodWithChildren(false)}
                  />{" "}
                  Não
                </div>
              </div>
            </label>
          </fieldset>
          <textarea
            className="w-full min-h-[90px] max-h-[90px] border-1 rounded-lg outline-none text-sm px-2 py-1"
            placeholder="Conte algo especial sobre o pet, como sua história, personalidade ou qualquer detalhe importante. (opcional)"
            maxLength={300}
          ></textarea>
          <label className="relative h-[150px] md:h-[180px] w-full flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-gray-300 p-6 rounded-xl">
            <div className="flex items-center justify-center">
              <img
                src="./upload-picture.png"
                alt="Nos envie uma foto do seu pet!"
                className="w-25 h-auto"
              />
            </div>
            <div className="flex items-center justify-center">
              <span className="text-center text-sm md:text-[16px] max-w-[90%] font-medium">
                Envie mais fotos do seu pet! Máximo: 3 (opcional)
              </span>
            </div>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </label>
          {moreImages.length > 0 && (
            <div className="flex gap-4">
              {moreImages.map((image, index) => (
                <div className="relative" key={index}>
                  <img
                    src={image}
                    alt={`Fotos do Pet ${name}`}
                    className="size-14 rounded-md"
                  />
                  <div
                    className="absolute top-[1px] right-0 bg-bgBlack z-10 p-2 rounded-full flex items-center justify-center"
                    onClick={() => removeImage(image)}
                  >
                    <i className="fa-solid fa-xmark absolute text-xs cursor-pointer"></i>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full h-[.5px] bg-[#555252] mx-auto"></div>
        <div
          className={`flex w-full items-center h-[50px] gap-1 ${
            error ? "justify-between" : "justify-end"
          } ${moreImages.length > 0 ? "mb-3" : "mb-0"}`}
        >
          {error && <Error error={error} setError={setError} />}
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
    </div>
  );
};

export default FourthStep;
