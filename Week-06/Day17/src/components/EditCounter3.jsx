import { useContext } from "react";
import { counterContextObj } from "../context/contextProvider";

function EditCounter3() {
  const { counter, increment, decrement } = useContext(counterContextObj);

  return (
    <div className="bg-blue-600 rounded-2xl shadow-lg p-6 w-40 text-center">
      
      <h1 className="text-lg text-cyan-200 mb-3">
        Counter 03
      </h1>

      {/* merged into one container */}
      <h1 className="text-3xl text-yellow-300 mb-4">{counter}</h1>

      <div className="flex justify-center gap-4">
        <button
          onClick={increment}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
        >
          +
        </button>

        <button
          onClick={decrement}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
        >
          -
        </button>
      </div>

    </div>
  );
}

export default EditCounter3;
