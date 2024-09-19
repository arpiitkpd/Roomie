import React, { useState } from 'react';

function Test() {
  const [values, setValues] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();

      // Avoid adding empty strings
      if (inputValue.trim() !== "") {
        setValues([...values, inputValue.trim()]);
        setInputValue(""); // Clear input after adding
      }
    }
  };

  const handleRemove = (indexToRemove) => {
    setValues(values.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="multi-input-container">
      <div className="input-tags">
        {values.map((value, index) => (
          <div className="tag-item" key={index}>
            <span>{value}</span>
            <button type="button" onClick={() => handleRemove(index)}>x</button>
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Add a value and press enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Test;
