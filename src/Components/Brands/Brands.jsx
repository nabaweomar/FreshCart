import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner';

export default function Brands() {
  const [brandsList, setBrands] = useState([]);
  async function getBrands() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    setBrands(data.data)
  }
  useEffect(() => {
    getBrands();
  }, [])
  return (
    <div className='row g-4'>
      {brandsList.length > 0 ?
        <>
          {brandsList.map((brand) => {
            return <div className="col-lg-3 col-md-4 col-sm-6 shadow-sm" key={brand._id}>
              <div className="brand product p-4">
                <div className="brandImg overflow-hidden border-bottom pb-3">
                  <img src={brand.image} className='w-100' height={300} alt={brand.name} />
                </div>
                <div className='mt-3'>
                  <h4 className='text-main'>{brand.name}</h4>
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
