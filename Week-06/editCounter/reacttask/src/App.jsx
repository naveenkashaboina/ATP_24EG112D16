import ContextProvider from "./context/contextProvider";
import EditCounter1 from "./components/EditCounter1";
import EditCounter2 from "./components/EditCounter2";
import EditCounter3 from "./components/EditCounter3";
import EditCounter4 from "./components/EditCounter4";

function App() {
  return (
    <ContextProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-10 bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40">
          
          <EditCounter1 />
          <EditCounter2 />
          <EditCounter3 />
          <EditCounter4 />
        
        </div>

      </div>
    </ContextProvider>
  );
}

export default App;