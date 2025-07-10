import { useState, useRef, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion, useInView } from "framer-motion";

const Faq = () => {
  const [startTyping, setStartTyping] = useState(false);
  const [question, setQuestion] = useState(0);
  const sectionRef = useRef(null);
  const motionRef = useRef(null);
  const isInView = useInView(motionRef, {
    once: true,
    margin: "-130px 0px", // ativa a animação só depois de o conteúdo entrar mais
  });

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

  const handleQuestion = (num: number) => {
    if (num === question) {
      setQuestion(0);
    } else {
      setQuestion(num);
    }
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#292929] pt-12 pb-20">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          ref={motionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="w-fit mx-auto mb-5 min-w-[635px] mih-h-[48px]"
        >
          <h2 className="text-5xl tracking-widest font-mont font-semibold mb-2">
            Perguntas f
            {startTyping && (
              <Typewriter words={["requentes"]} loop={1} typeSpeed={100} />
            )}
            {!startTyping && <span className="opacity-0">adotar?</span>}
          </h2>
          <div className="h-[3px] w-[27%] bg-primaryRed"></div>
        </motion.div>
        <motion.article
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <h3 className="text-2xl mb-4">Adoção </h3>
          <ul className="flex flex-col gap-2 mb-5">
            <li
              className="border-[#363636] border-1"
              onClick={() => handleQuestion(1)}
            >
              <div className="bg-linear-to-r from-[#282828] via-[#292929] to-[#303030] w-full flex justify-between items-center bg-bgBlack py-3 px-5 cursor-pointer">
                <h4 className="text-lg font-medium">
                  Como funciona o processo de adoção?
                </h4>
                <i
                  className={`${
                    question === 1 ? "rotate-180" : ""
                  } transition-all duration-700 text-lg fa-solid fa-caret-down`}
                ></i>
              </div>

              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  question === 1
                    ? "max-h-[500px] py-3 px-5"
                    : "max-h-0 py-0 px-5"
                } bg-[#333333] font-light`}
              >
                <p>
                  Você pode olhar os pets disponíveis para adoção e encontrar
                  aquele que te interesse. Ao clicar em "Quero Adotar", o
                  contato com o doador será iniciado de acordo com as
                  preferências definidas por ele: em alguns casos, você poderá
                  falar imediatamente com ele, e em outros, será necessário
                  enviar uma solicitação que o doador irá analisar. Depois
                  disso, vocês podem conversar e combinar os próximos passos. A
                  plataforma apenas facilita essa conexão, todo o processo de
                  adoção acontece diretamente entre adotante e doador.
                </p>
              </div>
            </li>
            <li
              className="border-[#363636] border-1"
              onClick={() => handleQuestion(2)}
            >
              <div className="bg-linear-to-r from-[#282828] via-[#292929] to-[#303030] w-full flex justify-between items-center bg-bgBlack py-3 px-5 cursor-pointer">
                <h4 className="text-lg font-medium">
                  Preciso pagar algo para adotar um pet?
                </h4>
                <i
                  className={`${
                    question === 2 ? "rotate-180" : ""
                  } transition-all duration-700 text-lg fa-solid fa-caret-down`}
                ></i>
              </div>

              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  question === 2
                    ? "max-h-[500px] py-3 px-5"
                    : "max-h-0 py-0 px-5"
                } bg-[#333333] font-light`}
              >
                <p>
                  Não! A plataforma é totalmente gratuita e sem fins lucrativos,
                  tanto para quem deseja adotar quanto para quem quer doar um
                  animal.
                </p>
              </div>
            </li>
            <li
              className="border-[#363636] border-1"
              onClick={() => handleQuestion(3)}
            >
              <div className="bg-linear-to-r from-[#282828] via-[#292929] to-[#303030] w-full flex justify-between items-center bg-bgBlack py-3 px-5 cursor-pointer">
                <h4 className="text-lg font-medium">
                  E se o pet não se adaptar à minha casa?
                </h4>
                <i
                  className={`${
                    question === 3 ? "rotate-180" : ""
                  } transition-all duration-700 text-lg fa-solid fa-caret-down`}
                ></i>
              </div>

              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  question === 3
                    ? "max-h-[500px] py-3 px-5"
                    : "max-h-0 py-0 px-5"
                } bg-[#333333] font-light`}
              >
                <p>
                  Sabemos que a adaptação pode levar um tempo e nem sempre
                  ocorre como esperado. Se surgir alguma dificuldade, o ideal é
                  entrar em contato com o doador para conversar sobre a
                  situação, e juntos, buscar a melhor solução. A plataforma não
                  interfere diretamente no processo de adoção, mas sempre
                  incentivamos o diálogo respeitoso e amigável.
                </p>
              </div>
            </li>
          </ul>
        </motion.article>
        <motion.article
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <h3 className="text-2xl mb-4">Doação</h3>
          <ul className="flex flex-col gap-2 mb-5">
            <li
              className="border-[#363636] border-1"
              onClick={() => handleQuestion(4)}
            >
              <div className="bg-linear-to-r from-[#282828] via-[#292929] to-[#303030] w-full flex justify-between items-center bg-bgBlack py-3 px-5 cursor-pointer">
                <h4 className="text-lg font-medium">
                  Como faço para doar um animal na plataforma?
                </h4>
                <i
                  className={`${
                    question === 4 ? "rotate-180" : ""
                  } transition-all duration-700 text-lg fa-solid fa-caret-down`}
                ></i>
              </div>

              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  question === 4
                    ? "max-h-[500px] py-3 px-5"
                    : "max-h-0 py-0 px-5"
                } bg-[#333333] font-light`}
              >
                <p>
                  O primeiro passo é criar uma conta! Depois disso, acessar a
                  página "Quero Doar", e cadastrar as informações do animal,
                  como nome, fotos, características e informações de contato.
                  Após a publicação, os adotantes poderão visualizar o perfil do
                  pet e entrar em contato com você de acordo com as preferências
                  que você definir.
                </p>
              </div>
            </li>
            <li
              className="border-[#363636] border-1"
              onClick={() => handleQuestion(5)}
            >
              <div className="bg-linear-to-r from-[#282828] via-[#292929] to-[#303030] w-full flex justify-between items-center bg-bgBlack py-3 px-5 cursor-pointer">
                <h4 className="text-lg font-medium">
                  Posso escolher quem vai adotar o pet?
                </h4>
                <i
                  className={`${
                    question === 5 ? "rotate-180" : ""
                  } transition-all duration-700 text-lg fa-solid fa-caret-down`}
                ></i>
              </div>

              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  question === 5
                    ? "max-h-[500px] py-3 px-5"
                    : "max-h-0 py-0 px-5"
                } bg-[#333333] font-light`}
              >
                <p>
                  Sim! Você pode decidir se quer exibir seu contato para todos
                  ou se prefere receber solicitações e aprovar manualmente quem
                  poderá falar com você. Isso permite que você avalie o perfil
                  do adotante antes de iniciar uma conversa e decidir, com
                  calma, se quer seguir com a adoção.
                </p>
              </div>
            </li>
            <li
              className="border-[#363636] border-1"
              onClick={() => handleQuestion(6)}
            >
              <div className="bg-linear-to-r from-[#282828] via-[#292929] to-[#303030] w-full flex justify-between items-center bg-bgBlack py-3 px-5 cursor-pointer">
                <h4 className="text-lg font-medium">
                  Preciso ser ONG para doar um animal?
                </h4>
                <i
                  className={`${
                    question === 6 ? "rotate-180" : ""
                  } transition-all duration-700 text-lg fa-solid fa-caret-down`}
                ></i>
              </div>

              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  question === 6
                    ? "max-h-[500px] py-3 px-5"
                    : "max-h-0 py-0 px-5"
                } bg-[#333333] font-light`}
              >
                <p>
                  Não. Qualquer pessoa pode cadastrar um pet para doação, desde
                  que se responsabilize pelas informações fornecidas e tenha
                  boas intenções no processo. ONGs, protetores independentes e
                  tutores individuais são todos bem-vindos na plataforma.
                </p>
              </div>
            </li>
          </ul>
        </motion.article>
        <motion.article
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <h3 className="text-2xl mb-4">Plataforma</h3>
          <ul className="flex flex-col gap-2">
            <li
              className="border-[#363636] border-1"
              onClick={() => handleQuestion(7)}
            >
              <div className="bg-linear-to-r from-[#282828] via-[#292929] to-[#303030] w-full flex justify-between items-center bg-bgBlack py-3 px-5 cursor-pointer">
                <h4 className="text-lg font-medium">
                  Meus dados ficam visíveis para outras pessoas?
                </h4>
                <i
                  className={`${
                    question === 7 ? "rotate-180" : ""
                  } transition-all duration-700 text-lg fa-solid fa-caret-down`}
                ></i>
              </div>

              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  question === 7
                    ? "max-h-[500px] py-3 px-5"
                    : "max-h-0 py-0 px-5"
                } bg-[#333333] font-light`}
              >
                <p>
                  Seus dados pessoais ficam protegidos e só são compartilhados
                  com o outro usuário quando você autoriza o contato. Você pode
                  controlar quem vê suas informações, garantindo privacidade e
                  segurança durante todo o processo.
                </p>
              </div>
            </li>
            <li
              className="border-[#363636] border-1"
              onClick={() => handleQuestion(8)}
            >
              <div className="bg-linear-to-r from-[#282828] via-[#292929] to-[#303030] w-full flex justify-between items-center bg-bgBlack py-3 px-5 cursor-pointer">
                <h4 className="text-lg font-medium">
                  A plataforma interfere no processo de adoção?
                </h4>
                <i
                  className={`${
                    question === 8 ? "rotate-180" : ""
                  } transition-all duration-700 text-lg fa-solid fa-caret-down`}
                ></i>
              </div>

              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  question === 8
                    ? "max-h-[500px] py-3 px-5"
                    : "max-h-0 py-0 px-5"
                } bg-[#333333] font-light`}
              >
                <p>
                  Não. A plataforma atua apenas como um meio para conectar os
                  doadores e adotantes, facilitando o contato entre as partes.
                  Todo o processo de adoção é feito diretamente entre o doador e
                  o adotante, sem interferência da plataforma.
                </p>
              </div>
            </li>
          </ul>
        </motion.article>
      </div>
    </section>
  );
};

export default Faq;
