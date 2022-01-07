import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import ProductComponent from './ProductComponent'
import { useEffect } from 'react';
import {setProducts} from '../redux/actions/productActions';

const ProductListing = () => {
    const products = useSelector((state) => state)
    const dispatch = useDispatch();

    const fetchProducts = async ()=>{
        const res = await axios
        .get('https://fakestoreapi.com/products')
        .catch((err)=>{
            console.log("Error", err);
        });
        dispatch(setProducts(res.data))
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    // eslint-disable-next-line
    console.log(products)
    return (
        <>
            <ProductComponent/>
        </>
    )
}

export default ProductListing
