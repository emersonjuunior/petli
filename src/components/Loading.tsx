import Lottie from "lottie-react";
import loadingDog from "../assets/loading-dog.json";

const Loading = () => {
  const randomNumber = 2;

  return (
    <div className="z-100 fixed top-0 w-screen h-screen flex items-center justify-center bg-bgBlack text-textWhite">
      {randomNumber && (
        <Lottie animationData={loadingDog} className="w-xs scale-x-[-1] z-10" />
      )}
    </div>
  );
};

export default Loading;
