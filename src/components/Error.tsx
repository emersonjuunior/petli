interface Props {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
 
}

const Error = ({ error, setError }: Props) => {
  return (
    <>
      {error && (
        <div
          className={`flex items-center justify-between px-2 md:p-4 min-h-fit h-[50px] bg-red-100 border-l-4 border-red-500 text-red-700 shadow-md rounded-lg `}
        >
          <div className="flex items-center">
            <span className="font-medium mr-2 text-sm md:text-base">{error}</span>
          </div>
          <i
            className="fa-solid fa-xmark cursor-pointer md:text-lg"
            onClick={() => setError(null)}
          ></i>
        </div>
      )}
    </>
  );
};

export default Error;
