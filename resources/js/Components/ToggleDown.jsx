import React from "react";

export default function ToggleDown() {
    return (
        <div>
            {/* <style>
                {`
                    .icon-tabler-circle-chevron-down:hover {
                        stroke: #e74c3c;
                    }
                `}
            </style> */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-circle-chevron-down"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />{" "}
                <path d="M15 11l-3 3l-3 -3" />{" "}
                <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18z" />{" "}
            </svg>
        </div>
    );
}
