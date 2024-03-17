import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function CategoryDetails() {
  const [category, setCategory] = useState(null);
  let params = useParams();
  let categoryId = params.detailsId;
  async function getDetails() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
    setCategory(data?.data);
  }
  useEffect(() => {
    getDetails();
  }, [])
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-4 shadow-sm">
          <div className='p-3'>
            <img src={category?.image} className='w-100' height={300} alt="" />
          </div>
        </div>
        <div className="col-md-8">
          <div className='p-4'>
            <h6>Category name : <span className='text-main'>{category?.name}</span></h6>
            <h6>Last updated : <span className='text-main mt-2'>{category?.updatedAt}</span></h6>
          </div>
        </div>
      </div>
    </div>
  )
}
