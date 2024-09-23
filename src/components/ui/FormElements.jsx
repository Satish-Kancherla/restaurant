import { useLayoutEffect, useEffect, useRef, useState, forwardRef } from "react";
import { cn } from "../../lib/utils";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import {
  ChevronDown,
  ChevronsDown,
  ChevronsUpDown,
  Search,
} from "lucide-react";

import { useCallback } from "react";
import Loading from "./Loading";

export const Input = forwardRef(function Input(props, ref) {
  const inputId = props.id || uuidv4();
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 pb-5 md:max-w-96",
        props.className
      )}
    >
      {props.error && (
        <p className="text-theme-danger text-xs italic absolute -mb-5">
          {props.error}
        </p>
      )}
      <input
        id={inputId}
        type={props.type || "text"} 
        ref={ref}
        {...props}
        className={cn(
          "w-full h-10 p-2 peer bg-transparent border-2  border-gray-200 rounded-lg focus:border-theme-input outline-none text-gray-700 focus:text-gray-800 font-rubik font-[350] transition duration-300"

        )}
      />
      {props.label && (
        <label
          htmlFor={inputId}
          className="peer-focus:text-theme-input text-sm text-gray-400 duration-300 select-none"
        >
          {props.label}
        </label>
      )}
    </div>
  );
})

export const Textarea = forwardRef(function Textarea(props, ref) {
  const inputId = props.id || uuidv4();
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 pb-5 md:max-w-96",
        
      )}
    >
      {props.error && (
        <p className="text-theme-danger text-xs italic absolute -mb-5">
          {props.error}
        </p>
      )}
      <textarea
        {...props}
        id={inputId}
        type={props.type || "text"}
        ref={ref}
        className={cn(
          "w-full p-2 peer bg-transparent border-2  border-gray-200 rounded-lg focus:border-theme-input outline-none text-gray-700 focus:text-gray-800 font-rubik font-[350] transition duration-300",props.className

        )}
      />
      {props.label && (
        <label
          htmlFor={inputId}
          className="peer-focus:text-theme-input text-sm text-gray-400 duration-300 select-none"
        >
          {props.label}
        </label>
      )}
    </div>
  );
})

export function Select(props) {
  const selectId = props.id || uuidv4();
  const { optionsArray } = props;
  return (
    <div className="flex items-center ">
      <div className="flex flex-col-reverse gap-2 pb-5 md:max-w-96 flex-grow">
        {props.error && (
          <p className="text-theme-danger text-xs italic absolute -mb-5">
            {props.error}
          </p>
        )}
        <select
          {...props}
          id={selectId}
          className={cn(
            "w-full bg-theme-input font-semibold text-[15px] text-theme-text text-opacity-60 focus:text-opacity-100  h-10 p-2 peer bg-transparent border border-gray-200 rounded-lg focus:border-theme-input outline-none transition duration-300",
            props.className
          )}
        >
          {optionsArray?.map((data, index) => {
            const isDefault = data.id === "" || data.value === "" ? "true" : "";
            return (
              <option
                key={index}
                disabled={isDefault}
                selected={isDefault}
                className="outline-none border-none text-theme-text hover:bg-theme-2 font-semibold"
                value={data.value || data.id}
              >
                {data.title || data.name}
              </option>
            );
          })}
        </select>
        {props.label && (
          <label
            htmlFor={selectId}
            className="peer-focus:text-theme-input text-gray-400 text-sm duration-300 select-none"
          >
            {props.label}
          </label>
        )}
      </div>
      {props.edit && props.edit}
    </div>
  );
}

export const SearchableSelect = ({
  options,
  value: initialValue,
  onChange,
  name,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const selectRef = useRef(null);

  const selectId = props.id || uuidv4();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleSelectOption = (selectedValue) => {
    setSearchTerm("");
    setIsOpen(false);
    setValue(selectedValue);
    if (onChange) {
      const obj = { target: { value: selectedValue, name } };
      onChange(obj);
    }
  };

  useLayoutEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    } else if (options.length > 0) {
      setValue(options[0].id);
    }
  }, [options, initialValue]);
  const filteredOptions = options.filter((option) =>
    option?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickInput = () => {
    setIsOpen(true);
  };
  return (
    <div className="flex items-center w-full mt-3 font-rubik">
      <div className="flex flex-col gap-2 pb-5 w-full md:max-w-96 relative">
        {props.label && (
          <label
            htmlFor={selectId}
            className="peer-focus:text-theme-input text-gray-400 text-sm duration-300 select-none"
          >
            {props.label}
          </label>
        )}
        <div className=" relative  w-full flex-grow" ref={selectRef}>
          <Button
            className="w-full h-10 p-2 text-start bg-transparent border-2 border-gray-200 rounded-lg focus:border-theme-input outline-none text-gray-500 transition duration-300 overflow-hidden active:scale-100 "
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <span className="w-full  truncate">
              {value !== undefined
                ? options.find((obj) => value === obj.id)?.name
                : "Select "}
            </span>
            <ChevronDown className=" ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
          {isOpen && (
            <div className="absolute bg-white w-full border rounded-lg p-2 z-20 shadow-lg  ">
              <div className="absolute left-4 top-4 ">
                <Search className="w-4" />
              </div>
              <input
                onClick={handleClickInput}
                type="text"
                value={searchTerm}
                className="w-full h-10 pl-8 p-2 y-2 peer bg-transparent border-2 border-gray-200 rounded-lg bg-zinc-100 focus:border-theme-input outline-none text-gray-900 transition duration-300 "
                onChange={handleSearchChange}
                placeholder="Search..."
              />
              <div className="py-2 max-h-[250px] overflow-y-auto">
                {
                  filteredOptions.length > 1 ?
                    filteredOptions.map((option) => (
                      <div
                        key={option.id}
                        className={cn(
                          "rounded-md p-1  cursor-pointer hover:bg-theme-3 hover:bg-opacity-50 my-1",
                          option.id === value && "bg-theme-3 ",
                          option.id === "" && "pointer-events-none opacity-40"
                        )}
                        onClick={() => handleSelectOption(option.id)}
                      >
                        {option.name}
                      </div>
                    ))
                    :
                    (
                      <>
                        <div className="rounded-md p-1  h-8 cursor-pointer bg-theme-3 my-1 animate-pulse"></div>
                        <div className="rounded-md p-1  h-8 cursor-pointer bg-theme-3 my-1 animate-pulse"></div>
                        <div className="rounded-md p-1  h-8 cursor-pointer bg-theme-3 my-1 animate-pulse"></div>
                      </>
                    )
                }
              </div>
            </div>
          )}
        </div>
        {props.error && (
          <p className="text-theme-danger text-xs italic absolute -bottom-0 left-1">
            {props.error}
          </p>
        )}
      </div>
      {props.edit && props.edit}
    </div>
  );
};

// export const SearchableSelect = ({ options, onChange, name, value: initialValue, label, error, id, ...props }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [value, setValue] = useState("");
//   const selectRef = useRef(null);
//   const selectId = id || uuidv4(); // Ensure uuidv4 is imported

//   // When options change, update the value if it is not yet set or if the initial value is no longer valid
//   useEffect(() => {
//     if (initialValue) {
//       setValue(initialValue);
//     } else if (options.length > 0) {
//       setValue(options[0].id); // Automatically select the first option if no initial value is provided
//     }
//   }, [options, initialValue]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (selectRef.current && !selectRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   const handleSelectOption = useCallback((selectedValue) => {
//     setSearchTerm("");
//     setIsOpen(false);
//     setValue(selectedValue);
//     if (onChange) {
//       onChange({ target: { value: selectedValue, name } });
//     }
//   }, [onChange, name]);

//   const handleSearchChange = useCallback((e) => {
//     setSearchTerm(e.target.value);
//     setIsOpen(true);
//   }, []);

//   const handleClickInput = useCallback(() => {
//     setIsOpen(true);
//   }, []);

//   const filteredOptions = options.filter(option =>
//     option.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex items-center w-full mt-3">
//       <div className="flex flex-col gap-2 pb-5 w-full md:max-w-96 relative">
//         {label && (
//           <label htmlFor={selectId} className="text-gray-400 text-sm">
//             {label}
//           </label>
//         )}
//         <div className="relative w-full flex-grow" ref={selectRef}>
//           <Button
//             className="w-full h-10 p-2 text-start bg-transparent border-2 border-gray-200 rounded-lg focus:border-theme-input outline-none text-gray-900 transition duration-300 overflow-hidden"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <span className="w-full truncate">
//               {options.find(obj => obj.id === value)?.name || "Select"}
//             </span>
//             <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//           {isOpen && (
//             <div className="absolute bg-white w-full border rounded-lg p-2 z-20 shadow-lg">
//               <div className="absolute left-4 top-4">
//                 <Search className="w-4" />
//               </div>
//               <input
//                 type="text"
//                 value={searchTerm}
//                 className="w-full h-10 pl-8 p-2 bg-zinc-100 peer bg-transparent border-2 border-gray-200 rounded-lg focus:border-theme-input outline-none text-gray-900 transition duration-300"
//                 onChange={handleSearchChange}
//                 placeholder="Search..."
//                 onClick={handleClickInput}
//               />
//               <div className="py-2 h-[250px] overflow-y-auto">
//                 {filteredOptions.map(option => (
//                   <div
//                     key={option.id}
//                     className={`rounded-md p-1 cursor-pointer hover:bg-theme-3 hover:bg-opacity-50 my-1 ${option.id === value ? "bg-theme-3" : ""}`}
//                     onClick={() => handleSelectOption(option.id)}
//                   >
//                     {option.name}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//         {error && (
//           <p className="text-theme-danger text-xs italic absolute -bottom-5 left-0">
//             {error}
//           </p>
//         )}
//       </div>
//       {props.edit && props.edit}
//     </div>
//   );
// };

export function Checkbox(props) {
  const inputId = props.id || uuidv4();
  return (
    <div className="flex items-center justify-center gap-2">
      <input
        id={inputId}
        type="checkbox"
        name={props.name}
        className={cn(
          " h-4 w-4 p-2 peer bg-transparent border-2 border-gray-200 rounded-lg focus:border-theme-input outline-none text-gray-900 transition duration-300",
          props.className
        )}
        checked={props.value}
        onChange={props.onChange}
      // {...props}
      />
      {props.label && (
        <label
          htmlFor={inputId}
          className="peer-checked:text-theme-input text-gray-400 duration-300 select-none"
        >
          {props.label}
        </label>
      )}
      {props.error && (
        <p className="text-theme-danger text-xs italic">{props.error}</p>
      )}
    </div>
  );
}

export function Radio(props) {
  const inputId = props.id || uuidv4();
  return (
    <div className="flex items-center justify-center gap-1">
      <input
        {...props}
        id={inputId}
        type="radio"
        className={cn(
          " h-4 w-4 p-2 peer bg-transparent border-2 border-gray-200 rounded-lg focus:border-theme-input outline-none text-gray-900 transition duration-300",
          props.className
        )}
      />
      {props.label && (
        <label
          htmlFor={inputId}
          className="peer-checked:text-theme-input text-xs text-gray-400 duration-300 select-none"
        >
          {props.label}
        </label>
      )}
    </div>
  );
}
export function RadioGroup(props) {
  return (
    <div className=" justify-center  h-10 p-2 pb-5 md:max-w-96 mb-8">
      {props.label && (
        <div className="peer-checked:text-theme-input text-sm text-gray-400 duration-300 select-none">
          {props.label}
        </div>
      )}
      <div className={cn("h-12 ", props.className)}>{props.children}</div>
      {props.error && (
        <p className="text-theme-danger text-2xs italic absolute -mb-">
          {props.error}
        </p>
      )}
    </div>
  );
}
