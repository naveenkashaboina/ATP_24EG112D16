// ASSIGNMENT 3:
// -------------
// Employee Payroll Processor

// You are building a salary processing module in a company HR app.

// Test data:
const employees = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
];

// Tasks:
//     1. filter() employees from IT department
let emp=employees.filter(e => e.department==="IT")
console.log(emp)

    //  2. map() to add:
    //     netSalary = salary + 10% bonus
emp=employees.map(e => e.netSalary=e.salary+e.salary/10) 
console.log(emp)

//    3. reduce() to calculate total salary payout
emp=employees.reduce((acc,sal)=>acc+sal.netSalary,0)
console.log(emp)

//       4. find() employee with salary 30000
emp=employees.find(e => e.salary===30000)
console.log(emp)

//   5. findIndex() of employee "Neha"
emp=employees.findIndex(e => e.name==="Neha")
console.log(emp)