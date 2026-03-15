
          //ii. cart.js - Shopping cart operations
                          import { getProductById, checkStock } from './product.js';
                          
                          let cartItems = [];
                          
                          // TODO: Implement these functions
                          
                           function addToCart(productId, quantity) {
                            // 1. Get product details
                            getProductById(productId)
                            // 2. Check stock availability
                            if(checkStock(productId,quantity))
                            // 3. Check if product already in cart
                        for(let i=0;i<cartItems.length;i++)
                            //    - If yes, update quantity
                            //    - If no, add new item
                            if(cartItems[i].productId===productId){
                                cartItems[i].quantity+=quantity
                                console.log(`${cartItems[i].name} added ${quantity}`)
                            }
                            else{
                                cartItems.push(getProductById(productId))
                            console.log(`${cartItems[i].name} has been added to cart`)
                            }
                            // 4. Return success/error message
                            console.log(`requested product is not available`)
                          }
                          
                          function removeFromCart(productId) {
                            // Remove product from cart
                            for(let i=0;i<cartItems.length;i++){
                                if(cartItems[i].productId===productId)
                                    cartItems.splice(i,1)

                            }
                          }
                          
                           function updateQuantity(productId, newQuantity) {
                            // Update quantity of product in cart
                            // Check stock before updating
                            for(let i=0;i<cartItems.length;i++){
                                if(cartItems[i].productId===productId)
                                    cartItems.productId.quantity=newQuantity
                            }
                          }
                          
                           function getCartItems() {
                            // Return all cart items with product details
                            return cartItems
                          }
                          
                           function getCartTotal() {
                            // Calculate total price of all items in cart
                            // Return total
                            return cartItems.reduce((acc,cart)=>acc+cart.price,0)
                          }
                          
                           function clearCart() {
                            // Empty the cart
                            cartItems.splice(0,cartItems.length)
                          }

                          export{addToCart,removeFromCart,updateQuantity,getCartItems,getCartTotal,clearCart}
