import React from "react";
import {range} from "d3-array";

const colourBar = (barWidth,figWidth,figHeight,min,max,colourScheme) => {
    return (
        <React.Fragment>
            <defs>
                <linearGradient id="colourBar" x1="0" x2="1" y1="0" y2="0">
                    {range(0,1.01, 0.05).map(num => 
                        <stop offset={(num*100)+"%"} stopColor={colourScheme(num)}/>
                    )}
                </linearGradient>
            </defs>
            <rect
                x={(figWidth-barWidth)/2}
                y={(figHeight+10)}
                width={barWidth}
                height={30}
                fill="url(#colourBar)" />
            <text
                x={(figWidth-barWidth)/2}
                dy="-4"
                y={figHeight+10}
                fontSize="14px"
                textAnchor="start"
            >
      Number of Active Daily Users
            </text>
            <text
                x={(figWidth-barWidth)/2}
                dx="-5"
                y={figHeight+30}
                fontSize="12px"
                textAnchor="end"
            >
                {min}
            </text>
            <text
                x={(figWidth+barWidth)/2}
                dx="5"
                y={figHeight+30}
                fontSize="12px"
                textAnchor="start"
            >
                {max}
            </text>
        </React.Fragment>
    );
};

export default colourBar;
