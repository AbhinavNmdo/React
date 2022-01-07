import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectedProduct, removeSelectedProduct } from '../redux/actions/productActions';


const ProductDetail = () => {
    const proDetail = useSelector((state) => state.product);
    console.log(proDetail);
    const dispatch = useDispatch();
    const {id} = useParams();
    const product = async () => {
        const res = await axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .catch((err)=>{
            console.log("Error", err)
        })
        console.log(res);
        dispatch(selectedProduct(res.data));
    }
    useEffect(() => {
        if(id && id !== "") product();
        return ()=>{
            dispatch(removeSelectedProduct())
        }
    }, [id])
    return (
        <h1>{proDetail.title}</h1>
    )
}

export default ProductDetail
