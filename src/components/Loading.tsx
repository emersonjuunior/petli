const Loading = () => {
  const randomNumber = Math.floor(Math.random() * 2) + 1;

  return (
    <div className="z-100 fixed top-0 w-screen h-screen flex items-center justify-center bg-bgBlack text-textWhite">
      {randomNumber === 1 ? (
        <img
          src="./cat-loading.gif"
          alt="Gatinho caminhando"
          className="w-xl"
        />
      ) : (
        <img
          src="./dog-loading.gif"
          alt="Cachorro caminhando"
          className="w-xl"
        />
      )}
    </div>
  );
};

export default Loading;
