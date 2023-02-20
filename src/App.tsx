import { KeyboardEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Counter from './components/Counter';

interface User {
  id: number;
  username: string;
}

type fibFunction = (n: number) => number;

const fib: fibFunction = (n) => {
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

const myNumber: number = 37;

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('Mounting');
    console.log('Users:', users);
    return () => {
      console.log('Unmounting');
      console.log('Users:', users);
    };
  }, [users]);

  const addTwo = useCallback((event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
    setCount((prevCount) => prevCount + 2);
  }, []);

  const result = useMemo(() => fib(myNumber) , [])

  return (
    <>
    <div className="app-section">
      <h1>{count}</h1>
      <button onClick={addTwo}>Add 2</button>
      <h2>{result}</h2>
      <input ref={inputRef} type='text'/>
      <Counter>
        {(count: number) => <h1>Count: {count}</h1>}
      </Counter>

    </div>
    </>
  );
}

export default App;
