interface Props {
  text: string;
  modal?: boolean;
}

const InputWarning = ({ text, modal }: Props) => {
  return (
    <div
      className={`w-full max-w-sm mt-4 p-2 md:p-3 bg-[#242424] text-white rounded-xl rounded-tl-none shadow-lg absolute z-10 ${
        modal
          ? "bottom-[-72px] md:bottom-[-82px]"
          : "bottom-[-90px] md:bottom-[-100px]"
      }`}
    >
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
};

export default InputWarning;
