interface Props {
    text: string
}

const InputWarning = ({text} : Props) => {

  return (
    <div className="w-full max-w-sm mt-4 p-2 md:p-3 bg-[#242424] text-white rounded-xl rounded-tl-none shadow-lg absolute z-10 bottom-[-85px] md:bottom-[-90px]">
      <p className="text-sm font-medium">
        {text}
      </p>
    </div>
  );
};

export default InputWarning;
