function User(props) {
  const { user } = props;

  return (
    <div className="max-w-sm mx-auto bg-white shadow-amber-300 shadow-lg rounded-2xl p-5  transition duration-300 ">
      
      <img
        src={user.image}
        alt="user"
        className="w-24 h-24 mx-auto rounded-full shadow-md border-4 border-blue-200 object-cover"
      />

      <h2 className="text-xl font-semibold text-center text-gray-800 mt-4">
        {user.name}
      </h2>

      <p className="text-center text-gray-500 mt-1">
        {user.email}
      </p>

    </div>
  );
}

export default User;