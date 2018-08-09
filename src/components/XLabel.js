import React from "react";

const XLabel = ({fontSize, children}) => {
    return (
        <text 
            fontSize={fontSize}
            x="50%"
            y="100%"
            dy="-8px"
            textAnchor="middle">
            {children}
        </text>
    );
};

export default XLabel;
