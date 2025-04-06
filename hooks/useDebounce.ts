import { useEffect, useState } from "react";

export default function useDebounce(value: string, time = 800) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, time);

    return () => clearTimeout(timeout);
  }, [value]);

  return debouncedValue;
}
