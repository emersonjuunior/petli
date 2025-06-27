import noAvailablePets from "../assets/no-available-pets.json";
import Lottie from "lottie-react";

interface Props {
  text: string;
  small?: string;
}

const NoPets = ({ text, small }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-center relative">
        <Lottie
          animationData={noAvailablePets}
          className="w-[420px] min-w-[420px]"
        />
        <p className={`${small === "true" ? "text-lg md:text-2xl max-w-xl bottom-0 md:bottom-2" : "text-3xl bottom-8"} font-[400] text-center absolute`}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default NoPets;
