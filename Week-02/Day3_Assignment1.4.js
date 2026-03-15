// ASSIGNMENT 4: 
// ------------
// Movie Streaming Platform

// You are working on a movie recommendation system.

// Test data:
const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
  { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
];


//Tasks:
 //   1. filter() only "Sci-Fi" movies
let mov=movies.filter(e => e.genre==="Sci-Fi")
console.log(mov)

 //   2. map() to return: "Inception (8.8)"
 mov = movies.filter(e => e.rating === 8.8).map(e => `${e.title} (${e.rating})`);
console.log(mov)

//    3. reduce() to find average movie rating
mov=movies.reduce((acc,m) =>acc+m.rating,0)
console.log(mov/movies.length)


//       4. find() movie "Joker"
let emp=movies.find(e => e.title==="Joker")
console.log(emp)

//   5. findIndex() of "Avengers"
emp=movies.findIndex(e => e.title==="Avengers")
console.log(emp)