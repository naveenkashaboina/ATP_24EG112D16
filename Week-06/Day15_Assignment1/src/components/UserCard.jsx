function UserCard({ name, increment }) {
  return (
    <div className="bg-purple-200 shadow-md rounded-xl p-5 w-40 text-center">
      <h3 className="mb-3 font-medium">{name}</h3>

      <button
        onClick={increment}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-purple-700"
      >
        Add User
      </button>
    </div>
  );
}

export default UserCard;