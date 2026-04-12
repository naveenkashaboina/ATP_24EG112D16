import { useState } from "react";
import Users from "./components/Users";
import UserCount from "./components/UserCount";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-300">
      
      <h1 className="text-3xl font-bold mb-5">User App</h1>

      <UserCount count={count} />

      <Users increment={increment} />
    </div>
  );
}

export default App;