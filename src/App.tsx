import { KeyboardEvent, MouseEvent, useCallback, useEffect, useState } from 'react';

interface User {
  id: number;
  username: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState<number>(0);

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

  return (
    <>
      <h1>{count}</h1>
      <button onClick={addTwo}>Add 2</button>
    </>
  );
}

export default App;
