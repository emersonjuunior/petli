interface Props {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const Error = ({ error, setError }: Props) => {
  return (
    <>
      {error && (
        <div className="flex items-center justify-between p-4 mb-4 h-[50px] bg-red-100 border-l-4 border-red-500 text-red-700 shadow-md rounded-lg">
          <div className="flex items-center">
            <span className="font-medium">{error}</span>
          </div>
          <i
            className="fa-solid fa-xmark cursor-pointer text-lg"
            onClick={() => setError(null)}
          ></i>
        </div>
      )}
    </>
  );
};

export default Error;
