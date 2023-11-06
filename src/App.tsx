import { FibonacciSpiral } from './containers/FibonacciSpiral';
import { useCallback, useState } from 'react';
import { contentStyle, numericInputStyleConfig } from './App.styles';
import NumericInput from 'react-numeric-input';
import { maxIterationCount } from './utils/const';

const App: React.FC = () => {
    const [numberValue, setNumberValue] = useState<number>(1);
    const onChange = useCallback((value: number | null) => {
        if (value && value <= maxIterationCount) {
            if (value < 1) {
                setNumberValue(1)
            } else {
                setNumberValue(value)
            }

        } else {
            value ? setNumberValue(maxIterationCount) : setNumberValue(1);
        }
    }, []);

    return <div style={contentStyle}>
        <NumericInput
            inputMode="numeric"
            defaultValue={numberValue as number}
            value={numberValue}
            min={1}
            max={maxIterationCount}
            precision={0}
            step={1}
            onChange={onChange}
            style={numericInputStyleConfig}
            mobile
            maxLength={2}
        />
        <FibonacciSpiral iterationsCount={numberValue} />
    </div>
}

export default App;


