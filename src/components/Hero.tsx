const Hero = () => {
  return (
    <section className="relative min-h-[92vh] w-screen bg-[url('/kittens.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="absolute inset-0 bg-bgBlack/91 border-b-[#363636] border-b-2"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-white h-full px-4 text-center"></div>
    </section>
  );
};

export default Hero;
