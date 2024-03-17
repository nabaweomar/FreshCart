import React from 'react'
import Products from '../Products/Products'
import HomeSlider from '../HomeSlider/HomeSlider'

export default function Home() {
  // const topPageBtn = document.querySelector('.topPage');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      document.querySelector('.topPage').classList.replace('opacity-0', 'opacity-100');
    }
    else {
      document.querySelector('.topPage').classList.replace('opacity-100', 'opacity-0');
    }
  })
  function scrollTop(){
    window.scrollTo(0,0);
    
  }
  return (
    <div className='py-5'>
      <HomeSlider />
      <div className="products my-5">
        <h2 className='text-center text-main fw-bolder'>All products :</h2>
        <div onClick={()=>{scrollTop()}} className='topPage opacity-0'>
          <span><i className="fa-solid fa-arrow-up"></i></span>
        </div>
        <Products />
      </div>
    </div>
  )
}
