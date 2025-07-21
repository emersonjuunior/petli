const MVV = () => {
  return (
    <section className="w-full bg-[#292929] pt-10 md:pt-15 lg:pt-20 pb-15 md:pb-25 lg:pb-30 border-b-[#363636] border-b-2 px-4 xl:px-0">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-center gap-20 h-[500px] items-center">
          <article className="bg-linear-to-r from-[#282828] to-[#292929] shadow-lg border-[#353535] border-1 w-[350px] h-[400px] rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer duration-400 hover:w-[420px]">
            <img
              className="mb-3 w-[100px] min-w-[100px] min-h-[100px] h-[100px]"
              src="/mission.png"
              alt="Missão"
              loading="lazy"
            />
            <h3 className="uppercase font-mont font-semibold tracking-widest text-xl mb-3">
              Missão
            </h3>
            <p className="text-center max-w-[316px]">
              Facilitar e incentivar a adoção responsável de animais, conectando
              pessoas e pets com empatia e responsabilidade.
            </p>
          </article>
          <div>
            <h2 className="text-center text-3xl md:text-[52px] tracking-widest font-mont font-semibold mb-6">
              Motivação
            </h2>
            <article className="bg-linear-to-r from-[#282828] to-[#292929] shadow-lg border-[#353535] border-1 w-[350px] h-[400px] rounded-lg p-4 flex flex-col items-center justify-center self-end cursor-pointer duration-400 hover:w-[420px]">
              <img
                className="mb-3 w-[100px] min-w-[100px] min-h-[100px] h-[100px]"
                src="/values.png"
                alt="Valores"
                loading="lazy"
              />
              <h3 className="uppercase font-mont font-semibold tracking-widest text-xl mb-3">
                Visão
              </h3>
              <p className="text-center max-w-[316px]">
                Ajudar animais a encontrarem um lar acolhedor, com carinho e
                cuidado, dando uma nova chance através da adoção.
              </p>
            </article>
          </div>
          <article className="bg-linear-to-r from-[#282828] to-[#292929] shadow-lg border-[#353535] border-1 w-[350px] h-[400px] rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer duration-400 hover:w-[420px]">
            <img
              className="mb-3 w-[100px] min-w-[100px] min-h-[100px] h-[100px]"
              src="/vision.png"
              alt="Visão"
              loading="lazy"
            />
            <h3 className="uppercase font-mont font-semibold tracking-widest text-xl mb-3">
              Valores
            </h3>
            <p className="text-center max-w-[316px]">
              Amor, empatia, responsabilidade, transparência e tecnologia a
              serviço da vida.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default MVV;
