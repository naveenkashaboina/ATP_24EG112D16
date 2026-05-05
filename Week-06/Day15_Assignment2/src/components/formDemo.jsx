import { useForm } from "react-hook-form";

function FormDemo(){

  const {register,handleSubmit,formState:{errors}} = useForm();

  //form submit function
  const formSubmit=(obj)=>{
    console.log(obj);
  }
  return(
    <div>
      <h1 className="text-center text-5xl">Form Demo</h1>
      {/* form */}
      <form className="max-w-md mx-auto mt-10" onSubmit={handleSubmit(formSubmit)}>
        <div className="mb-3" >
          <label htmlFor="username"> Username:</label>
          <input type="text" {...register("username",
            {
              required:"Username required",
              validate:(v)=>v.trim().length!=0||"White space is not valid"
            })} 
            id="username" className="border w-full p-3"/>

          {/*username validation error message  */}
          {errors.username?.type==='required' && <p className="text-red-500">{errors.username.message}</p>}
          {errors.username?.type==='validate' && <p className="text-red-500">{errors.username.message}</p>}
        
        </div>
        <div className="mb-3" >
          <label htmlFor="email"> email:</label>
          <input type="email" {...register("email")} id="email" className="border w-full p-3"/>
        </div>
        <button type="submit" className="p-3 bg-amber-300 block mx-auto">submit</button>
      </form>
      </div>
  )
}

export default FormDemo;