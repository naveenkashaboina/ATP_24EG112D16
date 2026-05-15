// create mini express app(Seperate Route)
import exp from 'express'
export const productApp = exp.Router()

        //PRODUCT API
    
let products =[]

//Route to handle GET req of CLIENT (http://localhost:3000/users)
    productApp.get('/products',(req,res)=>{
        // send responce to client
        res.json({message:"available products are :",payload:products})
    })
    productApp.get('/products/:brand',(req,res)=>{
        let brandGiven=req.params.brand;
        let pro=products.find(proObj=>proObj.brand===brandGiven)
        if(pro===undefined)
            return res.json({message:"product not found"})
        return res.json({message:"product details are",payload:pro})
    })
    productApp.post('/products',(req,res)=>{
        let newProduct=req.body
        products.push(newProduct)
        res.json({message:"product added"})
    })
    productApp.put('/products',(req,res)=>{
        let updatedProduct=req.body
        let index=products.findIndex(proObj=>proObj.productId===updatedProduct.productId)
        if(index==-1)
            return res.json({message:"product not found to update"})
        products.splice(index,1,updatedProduct)
        res.json({message:"updation success"})
    })
    productApp.delete('/products/:id',(req,res)=>{
        let idOfUrl=Number(req.params.id)
        let index=products.findIndex(proObj=>proObj.productId===idOfUrl)
        if(index===-1)
            return res.json({message:"product not found to delete"})
        products.splice(index,1)
        res.json({message:"product deleted successfully"})
    })
