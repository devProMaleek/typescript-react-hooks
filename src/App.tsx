import { useState } from 'react';

interface User {
  id: number;
  username: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState<number>(0);

  return <></>;
}

export default App;
