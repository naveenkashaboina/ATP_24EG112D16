// ASSIGNMENT 1:
// -------------
// You are building a shopping cart summary for an e-commerce website.

const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
];

//    1. Use filter() to get only inStock products
let inStock = cart.filter(function (element){
    if(element.inStock)
        return element;
})
console.log(inStock)

//    2. Use map() to create a new array with:  { name, totalPrice }
let newCart= cart.map(cartObj=> {
    return{
        name:cartObj.name,
        totalPrice:cartObj.price*cartObj.quantity
    }
    }

 )
 console.log(newCart)               

//     3. Use reduce() to calculate grand total cart value
const total=cart.reduce((accumulator,item)=>{
    return accumulator+item.price*item.quantity},0)
console.log(total)

//   4. Use find() to get details of "Mouse"
console.log(cart.find(product=> product.name==="Mouse"))

//  5. Use findIndex() to find the position of "Keyboard"
console.log(cart.findIndex(product=> product.name==="Keyboard"))
