import { useState } from "react"
function TestRefTypes(){
  //state
  const [user,setUser] = useState({username:"Lokesh",age:20,city:"Hyd"});
  const [marks,setMarks] = useState([10,20,30]);

  //update user state
  const updateUser = ()=>{
    setUser({...user,username:"Naniiiii"});

  };

  //update marks
  const updateMarks= ()=>{
    setMarks([40,...marks]);
  };
  return (
    <div className="text-center">
      <p>Username:{user.username}</p>
      <button onClick={updateUser} className="p-3 bg-amber-400">UpdateUser</button>
      <button>  </button>
    </div>
  )
}
export default TestRefTypes;