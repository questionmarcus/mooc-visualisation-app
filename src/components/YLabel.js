import React from "react";

const YLabel = ({fontSize, children, height}) => {
    return (
        <text
            transform="rotate(-90)"
            textAnchor="middle"
            y="16px"
            x={-height/2}>
            {children}
        </text>
    );
};

export default YLabel;
