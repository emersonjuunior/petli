import { useRef, useEffect } from "react";

interface Props {
  image: string;
  petName: string;
  setViewImage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewImage = ({ image, petName, setViewImage }: Props) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  // permite fechar o modal se clicar em qualquer lugar fora da imagem
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        setViewImage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setViewImage]);

  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-30 px-2">
      <div
        className="bg-bgGray w-fit max-w-[700px] max-h-[800px] rounded-lg relative flex"
        ref={modalContentRef}
      >
        <img
          src={image}
          alt={`Imagem do pet ${petName}`}
          className="object-cover rounded-xl"
        />
        <div
          className="absolute size-10 rounded-full top-3 right-3 bg-bgBlack flex items-center justify-center"
          onClick={() => setViewImage(false)}
        >
          <i className="fa-solid fa-xmark text-2xl cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
};

export default ViewImage;
