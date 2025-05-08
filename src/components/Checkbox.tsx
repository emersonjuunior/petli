interface Props {
  title: string;
  text: string;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Checkbox = ({ title, text, checked, setChecked }: Props) => {
  return (
    <label className="flex flex-row items-center gap-2.5 dark:text-white light:text-black cursor-pointer">
      <input
        id="hr"
        type="checkbox"
        className="peer hidden"
        checked={checked}
        onChange={() => setChecked((prev) => !prev)}
      />
      <div className="h-5 w-5 min-w-5 min-h-5 flex rounded-md border border-[#a2a1a833] light:bg-[#e8e8e8] dark:bg-[#212121] peer-checked:bg-[#614cfc] transition self-start mt-1">
        <svg
          className={`${checked ? "block" : "hidden"} pl-[1px]`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
        </svg>
      </div>
      <p className="text-xs md:text-sm">
        <span className="text-sm md:text-base font-medium">{title}</span> <br /> {text}
      </p>
    </label>
  );
};

export default Checkbox;
