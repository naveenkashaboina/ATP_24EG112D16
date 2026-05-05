import UserCard from "./UserCard";

function Users({ increment }) {
  const users = ["User-1", "User-2", "User-3", "User-4"];

  return (
    <div className="grid grid-cols-4 gap-6 justify-center bg-red-200 rounded-xl">
      {users.map((user, index) => (
        <UserCard key={index} name={user} increment={increment} />
      ))}
    </div>
  );
}

export default Users;