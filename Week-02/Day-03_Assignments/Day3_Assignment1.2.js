// ASSIGNMENT 2:
// -------------
// Student Performance Dashboard

// You are working on a college result analysis system.

// Test Data:
 const students = [
   { id: 1, name: "Ravi", marks: 78 },
   { id: 2, name: "Anjali", marks: 92 },
   { id: 3, name: "Kiran", marks: 35 },
   { id: 4, name: "Sneha", marks: 88 },
   { id: 5, name: "Arjun", marks: 40 }
 ];

// Tasks:
//     1. filter() students who passed (marks ≥ 40)
let passers = students.filter(stu => stu.marks>=40)
console.log(passers)

//  2. map() to add a grade field

let stu = students.map(stu => {
    if(stu.marks>89)
        stu.grade="A"
    else if(stu.marks>74)
        stu.grade="B"
    else if(stu.marks>59)
        stu.grade="C"
    else
        stu.grade="D"
    return stu
})
console.log(stu)

//   3. reduce() to calculate average marks
stu=students.reduce((accumulator,mar) => (accumulator+mar.marks),0)
console.log(stu/students.length)

//      4. find() the student who scored 92
stu=students.find(stud => stud.marks===92)
console.log(stu)

//       5. findIndex() of student "Kiran"
stu=students.findIndex(stud => stud.name==="Kiran")
console.log(stu)
