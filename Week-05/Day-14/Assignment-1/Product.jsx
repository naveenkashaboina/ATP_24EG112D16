function Product(props)  
{
    const {productObj}=props;
    //return react elememt
    return(<div className="bg-gray rounded-x1 p-4">
      
      <h2 className="text-lg m-2">
        {productObj.title}
      </h2>

      <p className="text-brown-400 m-2">
        {productObj.category}
      </p>

      <p className="text-blue-500 mb-2">
        {productObj.price}
      </p>

      <p className="text-yellow-400 ">
         {productObj.rating.rate} ({productObj.rating.count})
      </p>

    </div>
)
}
export default Product;