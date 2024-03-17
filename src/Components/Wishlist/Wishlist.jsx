import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/cart'
import { BallTriangle } from 'react-loader-spinner';
import { toast } from 'react-toastify';

export default function Wishlist() {
  let { getUserWishList, removeWishList, addProduct, setCartNumber } = useContext(cartContext);
  const [isLoading, setLoading] = useState(true);
  const [wishList, setWishList] = useState([]);

  async function getMyWishList() {
    let { data } = await getUserWishList();
    setLoading(true)
    setWishList(data.data)
    setLoading(false)
  }
  async function removeWishListItem(id) {
    let { data } = await removeWishList(id)
    if (data.status == 'success') {
      toast.success(data.message);
      getMyWishList();
    }
  }
  // Add to cart
  async function addToMyCart(id) {
    let { data } = await addProduct(id);
    if (data.status == 'success') {
      toast.success(data.message);
      setCartNumber(data.numOfCartItems)
    }
  }
  useEffect(() => {
    getMyWishList();
  }, [])

  return (
    <div className='container'>
      {isLoading ?
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
        :
        <>
          {wishList.length == 0 ?
            <>
              <div className="row mt-5 p-5 shadow-sm bg-subMain rounded-2">
                <h2>Your wishlist is Empty!</h2>
              </div>
            </>
            :
            <div className='row'>
              {wishList.map((product) => {
                return <div className="col-lg-3 col-md-4 col-sm-6 shadow-sm" key={product._id}>
                  <div className="product m-4 p-3 position-relative">
                    <div className="productimg overflow-hidden border-bottom pb-5">
                      <img src={product.imageCover} className='w-100' height={300} alt={product.title} />
                    </div>
                    <p className='pt-2'>{product.category.name}</p>
                    <p className='text-main'>{product.title}</p>
                    <span className='discount position-absolute bg-danger d-flex justify-content-center align-items-center px-2 text-light fw-bolder'>-8%</span>
                    <div className='d-flex justify-content-between'>
                      {product.priceAfterDiscount == null ?
                        <p>{product.price}EGP</p>
                        :
                        <div>
                          <del className='text-danger'>{product.price}EGP</del>
                          <p>{product.priceAfterDiscount}EGP</p>
                        </div>
                      }
                      <p><i className="fa-solid fa-star rating-color"></i>{product.ratingsAverage}</p>
                    </div>
                    <div className='productBtns d-flex justify-content-between'>
                      <button onClick={() => { addToMyCart(product._id) }} className='btn bg-main text-light w-75'>Add to cart</button>
                      <button onClick={() => { removeWishListItem(product._id) }} className='wishBtn btn bg-danger text-light'><i><i className="fa-solid fa-trash"></i></i></button>
                    </div>
                  </div>
                </div>
              })

              }
            </div>
          }
        </>
      }
    </div>
  )
}
