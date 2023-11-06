import { useContext } from "react";
import { MaxModContext, rectLineColor } from "../utils/const";


export interface IRectangle {
    x: number;
    y: number;
    value: number;
}

export const Rectangle: React.FC<IRectangle> = ({ x, y, value }) => {
    const modMax = useContext(MaxModContext);

    return <rect
        key={`rectangle_x${x}_y${y}`}
        stroke={rectLineColor}
        strokeWidth={modMax / 250}
        fill="none"
        x={x}
        y={y}
        width={value}
        height={value}
    />
}