import { useEffect, useState } from 'react';

type UseDebouncedStateReturnValue = [string, (value: string) => void];

const useDebouncedState = (initialValue: string, debouncedTime: number): UseDebouncedStateReturnValue => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, debouncedTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [debouncedTime, value]);

  return [debouncedValue, setValue];
};

export default useDebouncedState;
