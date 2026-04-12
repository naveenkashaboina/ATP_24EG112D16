import { useState,createContext } from "react"

//create context provider object
export const counterContextObj = createContext();

function ContextProvider({children}) {
  //state
  const [counter,setCounter] = useState([0]);
  //functions to change state
  const increment=()=>{
    setCounter(counter+1);
  }
  const decrement=()=>{
    setCounter(counter-1);
  }
  return (
    <counterContextObj.Provider value = {{counter,increment,decrement}}>
      {children}
    </counterContextObj.Provider>
  )
}

export default ContextProvider;