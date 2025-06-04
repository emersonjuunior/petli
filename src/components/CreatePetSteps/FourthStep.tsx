import { FormEvent, useState } from "react";
import Error from "../Error";
import { useLocation } from "react-router-dom";

interface Props {
  name: string;
  setGoodWithOtherAnimals: React.Dispatch<React.SetStateAction<boolean | null>>;
  setGoodWithChildren: React.Dispatch<React.SetStateAction<boolean | null>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  moreImagesPreview: string[];
  setMoreImagesPreview: React.Dispatch<React.SetStateAction<string[]>>;
  setMoreImagesData: React.Dispatch<React.SetStateAction<FormData[]>>;
  handleNewPet(e: FormEvent<HTMLFormElement>): void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  goodWithOtherAnimals?: boolean | null;
  goodWithChildren?: boolean | null;
}

const FourthStep = ({
  name,
  setGoodWithOtherAnimals,
  setGoodWithChildren,
  description,
  setDescription,
  moreImagesPreview,
  setMoreImagesPreview,
  setMoreImagesData,
  handleNewPet,
  setStep,
  loading,
  goodWithChildren,
  goodWithOtherAnimals,
}: Props) => {
  const [error, setError] = useState<string | null>(null);

  // variavel que verifica se está na pagina de editar pets
  const location = useLocation();
  const checkLocation = location.pathname.includes("editar");

  // input de enviar imagens
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const maxFileSize = 1 * 1024 * 1024; // 1mb
    const allowedFiles = ["image/jpeg", "image/png", "image/webp"];

    if (!file) return;

    // verifica se é uma imagem
    if (!allowedFiles.includes(file.type)) {
      setError("Formato inválido. Use apenas JPG, PNG ou WEBP.");
      return;
    }

    // verifica o tamanho
    if (file.size > maxFileSize) {
      setError("Imagem muito pesada! Limite de 1MB.");
      return;
    }

    // limita o envio a 3 imagens
    if (moreImagesPreview.length === 3) {
      setError("Limite de imagens atingido.");
      return;
    }

    // prepara o objeto para ser enviado ao banco de dados de imagem (cloudinary)
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "djzmzwwtm");

    setMoreImagesData((prev) => [...prev, data]);
    setMoreImagesPreview((prev) => [...prev, URL.createObjectURL(file)]);
  };

  // função de remover imagens
  const removeImage = (value: string) => {
    // filtra o index da imagem que o usuário clicou para remover
    const indexToRemove = moreImagesPreview.findIndex(
      (image) => image === value
    );

    if (indexToRemove === -1) return;

    // atualiza os states removendo a imagem escolhida
    setMoreImagesData((images) =>
      images.filter((_, index) => index != indexToRemove)
    );
    setMoreImagesPreview((images) =>
      images.filter((_, index) => index != indexToRemove)
    );
  };

  return (
    <section className="bg-bgGray rounded-lg shadow-lg h-[585px] min-h-fit">
      <h2 className="text-xl md:text-2xl font-medium p-4 md:px-8 md:py-6 max-w-9/10">
        Nos conte um pouco mais sobre ele!
      </h2>
      <div className="px-3 md:px-9">
        <div className="w-full h-[.5px] bg-[#555252] mx-auto mb-5"></div>
      </div>
      <form
        onSubmit={handleNewPet}
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
                    defaultChecked={checkLocation && goodWithOtherAnimals!}
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
                    defaultChecked={checkLocation && !goodWithOtherAnimals}
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
                    defaultChecked={checkLocation && goodWithChildren!}
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
                    defaultChecked={checkLocation && !goodWithChildren}
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
          <div className="relative">
            <textarea
              className="w-full min-h-[90px] max-h-[90px] border-1 rounded-lg outline-none text-sm px-2 py-1"
              placeholder="Conte algo especial sobre o pet, como sua história, personalidade ou qualquer detalhe importante. (opcional)"
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p className="absolute bottom-2 right-2 font-medium bg-bgBlack/20 rounded-lg p-[1px] ">
              {description.length}/200
            </p>
          </div>
          <label className="relative h-[150px] md:h-[180px] w-full flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-gray-300 p-6 rounded-xl">
            <div className="flex items-center justify-center">
              <img
                src="/upload-picture.png"
                alt="Nos envie uma foto do seu pet!"
                className="min-w-25 min-h-[85px] w-25 h-auto"
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
          {moreImagesPreview.length > 0 && (
            <div className="flex gap-4">
              {moreImagesPreview.map((image, index) => (
                <div className="relative" key={index}>
                  <img
                    src={image}
                    alt={`Fotos do Pet ${name}`}
                    className="size-14 rounded-md object-cover"
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
          } ${moreImagesPreview.length > 0 ? "mb-3" : "mb-0"}`}
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
              className={`font-medium sm:text-lg px-3 sm:px-8 h-[35px] sm:h-[45px] rounded-xl duration-200 hover:bg-[#614cfcda] ${
                loading
                  ? "cursor-not-allowed opacity-80 bg-[#6552f7]"
                  : "bg-[#614cfc] cursor-pointer"
              }`}
              disabled={loading}
            >
              {loading ? "Criando..." : "Concluir"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default FourthStep;
