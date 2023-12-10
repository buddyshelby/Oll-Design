import React, { useState } from "react";

const EllipsisText = ({ text, maxWords = 50 }) => {
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const truncatedText = () => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + " ...";
    }
    return text;
  };

  return (
    <div>
      <p>{expand ? text : truncatedText()}</p>
      {text.split(" ").length > maxWords && (
        <button onClick={toggleExpand}>
          {expand ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default EllipsisText;
