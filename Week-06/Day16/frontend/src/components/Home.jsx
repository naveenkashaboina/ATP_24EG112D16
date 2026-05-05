import { useContext } from "react";
import { counterContextObj } from "../contexts/contextProvider";
import { useCounterStore } from "../store/CounterStore";
import Test from "./Test";

function Home() {
  console.log("Home");
  //call useCounterStore hook to get state of Zustand store
  let {newCounter,incrementCounter,decrementCounter}= useCounterStore();
 
  const {counter,counter1,changeCounter,changeCounter1}= useContext(counterContextObj);
  return (
    <div>
    <div>
      <h1 className="text-4xl">Counter:{counter}</h1>
      <button onClick={changeCounter} className="bg-amber-400 p-3">+</button>
    </div>
    <div>
      <h1 className="text-4xl">NewCounter:{newCounter}</h1>
      <button onClick={incrementCounter} className="bg-blue-400 p-3">+</button>
      <button onClick={decrementCounter} className="bg-amber-400 p-3">-</button>
    </div>
    <Test/>
    </div>

  )
}

export default Home;