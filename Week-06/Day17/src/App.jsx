import ContextProvider from "./context/contextProvider";
import EditCounter1 from "./components/EditCounter1";
import EditCounter2 from "./components/EditCounter2";
import EditCounter3 from "./components/EditCounter3";

function App() {
  return (
    <ContextProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-orange-300">
        
        <h1 className="text-2xl font-bold mb-6">Shared Counter App</h1>
        
        {/* On small screens: 2 counters side by side, 3rd centered below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <EditCounter1 />
          <EditCounter2 />
          {/* Wrap the 3rd counter in a flex div to center it */}
          <div className="sm:col-span-2 md:col-span-1 flex justify-center">
            <EditCounter3 />
          </div>
        </div>

      </div>
    </ContextProvider>
  );
}

export default App;
