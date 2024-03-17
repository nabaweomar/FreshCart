import React from 'react'
import img from '../../assets/imgs/freshcart-logo.svg'
import { Link } from 'react-router-dom'

export default function Notfound() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <Link className='w-25' to='/home'><img src={img} className='w-100' alt="Space" /></Link>
      <div className='d-flex justify-content-center mt-5'>
        <span className='errSpan'><i className="fa-solid fa-question fs-2 Brwn"></i></span>
        <div className='notFound ms-3'>
          <h3>Looking for something?</h3>
          <p>We're sorry. The Web address you've entered is not a functioning page on our site.</p>
          <Link className='errLink Brwn fw-bolder fs-5 position-relative' to='/home'>Click here to go back to Fresh cart home page</Link>
        </div>
      </div>
    </div>
  )
}
