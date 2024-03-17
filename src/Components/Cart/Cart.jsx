import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/cart'
import { BallTriangle } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
export default function Cart() {
  const [cartProducts, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [cartPrice, setPrice] = useState(0);
  let { getCart, removeItem, updateItem, setCartNumber, clearCart } = useContext(cartContext);
  // Remove Specific item
  async function removeProduct(id) {
    let { data } = await removeItem(id);
    if (data.status) {
      toast.error('Product has been removed!');
      setProducts(data.data.products);
      setCartNumber(data.numOfCartItems)
      setPrice(data.data.totalCartPrice)
    }
  }
  // Update products
  async function updateProduct(id, count) {
    if (count == 0) {
      removeProduct(id);
    } else {
      setLoading(true)
      let { data } = await updateItem(id, count)
      setProducts(data.data.products);
      setLoading(false)
      setCartNumber(data.numOfCartItems)
      setPrice(data.data.totalCartPrice)
    }
  }
  // get Cart
  async function getUserCart() {
    setLoading(true);
    let { data } = await getCart();
    setProducts(data.data.products)
    setPrice(data.data.totalCartPrice)
    setLoading(false)
  }
  // Clear Cart
  async function clearUserCart() {
    let { data } = await clearCart();
    if (data.message == 'success') {
      toast.error('Your cart has been cleared!');
      setCartNumber(0);
      setProducts([]);
    }
  }

  useEffect(() => {
    getUserCart();
  }, [])
  return (
    <div className='container '>
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
          {cartProducts == 0 ?
            <div className="row mt-5 p-5 shadow-sm bg-subMain rounded-2">
              <h2>Your cart is Empty!</h2>
            </div>
            :
            <div className="row mt-5 p-5 shadow-sm bg-subMain rounded-2">
              <div className="col-md-12 d-flex justify-content-between">
                <div>
                  <h2>Your Cart</h2>
                  <h4 className='text-main'>Total cart price: <span className='ms-3'>{cartPrice} EGP</span></h4>
                </div>
                <div>
                  <button onClick={() => { clearUserCart() }} className='btn btn-outline-danger'>Clear cart</button>
                </div>
              </div>
              {cartProducts.map((product) => {
                return <div className="row g-2 shadow-sm" key={product._id}>
                  <div className="col-md-2">
                    <div className='h-100'>
                      <img src={product.product.imageCover} className='w-100' height={200} alt="" />
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className='ms-3 mt-2 d-flex justify-content-between align-items-center'>
                      <div>
                        <h5>{product.product.title}</h5>
                        <p className='text-main'>Price: <span>{product.price}</span></p>
                        <p>Brand: <span>{product.product.brand.name}</span></p>
                        <button onClick={() => { removeProduct(product.product._id) }} className='btn btn-outline-danger'>Remove</button>
                      </div>
                      <div>
                        <button onClick={() => { updateProduct(product.product._id, product.count + 1) }} className='btn btn-outline-success'>+</button>
                        <span className='mx-2 fs-5'>{product.count}</span>
                        <button onClick={() => { updateProduct(product.product._id, product.count - 1) }} className='btn btn-outline-success'>-</button>
                      </div>
                    </div>
                  </div>
                </div>
              })}
              <div className='text-end'>
                <Link className='m-auto mt-4 d-block' to='/checkout'><button className='btn btn-outline-success '>Online payment <i className="fa-brands fa-cc-visa"></i></button></Link>
              </div>
            </div>
          }
        </>
      }
    </div>
  )
}
