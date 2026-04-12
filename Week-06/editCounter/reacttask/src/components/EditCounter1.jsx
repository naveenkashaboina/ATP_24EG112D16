import { useContext } from "react";
import { counterContextObj } from "../context/contextProvider";

function EditCounter1() {
  const { counter, increment, decrement } = useContext(counterContextObj);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-40 text-center hover:shadow-2xl transition duration-300">
      
      <h1 className="text-lg font-semibold text-gray-700 mb-3">
        Counter 1
      </h1>

      <div className="bg-blue-600 text-white rounded-xl p-4">
        <h1 className="text-3xl font-bold mb-4">{counter}</h1>

        <div className="flex justify-center gap-4">
          <button
            onClick={increment}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
          >
            +
          </button>

          <button
            onClick={decrement}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
          >
            -
          </button>
        </div>
      </div>

    </div>
  );
}

export default EditCounter1;