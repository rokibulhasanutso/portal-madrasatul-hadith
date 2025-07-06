import React from "react";
import cn from "../utils/cn";

const SelectInput = ({
  children,
  className,
  firstOption = { value: "", label: "", className: "" },
  onChange,
}) => {
  return (
    <select
      onChange={onChange}
      className={cn(
        "w-full text-center ring-2 ring-gray-700 rounded-xl flex items-center gap-2 py-3.5 px-4 bg-gray-900 outline-0 my-3.5",
        className
      )}
    >
      <option className={firstOption.className} value={firstOption.value}>
        {firstOption.label}
      </option>
      {children}
    </select>
  );
};

export default SelectInput;
