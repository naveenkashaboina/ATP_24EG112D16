import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function ListOfEmps() {
  const [emps, setEmps] = useState([]);
  const navigate = useNavigate();

  const gotoEmployee = (empObj)=>{
    //navigate tp/ employee
    navigate("/employee",{state:empObj});
  }
  
  const gotoEditEmployee = (empObj)=>{
    //navigate to /employee along with selected emp obj
    navigate("/edit-emp",{state:empObj});
  }
  
  const deleteEmpByID = async(id)=>{
    let res = await axios.delete(`http://localhost:3000/employee-api/employee/${id}`);
    if(res.status===200){
      //get latest emps data;
      getEmps();
    }
  }
  //get all emps
  async function getEmps() {
      let res = await fetch("http://localhost:3000/employee-api/employees");
      if (res.status === 200) {
        let resObj = await res.json();
        console.log((resObj))
        setEmps(resObj.payLoad);
      }
    }
  useEffect(() => {
  
    getEmps();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center mb-4">List of Employees</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {emps?.map((empObj) => (
          <div key={empObj._id} className=" bg-white p-5">
            <p>{empObj.email}</p>
            <p className="mb-3">{empObj.name}</p>
            <div className="flex justify-around gap-2">
        <button onClick={()=>gotoEmployee(empObj)} className="bg-green-400 p-2 rounded-2xl text-white">view</button>
        <button onClick={()=>gotoEditEmployee(empObj)} className="bg-orange-400 p-2 rounded-2xl text-white">Edit</button>
        <button onClick={()=>deleteEmpByID(empObj._id)} className="bg-red-400 p-2 rounded-2xl text-white">Delete</button>
      </div>
          </div>
        ))}
    
      
    </div>
    </div>
  );
}

export default ListOfEmps;