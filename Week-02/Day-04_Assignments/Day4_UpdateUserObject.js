// Updating a user object without modifying the original

let user = {
  name: "Ravi",
  city: "Hyderabad"
};
let updatedUser={...user}

updatedUser.age=25;
console.log(user)
console.log(updatedUser)
