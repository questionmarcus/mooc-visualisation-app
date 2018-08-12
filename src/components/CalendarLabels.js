import React from "react";

export const dayLabel = (year,yScale,yearScale,cellSize,cellGap) => 
    ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day,ind) =>
        <text
            key={"dayTag-"+day+"-"+year}
            x="15"
            y={yScale(ind)+yearScale(year)+cellSize-cellGap}
            fontSize="12px"
        >
            {day}
        </text>
    );

export const monthLabel = (year,xScale,weekNum,yScale,yearScale) =>
    ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(
        (month,ind) => {let startMonth = new Date(Date.UTC(year,ind,1,0,0,0));
            return (
                <text
                    key={"monthTag-"+month+"-"+year}
                    x={xScale(weekNum(startMonth))}
                    y={yScale(0)-5+yearScale(startMonth.getFullYear())}
                    fontSize="12px"
                >
                    {month}
                </text>
            );});

export const yearLabel = (year,xScale,yScale,yearScale) =>
    <text
        key={"yearTag-"+year}
        x={xScale(0)}
        y={yScale(0)-20+yearScale(year)}
        fontSize="16px"
    >
        {year}
    </text>;

export default {dayLabel,monthLabel};
