interface Props {
  msg: string;
}

const Success = ({ msg }: Props) => {
  return (
    <div className="fixed bottom-10 left-16 w-[300px] md:w-[350px] h-[65px] flex justify-around items-center bg-[#edfbd8] border border-[#84d65a] rounded px-0 py-1 font-light shadow-[4px_4px_10px_-10px_rgba(0,0,0,1)] transform animate-notification animate-delay-[3s]">
      <div className="flex items-center justify-center mx-3 rounded-full p-[6px] bg-bgBlack">
        <i className="fa-solid fa-paw text-lg"></i>
      </div>
      <div className="text-[#2b641e] font-medium">{msg}</div>

      <div className="ml-auto cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="w-6 h-6 text-gray-500"
        >
          <path
            d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
            className="fill-current"
          ></path>
        </svg>
      </div>

      <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#05dd34] animate-timer-animation"></div>
    </div>
  );
};

export default Success;
