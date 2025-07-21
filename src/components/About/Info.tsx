const Info = () => {
  return (
    <section className="border-b-[#363636] border-b-2 py-15 md:py-20 lg:py-25 px-4 xl:px-0">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-5xl tracking-widest font-mont font-semibold mb-6">
          Como funciona?
        </h2>

        <article>
          <ul>
            <h3 className="text-2xl font-semibold mb-4">Como adotar?</h3>
            <li>Crie uma conta gratuita ou faça login na plataforma.</li>
            <li>
              Explore os pets disponíveis na página{" "}
              <strong>"Quero Adotar"</strong> e use os filtros para encontrar o
              companheiro ideal: espécie, gênero, porte e muito mais.
            </li>
            <li>
              Acesse o perfil do pet que despertou seu interesse e clique no
              botão <strong>"Quero adotar"</strong>.
            </li>
            <li>
              Ao clicar, o contato com o doador será iniciado conforme as
              preferências dele. Em alguns casos, a conversa será imediata; em
              outros, será necessário enviar uma solicitação que ele irá
              revisar.
            </li>
            <li>
              Após o primeiro contato, vocês poderão conversar e alinhar os
              próximos passos da adoção.
            </li>
            <li>
              Após concluir a adoção, você pode pedir ao doador que marque você
              como adotante do pet na plataforma. Assim, a adoção será
              registrada no seu perfil, criando um histórico das suas adoções e
              fortalecendo sua credibilidade para futuras adoções e doações.
            </li>
            <span className="text-sm text-gray-400 italic">
              A plataforma apenas facilita essa conexão — o processo de adoção
              acontece diretamente entre adotante e doador.
            </span>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default Info;
