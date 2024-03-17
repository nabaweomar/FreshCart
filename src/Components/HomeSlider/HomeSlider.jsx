import React from 'react'
import Slider from "react-slick";
import img1 from '../../assets/imgs/1.jpg'
import img2 from '../../assets/imgs/2.gif'
import img3 from '../../assets/imgs/3.png'
import img4 from '../../assets/imgs/4.png'
import img5 from '../../assets/imgs/5.png'
import img6 from '../../assets//imgs/main-slider-1.jpeg'
import img7 from '../../assets//imgs/main-slider-3.jpeg'

export default function HomeSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='row'>
      <div className="col-md-8 p-0">
        <Slider {...settings}>
          <img src={img1} className='w-100' height={400} alt="" />
          <img src={img2} className='w-100' height={400} alt="" />
          <img src={img3} className='w-100' height={400} alt="" />
          <img src={img4} className='w-100' height={400} alt="" />
          <img src={img5} className='w-100' height={400} alt="" />
        </Slider>
      </div>
      <div className="col-md-4 p-0">
        <img src={img6} className='w-100' height={200} alt="" />
        <img src={img7} className='w-100' height={200} alt="" />
      </div>
    </div>
  )
}
