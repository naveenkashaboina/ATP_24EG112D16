function UserCount({ count }) {
  return (
    <div className="mb-6 bg-gray-200 p-4 rounded-xl">
      <h2 className="text-2xl font-semibold">
        Total Users Added: {count}
      </h2>
    </div>
  );
}

export default UserCount;