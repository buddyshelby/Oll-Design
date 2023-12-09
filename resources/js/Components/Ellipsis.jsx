import React, { useState } from "react";

const EllipsisText = ({ text, maxWords = 30, expand }) => {
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
        </div>
    );
};

export default EllipsisText;
