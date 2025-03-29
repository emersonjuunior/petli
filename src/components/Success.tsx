interface Props {
  msg: string;
}

const Success = ({ msg }: Props) => {
  return (
    <div className="fixed bottom-10 left-6 md:left-16 w-[300px] md:w-[380px] h-[70px] flex items-center bg-[#edfbd8] border border-[#84d65a] rounded px-2 py-2 font-light shadow-[4px_4px_10px_-10px_rgba(0,0,0,1)] transform animate-notification animate-delay-[3s] z-50">
      <div className="flex items-center justify-center rounded-full mr-3 p-[6px] bg-bgBlack">
        <i className="fa-solid fa-paw text-lg"></i>
      </div>
      <div
        className={`text-[#2b641e] font-medium ${
          msg.length > 70 ? "text-sm" : ""
        }`}
      >
        {msg}
      </div>
      <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#05dd34] animate-timer-animation"></div>
    </div>
  );
};

export default Success;
