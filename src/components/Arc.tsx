import { useContext } from "react";
import { MaxModContext, arcLineColor } from "../utils/const";


export interface IArc {
    path: string;
}

export const Arc: React.FC<IArc> = ({ path }) => {
    const modMax = useContext(MaxModContext);
    
    return <path key={`arc_path${path}`} stroke={arcLineColor} strokeWidth={(modMax*2)/250} fill="none" d={path}></path>
}