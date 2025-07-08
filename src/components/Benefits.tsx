import { useEffect, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const Benefits = () => {
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
      ref={sectionRef}
      className="w-full bg-[#292929] pt-20 pb-30 border-b-[#363636] border-b-2"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-fit mx-auto mb-9 min-w-[470px] mih-h-[48px]">
          <h2 className="text-5xl tracking-widest font-mont font-semibold mb-2">
            Por q
            {startTyping && (
              <Typewriter
                words={["ue adotar?"]}
                loop={1}
                typeSpeed={100}
              />
            )}
            {!startTyping && <span className="opacity-0">adotar?</span>}
          </h2>
          <div className="h-[3px] w-[27%] bg-primaryRed"></div>
        </div>
        <div className="grid grid-cols-3 gap-10">
          <div className="flex flex-col gap-2 bg-bgBlack border-[#353535] border-1 rounded-xl py-7 px-8 cursor-pointer duration-300 hover:scale-105 shadow-lg bg-linear-to-r from-[#272727] to-[#292929]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <h4 className="text-lg font-medium tracking-wide uppercase">
              Salve uma Vida
            </h4>
            <p>Ao adotar, você dá uma nova chance para alguém que precisa.</p>
          </div>
          <div className="flex flex-col gap-2 bg-bgBlack border-[#353535] border-1 rounded-xl py-7 px-8 cursor-pointer duration-300 hover:scale-105 shadow-lg bg-linear-to-r from-[#272727] to-[#292929]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <h4 className="text-lg font-medium tracking-wide uppercase">
              Ganhe um Companheiro
            </h4>
            <p>A adoção traz um amigo fiel e afetuoso para sua vida.</p>
          </div>
          <div className="flex flex-col gap-2 bg-bgBlack border-[#353535] border-1 rounded-xl py-7 px-8 cursor-pointer duration-300 hover:scale-105 shadow-lg bg-linear-to-r from-[#272727] to-[#292929]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
            <h4 className="text-lg font-medium tracking-wide uppercase">
              Adoção segura
            </h4>
            <p>Escolha quem pode ver os seus dados de contato.</p>
          </div>
          <div className="flex flex-col gap-2 bg-bgBlack border-[#353535] border-1 rounded-xl py-7 px-8 cursor-pointer duration-300 hover:scale-105 shadow-lg bg-linear-to-r from-[#272727] to-[#292929]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64"
              />
            </svg>
            <h4 className="text-lg font-medium tracking-wide uppercase">
              Ajude o mundo
            </h4>
            <p>Adotar é um ato de trazer esperança, amor e empatia.</p>
          </div>
          <div className="flex flex-col gap-2 bg-bgBlack border-[#353535] border-1 rounded-xl py-7 px-8 cursor-pointer duration-300 hover:scale-105 shadow-lg bg-linear-to-r from-[#272727] to-[#292929]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h4 className="text-lg font-medium tracking-wide uppercase">
              Sem fins lucrativos
            </h4>
            <p>Nosso foco é o bem-estar dos animais, não o lucro.</p>
          </div>
          <div className="flex flex-col gap-2 bg-bgBlack border-[#353535] border-1 rounded-xl py-7 px-8 cursor-pointer duration-300 hover:scale-105 shadow-lg bg-linear-to-r from-[#272727] to-[#292929]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
            <h4 className="text-lg font-medium tracking-wide uppercase">
              Conheça antes
            </h4>
            <p>Veja fotos e perfis completos antes de adotar um pet.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
