import { useRef, useEffect } from "react";

interface Props {
  setAdoptModal: React.Dispatch<React.SetStateAction<boolean>>;
  contact: string;
  handleCopyUrl: (text: string) => void;
}

const AdoptModal = ({ contact, setAdoptModal, handleCopyUrl }: Props) => {
  const modalAdoptRef = useRef<HTMLDivElement>(null);

  // permite fechar o modal se clicar em qualquer lugar fora da imagem
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalAdoptRef.current &&
        !modalAdoptRef.current.contains(event.target as Node)
      ) {
        setAdoptModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setAdoptModal]);

  return (
    <div className="w-full h-full inset-0 bg-black/30 fixed flex justify-center items-center z-50">
      <div
        className="bg-bgGray w-full max-w-[560px] mx-2 rounded-lg p-4 md:p-8 relative"
        ref={modalAdoptRef}
      >
        <i
          className="fa-solid fa-xmark absolute text-2xl right-4 top-4 cursor-pointer"
          onClick={() => setAdoptModal(false)}
        ></i>
        <h2 className="text-xl md:text-2xl font-medium mb-4">
          Pronto pra dar um novo lar? 🐾
        </h2>
        <p className="mb-4 text-lg">
          O responsável pelo pet está disponível para conversar diretamente com
          você.
        </p>
        <div className="flex items-center gap-5 justify-end">
          <button>Voltar</button>
          {contact.includes("@") ? (
            <button
              className="bg-[#4285F4] hover:bg-[#3367D6] px-4 py-2 rounded-xl font-semibod text-lg cursor-pointer duration-300"
              onClick={() => {
                handleCopyUrl("Email copiado com sucesso! ✉️");
                setAdoptModal(false);
              }}
            >
              <i className="fa-solid fa-envelope text-xl mr-1"></i> Entrar em
              contato
            </button>
          ) : (
            <a
              target="_blank"
              href={`https://wa.me/55${contact.replace(/\D/g, "")}`}
              onClick={() => setAdoptModal(false)}
            >
              <button className="bg-[#1EBE5D] hover:bg-[#25D366] px-4 py-2 rounded-xl font-semibod text-lg cursor-pointer duration-300">
                <i className="fa-brands fa-whatsapp text-xl mr-1"></i> Entrar em
                contato
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdoptModal;
