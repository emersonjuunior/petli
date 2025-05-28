interface Props {
  msg: string;
}

const Warning = ({ msg }: Props) => {
  return (
    <>
      {msg && (
        <div
          className={`flex items-center px-2 md:p-4 min-h-fit h-[50px] bg-[#3b1f1f] border-l-4 border-[#ff5c5c] text-[#ff5c5c] shadow-md rounded-lg`}
        >
          <div className="flex items-center">
            <i className="fa-solid fa-triangle-exclamation mr-2 md:text-lg"></i>
            <span className="font-medium text-sm md:text-base">{msg}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Warning;
