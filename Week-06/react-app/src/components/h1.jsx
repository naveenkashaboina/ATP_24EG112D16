import { useForm } from "react-hook-form";
import { useState } from "react";

function Form(){
  const [users,setUsers] = useState([]);
  const {register,handleSubmit,formState:{errors}} = useForm();

  //form submit function
  const formSubmit=(obj)=>{
    setUsers([...users,obj]);
  }
  return(
    <div>
      <h1 className="text-center text-3xl mt-6">Create User Form</h1>
      {/* form */}
      <form className="max-w-md mx-auto mt-10" onSubmit={handleSubmit(formSubmit)}>
        <div className="mb-3" >
          <label htmlFor="firstName"> firstName:</label>
          <input type="text" {...register("firstName",
            {
              required:"First name  required",
              validate:(v)=>v.trim().length!=0||"White space is not valid"
            })} 
            id="firstName" className="border w-full p-3"/>

          {/*username validation error message  */}
          {errors.firstName?.type==='required' && <p className="text-red-500">{errors.firstName.message}</p>}
          {errors.firstName?.type==='validate' && <p className="text-red-500">{errors.firstName.message}</p>}
        
        </div>
        <div className="mb-3" >
          <label htmlFor="email"> email:</label>
          <input type="email" {...register("email",
            {
              required:"email is required",
              validate:(v)=>v.trim().length!=0||"White space is not valid"
            })} 
            id="email" className="border w-full p-3"/>

          {/*email validation error message  */}
          {errors.firstName?.type==='required' && <p className="text-red-500">{errors.email.message}</p>}
          {errors.firstName?.type==='validate' && <p className="text-red-500">{errors.email.message}</p>}
        
        </div>
        <div className="mb-3" >
          <label htmlFor="dob"> dateOfBirth:</label>
          <input type="date" {...register("dateOfBirth",
            {
              required:"date of birth is required",
            })} 
         id="dob" className="border w-full p-3"/>
          
          {/*dateofbirth validation error message  */}
          {errors.firstName?.type==='required' && <p className="text-red-500">{errors.dateOfBirth.message}</p>}
          {errors.firstName?.type==='validate' && <p className="text-red-500">{errors.dateOfBirth.message}</p>}
        </div>
        <button type="submit" className="p-3 bg-pink-300 block mx-auto">Add User</button>
      </form>
      <div>
        <h1 className="text-center text-3xl mt-3">List Of Users</h1>
        <table className="max-w-md mx-auto mt-8">
          <thead >
            <tr >
              <th className="border p-2">firstName</th>
              <th className="border p-2">email</th>
              <th className="border p-2">dateOfBirth</th>
            </tr>
          </thead>
          <tbody>
           { users.map((user,index)=><tr key="index">
              <td className="border p-2">
              {user.firstName}
              </td>
              <td className="border p-2">
              {user.email}
              </td>
              <td className="border p-2">
              {user.dateOfBirth}
              </td>
        
            </tr>
           

            
          )}
          </tbody>
          
        </table>
      </div>
      </div>
  )
}

export default Form;