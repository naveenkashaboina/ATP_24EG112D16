 const order = {
                  orderId: "ORD1001",
                  customer: {
                    name: "Anita",
                    address: {
                      city: "Hyderabad",
                      pincode: 500085
                    }
                  },
                  items: [
                    { product: "Laptop", price: 70000 }
                  ]
                };

let COrder=structuredClone(order)
COrder.customer.address.city="Mumbai"
COrder.items[0].price=65000
console.log(order)
console.log(COrder)