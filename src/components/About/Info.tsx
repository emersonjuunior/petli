import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Info = () => {
  const motionRef = useRef(null);
  const isInView = useInView(motionRef, {
    once: true,
    margin: "-130px 0px", // ativa a animação só depois de o conteúdo entrar mais
  });
  const [adoptImg, setAdoptImg] = useState(true);
  const [donateImg, setDonateImg] = useState(true);

  return (
    <section id="como-funciona" className="border-b-[#363636] border-b-2 py-15 md:py-20 lg:py-25 px-4 xl:px-0 scroll-mt-12">
      <motion.div
        ref={motionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mb-6 md:mb-8 w-fit min-w-[470px] max-w-[470px] mx-auto"
        >
          <h2 className="text-3xl md:text-5xl tracking-widest font-mont font-semibold">
            Como fun
            {isInView && (
              <Typewriter words={["ciona?"]} loop={1} typeSpeed={100} />
            )}
            {!isInView && <span className="opacity-0">ciona?</span>}
          </h2>
          <div className="h-[3px] w-[14%] md:w-[17%] bg-primaryRed"></div>
        </motion.div>
        <motion.article
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2.4, delay: 0.5 }}
          className="flex flex-col-reverse lg:flex-row gap-6 items-center"
        >
          <aside>
            {adoptImg && (
              <div className="animate-pulse w-[300px] h-[300px] md:w-lg md:h-[576px] xl:w-xl xl:h-[576px] bg-[#323232] rounded-xl"></div>
            )}
            <div
              className={`${
                adoptImg ? "hidden" : ""
              } flex items-center justify-center w-[300px] md:w-lg xl:w-xl`}
            >
              <img
                onLoad={() => setAdoptImg(false)}
                src="/how-adopt.svg"
                alt="Ilustração de pessoas adotando animais de estimação."
                className="object-cover"
              />
            </div>
          </aside>
          <div className="flex-1 md:px-4 lg:px-0">
            <h3 className="text-3xl font-semibold mb-4 md:mb-6">
              <span className="rectangle h-6"></span> Como adotar?
            </h3>
            <ul className="flex flex-col gap-5 list-disc px-2 md:px-0">
              <li>
                Crie uma{" "}
                <span className="font-medium">
                  conta gratuita ou faça login
                </span>{" "}
                na plataforma.
              </li>
              <li>
                Explore os pets disponíveis na página{" "}
                <span className="font-medium">"Quero Adotar"</span> e use os
                filtros para encontrar o companheiro ideal: espécie, gênero,
                porte e muito mais.
              </li>
              <li>
                Acesse o perfil do pet que despertou seu interesse e clique no
                botão <span className="font-medium">"Quero adotar"</span>.
              </li>
              <li>
                Ao clicar, o{" "}
                <span className="font-medium">contato com o doador</span> será
                iniciado conforme as preferências dele. Em alguns casos, a
                conversa será imediata; em outros, será necessário{" "}
                <span className="font-medium">enviar uma solicitação</span> que
                ele irá revisar.
              </li>
              <li>
                Após o primeiro contato, vocês poderão conversar e{" "}
                <span className="font-medium">alinhar os próximos passos</span>{" "}
                da adoção.
              </li>
              <li>
                Após concluir a adoção, você pode pedir ao doador que{" "}
                <span className="font-medium">marque você como adotante</span>{" "}
                do pet na plataforma. Assim, a adoção será registrada no seu
                perfil, criando um{" "}
                <span className="font-medium">
                  histórico das suas adoções e fortalecendo sua credibilidade
                </span>{" "}
                para futuras adoções e doações.
              </li>
              <span className="text-sm text-gray-400 italic">
                A plataforma apenas facilita a conexão entre as partes — o
                processo de adoção acontece diretamente entre adotante e doador.
              </span>
            </ul>
          </div>
        </motion.article>
        <hr className="text-[#505050] my-8 md:my-12" />
        <motion.article
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2.4, delay: 0.8 }}
          className="flex flex-col lg:flex-row gap-6 items-center"
        >
          <div className="flex-1 md:px-4 lg:px-0">
            <h3 className="text-3xl font-semibold mb-4 md:mb-6">
              <span className="rectangle h-6"></span> Como doar?
            </h3>
            <ul className="flex flex-col gap-5 list-disc px-2 md:px-0">
              <li>
                Crie uma{" "}
                <span className="font-medium">
                  conta gratuita ou faça login
                </span>{" "}
                na plataforma.
              </li>
              <li>
                Acesse a página{" "}
                <span className="font-medium">"Quero Doar"</span>, e preencha as
                informações do seu pet. Um{" "}
                <span className="font-medium">perfil completo e detalhado</span>{" "}
                ajuda muito na hora de encontrar um novo lar!
              </li>
              <li>
                Você{" "}
                <span className="font-medium">
                  escolhe quem pode ver seus dados de contato
                </span>
                : se preferir deixar visível,{" "}
                <span className="font-medium">qualquer usuário</span> com conta
                na plataforma pode falar com você diretamente. Mas, se quiser
                manter em sigilo, os adotantes vão{" "}
                <span className="font-medium">
                  precisar enviar uma solicitação de contato
                </span>{" "}
                — aí é só acessar a página{" "}
                <span className="font-medium">"Minhas Adoções"</span>, analisar
                com calma e decidir quem poderá ver seu contato.
              </li>
              <li>
                Após o primeiro contato, vocês poderão conversar e{" "}
                <span className="font-medium">alinhar os próximos passos</span>{" "}
                da adoção.
              </li>
              <li>
                Após concluir a adoção, você pode{" "}
                <span className="font-medium">marcar o adotante</span> do pet na
                plataforma. Isso registra a adoção no perfil dele, e a doação no
                seu perfil, ajudando a{" "}
                <span className="font-medium">
                  construir um histórico de adoções
                </span>
                , fortalecendo a credibilidade de vocês para futuras adoções ou
                doações.
              </li>

              <span className="text-sm text-gray-400 italic">
                A plataforma apenas facilita a conexão entre as partes — o
                processo de adoção acontece diretamente entre adotante e doador.
              </span>
            </ul>
          </div>
          <aside>
            {donateImg && (
              <div className="animate-pulse w-[300px] h-[300px] md:w-lg md:h-[576px] xl:w-xl xl:h-[576px] bg-[#323232] rounded-xl"></div>
            )}
            <div
              className={`${
                donateImg ? "hidden" : ""
              } flex items-center justify-center w-[300px] h-[300px] md:w-lg xl:w-xl`}
            >
              <img
                onLoad={() => setDonateImg(false)}
                src="/how-donate.svg"
                alt="Ilustração de pessoas adotando animais de estimação."
                className="object-cover scale-x-[-1]"
              />
            </div>
          </aside>
        </motion.article>
      </motion.div>
    </section>
  );
};

export default Info;
