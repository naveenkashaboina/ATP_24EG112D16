import { useContext } from "react";
import { counterContextObj } from "../contexts/contextProvider";
import { useCounterStore } from "../store/CounterStore";

function Test() {
  console.log("Test");
   let newCounter1= useCounterStore((state)=>state.newCounter1);
   let incrementCounter1= useCounterStore((state)=>state.incrementCounter1);
  const {counter1,changeCounter1}= useContext(counterContextObj);
  return (
    <div>
     <div>
      <h1 className="text-4xl">Counter:{counter1}</h1>
      <button onClick={changeCounter1} className="bg-amber-400 p-3">+</button>
    </div>
     <div>
      <h1 className="text-4xl">NewCounter1:{newCounter1}</h1>
      <button onClick={incrementCounter1} className="bg-red-400 p-3">+</button>
    </div>
    </div>
  )
}

export default Test