import noAvailablePets from "../assets/no-available-pets.json";
import Lottie from "lottie-react";

interface Props {
  text: string;
}

const NoPets = ({ text }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-center relative">
        <Lottie
          animationData={noAvailablePets}
          className="w-[420px] min-w-[420px]"
        />
        <p className="font-[400] text-3xl text-center absolute bottom-8">
          {text}
        </p>
      </div>
    </div>
  );
};

export default NoPets;
