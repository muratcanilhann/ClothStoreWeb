import {Link} from "react-router-dom";
export default function ProductCard({documentId,img,alt,category,productName,price}){


    return( 
       
        <div className ="max-w-[366px] max-h-[424px]" >
        <Link to ={`/products/${documentId}`}>
        <img src={img} alt={alt}  />
        <h3 className="opacity-[66%] uppercase">{category}</h3>
        <div className="flex justify-between ">
            <h4 className="uppercase">{productName}</h4>
            <p className="uppercase">{price}$</p>
        </div>

        </Link>
        </div>

        



       
       
  

    )
}