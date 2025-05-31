import React from "react";
import cn from "../utils/cn";

const TextInputArea = ({
  label,
  insideLabel,
  placeholder,
  areaClassName,
  borderClassName,
  inputClassName,
  defaultValue,
  value,
  onChange,
  ...rest
}) => {
  const inputProps = {
    type: "text",
    id: "input",
    placeholder,
    onChange,
    ...rest,
  };

  if (value !== undefined) {
    inputProps.value = value;
  } else {
    inputProps.defaultValue = defaultValue;
  }

  return (
    <div className={cn("space-y-2.5 my-5", areaClassName)}>
      {label && (
        <label htmlFor="input" className="block">
          {label}
        </label>
      )}
      <div
        className={cn(
          "ring-2 ring-gray-700 rounded-xl flex items-center p-2 bg-gray-900",
          borderClassName
        )}
      >
        {insideLabel && <label htmlFor="input">{insideLabel}</label>}
        <textarea
          {...inputProps}
          className={cn("w-full outline-0 ml-2", inputClassName)}
        />
      </div>
    </div>
  );
};

export default TextInputArea;
