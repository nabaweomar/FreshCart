import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/cart';
import { toast } from 'react-toastify';

export default function Products() {
  const [productList, setProduct] = useState([]);
  let { addProduct, setCartNumber, addToWishList } = useContext(cartContext);
  // const buttons = document.querySelectorAll('.wishBtn');
  // let [color, setColor] = useState('bg-main')

  // Get Product
  async function getProducts() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    setProduct(data.data);
  }
  useEffect(() => {
    getProducts()
  }, [])
  // Add to Cart
  async function addToMyCart(id) {
    let { data } = await addProduct(id);
    if (data.status == 'success') {
      toast.success(data.message);
      setCartNumber(data.numOfCartItems)
    }
  }
  // add to wishlist
  async function addToMyWishList(id) {
    let { data } = await addToWishList(id)
    console.log(data);
    if (data.status == "success") {
      toast.success(data.message);
      // for (let i = 0; i < buttons.length; i++) {
      //   buttons[i].addEventListener('click', function () {
      //     if (buttons[i].classList.contains('bg-main')) {
      //       buttons[i].classList.remove(color)
      //       setColor('bg-danger')
      //       buttons[i].classList.add(color)
      //     } else {
      //       buttons[i].classList.remove('bg-danger')
      //       buttons[i].classList.add('bg-main')
      //     }
      //   })
      // }
    }
  }


  return (
    <div className='row my-5 '>
      {productList.length > 0 ?
        <>
          {productList.map((product) => {
            return <div className="col-lg-3 col-md-4 col-sm-6 shadow-sm" key={product._id}>
              <div className="product m-4 p-3 position-relative">
                <Link className='text-decoration-none text-black' to={`/productdetails/${product._id}`}>
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

                </Link>
                <div className='productBtns d-flex justify-content-between'>
                  <button onClick={() => { addToMyCart(product._id) }} className='btn bg-main text-light w-75'>Add to cart</button>
                  <button onClick={() => { addToMyWishList(product._id) }} className='wishBtn btn bg-main text-light'><i><i className="fa-regular fa-heart"></i></i></button>
                </div>
              </div>
            </div>
          })}
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
