// CREATE HTTP SERVER
import exp from 'express'
import { productApp } from './ProductsAPI.js'
const app=exp()  //app is naming convention for express application
                 // exp() internally contains HTTP server + more

// use body parser middleware(in built)
app.use(exp.json())

//forward it to productApi
app.use('/products-api',productApp)


//Set a port number
const port=3000
// assign port number to HTTP server
app.listen(port,()=>console.log(`server listenting port ${port} ...`))

