import { useState } from "react";

function Counter(){
  //state
  const [count, setCount] = useState(0);
  //event handler functions to modify the state
  const increment = () =>{
    setCount(count + 1);
  }
  const decrement= ()=>{
    setCount(count-1);
  }
   const reset= (value)=>{
    setCount(value);
  }
  console.log("counter component");
  return(
    <div className="text-center p-10 border">
      <h1 className="text-6xl">Count:{count}</h1>
      <button>+</button>
      <button>-</button>
      <button onClick={()=>reset(0)}>reset</button>
    </div>
  )
}
export default Counter;