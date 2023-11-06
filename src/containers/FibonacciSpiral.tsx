import { useEffect, useMemo, useState } from "react";
import { describeArc } from "../utils/utils";
import { ArcRectangle } from "../components/ArcRectangle";
import { MaxModContext } from "../utils/const";
import { useDebounce } from "../utils/hooks/useDebounce";

export type TDataElement = {
    x: number, y: number, value: number, path: string
}

const svgStyle = { backgroundColor: "white", margin: "10px", border: "1px solid gray" };

export const FibonacciSpiral: React.FC<{ iterationsCount: number }> = ({ iterationsCount }) => {
    const [modMax, setModMax] = useState<number>(1);
    const [minSize, setMinSize] = useState<number | null>(null);


    const reportWindowSize = useDebounce(() => {
        setMinSize(Math.min(window.innerWidth, window.innerHeight) - 43);
    }, 100);

    useEffect(() => {
        reportWindowSize();
        window.addEventListener('resize', reportWindowSize);

        return () => { window.removeEventListener('resize', reportWindowSize); }
    }, [reportWindowSize]);

    const sequence = useMemo(() => {
        let sequence: number[] = [];

        for (let i = 0; i < iterationsCount; i++) {
            if (i === 0 || i === 1) {
                sequence[i] = 1;
            } else {
                sequence[i] = sequence[i - 1] + sequence[i - 2];
            }
        }

        return sequence
    }, [iterationsCount]);

    const data = useMemo(() => {
        let prevX = 0;
        let prevY = 0;
        const data: TDataElement[] = [];

        for (let i = 0; i < sequence.length; i++) {
            const di = sequence[i] | 0;
            const di1 = sequence[i - 1] | 0;
            const di2 = sequence[i - 2] | 0;

            const coordinateQuarter = i % 4;
            let x, y: number;
            let d: string;

            switch (coordinateQuarter) {
                case 3:
                    x = prevX - di;
                    y = prevY;
                    d = describeArc(x + di, y + di, di, 270, 360);
                    break;

                case 2:
                    x = prevX - di2;
                    y = prevY - di;
                    d = describeArc(x, y + di, di, 0, 90);
                    break;

                case 1:
                    x = prevX + di1;
                    y = prevY - di2;
                    d = describeArc(x, y, di, 90, 180);
                    break;

                default:
                    x = prevX;
                    y = prevY + di1;
                    d = describeArc(x + di, y, di, 180, 270);
                    break;
            }

            data.push({ x, y, value: di, path: d });
            prevX = x;
            prevY = y;
        }

        const { x, y, value: di } = data[data.length - 1];
        const modMax = Math.max(x >= 0 ? x + di : Math.abs(x), y >= 0 ? y + di : Math.abs(y));

        setModMax(modMax);

        return data;
    }, [sequence])

    const spiral = useMemo(() => {
        if (minSize) {
            const a = minSize / 2;
            const transform = `translate(${a},${a}) scale(${a / modMax})`;

            return <MaxModContext.Provider value={modMax}>
                <svg width={minSize} height={minSize} style={svgStyle}>
                    <g transform={transform}>
                        {data.map((item) => (
                            <ArcRectangle key={`arc_rectangle_x${item.x}_y${item.y}`} {...item} />
                        ))}
                    </g>
                </svg>
            </MaxModContext.Provider>
        }

        return null
    }, [data, minSize, modMax]);

    return spiral
}