import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom';

const ProductComponent = () => {
    const products = useSelector((state) => state.allProducts.products);
    return (
        <>
            <div>
                {products.map((product)=>{
                    return(
                        <div>
                            <Link key={product.id} to={`/product/${product.id}`}>{product.title}</Link>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ProductComponent
