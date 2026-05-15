// ASSIGNMENT 5: 
// -------------
// Bank Transaction Analyzer

// You are building a bank statement summary.

// Test data:
const transactions = [
  { id: 1, type: "credit", amount: 5000 },
  { id: 2, type: "debit", amount: 2000 },
  { id: 3, type: "credit", amount: 10000 },
  { id: 4, type: "debit", amount: 3000 }
];


// Tasks:
//     1. filter() all credit transactions
let trans=transactions.filter(pay => pay.type==="credit")
console.log(trans)

//    2. map() to extract only transaction amounts
trans =transactions.map(t => t.amount)
console.log(trans)

//    3. reduce() to calculate final account balance
trans=transactions.reduce((acc,a)=>acc+a.amount,0)
console.log(trans)

// 4. find() the first debit transaction
trans=transactions.find(t=>t.type==="debit")
console.log(trans)

    //5. findIndex() of transaction with amount 10000
trans=transactions.findIndex(t=>t.amount===10000)
console.log(trans)