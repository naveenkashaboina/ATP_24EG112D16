import { useState,useEffect } from "react";

function APIDemo(){
  const [users,setUsers]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);

  useEffect(()=>{
    console.log("Use effect executed.");
    async function getData(){
      //set loading to true
      setLoading(true);
      try{
        let res = await fetch("https://jsonplaceholder.typicode.com/users");
        let usersList = await res.json();
        //update state
        setUsers(usersList);
      }
      catch(err){
        console.log("err is:",err);
      
      //update error
      setError(err);
      }
      finally{
        setLoading(false);
      }
    }
    //call 
    getData();
  },[]);
  console.log("API demo rendered.");
  //deal with loading state
  if(loading){
    return <p className="text-center text-5xl">Loading...</p>
  }
  //deal with error state
 if(error!=null){
  return <p className="text-center text-red-600 text-5xl">{error.message}</p>
 }
  return (
    <div>
      <h2 className="text-center text-4xl text-blue-400">List of users</h2>
      <div>
      {users.map(userObj=>(
        <div key={userObj.id}>
           <p>{userObj.name}</p>
           <p>{userObj.email}</p>
       </div>
      )
      )}
      </div>
    </div>
  )
}
export default APIDemo;