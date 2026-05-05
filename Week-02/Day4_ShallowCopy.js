const user = {
                id: 101,
                name: "Ravi",
                preferences: {
                  theme: "dark",
                  language: "en"
                }
              };
let newUser={...user}
newUser.name="nvn"
newUser.preferences.theme="light";
console.log(user)
console.log(newUser)