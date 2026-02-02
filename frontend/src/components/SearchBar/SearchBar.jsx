import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function SearchBar({ value, onChange, onClearSearch }) {
  return (
    // <div>SearchBar is here</div>
    <div className="w-full md:w-80 flex items-center justify-between px-3 bg-slate-100 rounded-lg">
      <input
        type="text"
        placeholder="Search notes!"
        value={value}
        className="w-full text-sm bg-transparent py-2 outline-none "
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-xl text-slate-400 cursor-pointer hover:text-black mr-3"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass className="cursor-pointer text-slate-400 hover:text-black" />
    </div>
  );
}
