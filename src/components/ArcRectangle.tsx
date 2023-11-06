import { IRectangle, Rectangle } from "./Rectangle";
import { Arc, IArc, } from "./Arc";

interface IArcRectangle extends IArc, IRectangle {}

export const ArcRectangle: React.FC<IArcRectangle> = ({ path,...rest }) => {
    return <>
        <Rectangle {...rest} />
        <Arc path={path} />
    </>
}