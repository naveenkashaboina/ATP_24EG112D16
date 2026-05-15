// Assignment 2: 
// -------------
// E-Commerce Shopping Cart System :
//       Building a shopping cart like Amazon or Flipkart

// Requirements:
//       Create a modular shopping system with 5 files:

//            i. product.js - Product catalog
//                           // Product database (simulated)
                          const products = [
                            { id: 1, name: 'Laptop', price: 50000, stock: 10, category: 'electronics' },
                            { id: 2, name: 'Phone', price: 30000, stock: 15, category: 'electronics' },
                            { id: 3, name: 'Headphones', price: 2000, stock: 25, category: 'accessories' },
                            { id: 4, name: 'Mouse', price: 500, stock: 50, category: 'accessories' },
                            { id: 5, name: 'Keyboard', price: 1500, stock: 30, category: 'accessories' }
                          ];
                          
                        //   // TODO: Implement these functions
                          
                         function getProductById(id) {
                        //     // Find and return product by ID
                            for(let i=0;i<products.length;i++){
                                if(products[i].id===id)
                                    return products[i];
                            }

                           }
                          
                        function getAllProducts() {
                        //     // Return all products
                        return products
                        }
                          
                         function getProductsByCategory(category) {
                        //     // Filter products by category
                        products.filter(pro =>pro.category===category)
                        return pro
                           }
                          
                         function searchProducts(query) {
                        //     // Search products by name (case-insensitive)
                        products.find(pro=> pro.name.toLowerCase===query.toLowerCase)
                        return pro
                           }
                          
                         function checkStock(productId, quantity) {
                        //     // Check if product has enough stock
                        products.find(pro=>pro.id===productId)
                        return (quantity>=pro.quantity)
                        //     // Return true/false
                           }
                          
                         function reduceStock(productId, quantity) {
                        //     // Reduce product stock after purchase
                        products.find(pro=>pro.id===productId)
                        products.quantity-=1
                       }

                       export {getProductById,checkStock,getAllProducts,getProductsByCategory,searchProducts,reduceStock}