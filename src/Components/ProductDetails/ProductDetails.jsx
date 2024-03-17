import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { cartContext } from '../../Context/cart';

export default function ProductDetails() {
  const [productDetails, setDetails] = useState(null);
  let { addProduct, setCartNumber, addToWishList } = useContext(cartContext);
  let params = useParams();
  let productId = params.detailsId;
  // Add to wishlist
  async function addToMyWishList(id) {
    let { data } = await addToWishList(id);
    if (data.status == 'success') {
      toast.success(data.message);
    }
  }
  // Get Product details
  async function getDetails() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
    setDetails(data.data)
  }
  useEffect(() => {
    getDetails()
  }, [])
  // Add to Cart
  async function addToMyCart(id) {
    let { data } = await addProduct(id);
    if (data.status == 'success') {
      toast.success(data.message);
      setCartNumber(data.numOfCartItems)
    }
  }
  return (
    <div className='row my-5'>
      {productDetails !== null ?
        <>
          <div className="col-md-4 h-100 shadow-sm">
            <div className='productImg p-5 position-relative' key={productDetails._id}>
              <img src={productDetails.imageCover} className='w-100' alt={productDetails.title} />
              <span onClick={() => { addToMyWishList(productDetails._id) }} className='detailsWish position-absolute'><i className="fa-regular fa-heart text-white"></i></span>
            </div>
          </div>
          <div className="col-md-8">
            <div className="detailsContent ms-4  border-bottom border-3">
              <p>{productDetails.description}</p>
              <h4>{productDetails.title}</h4>
              <p className='fw-bolder text-black mt-3'>Available in stock: <span className='text-muted'>{productDetails.quantity}</span></p>
              <p className='fw-bolder text-black'>Ratings average: <span className='text-muted'>{productDetails.ratingsAverage}</span> <i className="fa-solid fa-star rating-color"></i></p>
              <p className='fw-bolder text-black'>Sold: <span className='text-muted'>{productDetails.sold} <i className="fa-solid fa-bag-shopping"></i></span> </p>
              <p className='fw-bolder'>{productDetails.brand.name}</p>
              <div className="product w-50">
                <img src={productDetails.brand.image} alt="" />
              </div>
            </div>
            <div className='ms-4  mt-3'>
              <p>{productDetails.category.name}</p>
              {productDetails.priceAfterDiscount == null ?
                <p>{productDetails.price}EGP</p>
                :
                <div>
                  <del className='text-danger'>{productDetails.price}EGP</del>
                  <p>{productDetails.priceAfterDiscount}EGP</p>
                </div>
              }
              <button onClick={() => { addToMyCart(productDetails._id) }} className='btn bg-main text-light w-100'>Add to cart</button>
            </div>
          </div>
        </>
        :
        <div className='vh-100 d-flex justify-content-center align-items-center'>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      }
    </div>
  )
}
