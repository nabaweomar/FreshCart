import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Categories() {
  const [categoryList, setCategory] = useState([]);
  async function getCategories() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setCategory(data.data)
  }
  useEffect(() => {
    getCategories();
  }, [])
  return (
    <div className='row g-4 my-5'>
      {categoryList.length > 0 ?
        <>
          {categoryList.map((category) => {
            return <div className="col-lg-3 col-md-4 col-sm-6 shadow-sm" key={category._id}>
              <Link className='text-decoration-none text-black' to={`/categorydetails/${category._id}`}>
                <div className="category product p-4">
                  <div className="categoryImg overflow-hidden border-bottom pb-3">
                    <img src={category.image} className='w-100' height={300} alt={category.name} />
                  </div>
                  <div className='mt-3'>
                    <h4 className='text-main'>{category.name}</h4>
                  </div>
                </div>
              </Link>
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
    </div >
  )
}
