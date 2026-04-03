function User(props)
{
   const {userObj}=props;
     return (
       <div className=" flex flex-col items-center bg-blue-200 rounded-3xl p-2 h-80 w-80 justify-center">
        <img src={userObj.image} alt="Not Found" />
         <p>{userObj.name}</p>
         <p>{userObj.email}</p>
       </div>
     )
}
export default User;