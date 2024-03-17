import React, { useContext, useEffect } from 'react'
import img from '../../assets/imgs/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/userToken'
import { cartContext } from '../../Context/cart'
import { Dropdown } from 'bootstrap'
export default function Navbar() {
  let { cartNumber, getCart, setCartNumber, userName, setName } = useContext(cartContext);
  let { userToken, setToken } = useContext(userContext);
  let navigate = useNavigate();
  const dropDown = document.querySelector('.dropDown');
  const togglerBtn=document.querySelector('.navbar-toggler');
  function showNav(){
    document.querySelector('.collapse').classList.toggle('d-none')
  }
  function showDropMenu() {
    if (dropDown.classList.contains('d-none')) {
      dropDown.classList.remove('d-none');
      dropDown.classList.add('d-block');
    }
    else {
      dropDown.classList.remove('d-block');
      dropDown.classList.add('d-none');
    }
  }

  function logOut() {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userName')
    setToken(null)
    navigate('/signin');
  }
  useEffect(() => {
    (async () => {
      let { data } = await getCart();
      setCartNumber(data.numOfCartItems);
      setName(localStorage.getItem('userName'));
    })()
  }, [])

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#"><img src={img} alt="Logo" /></a>
          <button onClick={()=>{showNav()}} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse d-flex align-items-center justify-content-center flex-wrap" id="collapsibleNavId">
            {userToken !== null ?
              <ul className="navbar-nav flex-wrap m-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="home" aria-current="page">Home
                    <span className="visually-hidden">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="products">Products</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="categories">Categories</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="brands">Brands</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="wishlist">Wish list</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="cart">Cart</NavLink>
                </li>
              </ul>
              :
              ''
            }
            <ul className='logoutList ms-auto mt-3 flex-wrap d-flex justify-content-between align-items-center'>
              {userToken !== null ? <>
                <li className='cartIcon position-relative'><Link to='cart'><i className='fa-solid fa-cart-shopping mx-4 fs-4 text-main'></i></Link>{cartNumber == 0 ? '' : <span className='d-flex justify-content-center align-items-center text-light'>{cartNumber}</span>}</li>
                <li className='text-muted d-flex align-items-center'>
                  <i className='fa-brands fa-facebook mx-2'></i>
                  <i className='fa-brands fa-twitter mx-2'></i>
                  <i className='fa-brands fa-instagram mx-2'></i>
                  <i className="fa-brands fa-tiktok mx-2"></i>
                  <i className='fa-brands fa-youtube mx-2'></i>
                </li>
                <li onClick={() => { showDropMenu() }} id='myUser' className='position-relative d-flex justify-content-center align-items-center ms-2 rounded-2'><i className="fa-solid fa-circle-user me-1 fs-4"></i>{userName}<ul className='dropDown d-none shadow-sm d-flex align-items-center flex-column justify-content-center position-absolute'><Link to='/editedata'><li className='btn w-100 btn-outline-success'>Account Settings</li></Link><li onClick={() => { logOut() }} className='btn w-75 btn-outline-danger mt-2'>Logout</li></ul></li>
                <li ><Link className="logoutBtn nav-link mx-3" ></Link></li>
              </>
                :
                <>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="signup">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="signin">Login</Link>
                  </li>
                </>
              }
            </ul>


          </div>
        </div>
      </nav>


    </>
  )
}
