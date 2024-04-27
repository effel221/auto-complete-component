import { useEffect, useRef, useState } from "react";

type Timer = ReturnType<typeof setTimeout>;

export const useDebounce = (value: string, delay = 500):string => {
    const [debouncedValue, setDebouncedValue] = useState<string>("");
    const timerRef = useRef<Timer>();

    useEffect(() => {
        timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [value, delay]);

    return debouncedValue;
};
