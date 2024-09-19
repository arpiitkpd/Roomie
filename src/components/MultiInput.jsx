import React, { useState, useId } from "react";

const MultiValueInput = React.forwardRef(
  function Input({
    label,
    type = "text",
    className = "",
    className2 = "block text-xs font-semibold text-gray-600 uppercase",
    ...props
  }, ref) {
    const [values, setValues] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const id = useId();

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && inputValue.trim()) {
        setValues([...values, inputValue.trim()]);
        setInputValue("");
        e.preventDefault();
      }
    };

    const handleRemove = (valueToRemove) => {
      setValues(values.filter((value) => value !== valueToRemove));
    };

    return (
      <div>
        {label && (
          <label htmlFor={id} className={className2}>
            {label}
          </label>
        )}
        <div className="multi-input-container mt-1">
          <div className="flex flex-wrap gap-1">
            {values.map((value, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-gray-200 rounded text-sm"
              >
                {value}
                <button
                  type="button"
                  className="ml-2 text-red-600 hover:text-red-800"
                  onClick={() => handleRemove(value)}
                >
                  &times;
                </button>
              </span>
            ))}
            <input
              className={` ${className} flex-grow text-black outline-none `}
              type={type}
              ref={ref}
              {...props}
              id={id}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add values and press Enter"
            />
          </div>
        </div>
      </div>
    );
  }
);

export default MultiValueInput;
