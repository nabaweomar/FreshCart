import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import * as Yup from 'yup';
import { cartContext } from '../../Context/cart';

export default function Checkout() {
  const [isLoading, setLoading] = useState(false);
  const [cartId, setId] = useState(null);
  let { checkoutPayment, getCart } = useContext(cartContext);

  async function checkOut(val) {
    setLoading(true)
    let { data } = await checkoutPayment(cartId, val)
    setLoading(false)
    if (data.status == 'success') {
      window.location = data.session.url;
    }
  }
  let checkoutValidation = Yup.object({
    details: Yup.string().required('Adress details is required').min(10, 'Must be atleast 10 letters'),
    phone: Yup.string().required('Enter your phone number!').matches(/^01[0125][0-9]{8}$/, 'Enter a valid number'),
    city: Yup.string().required('Where do you live?').max(10, 'Enter maximum 10 letters')
  })
  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    validationSchema: checkoutValidation
    ,
    onSubmit: checkOut
  })
  // get ID
  async function getCartId() {
    let { data } = await getCart();
    setId(data?.data._id)
    }
  useEffect(() => {
    getCartId()
  }, [])
  return (
    <div>
      <div className="row mt-5  bg-subMain rounded-4">
        <div className="col-md-6 py-5 d-flex justify-content-center flex-column ps-5">
          <h3>Check out <i className="fa-solid fa-money-check"></i></h3>
          <form onSubmit={formik.handleSubmit}>
            <label className='mt-3' htmlFor="details">Address Details: </label>
            <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} className='form-control' id='details' name='details' />
            {formik.errors.details && formik.touched.details ? <p className='text-danger'>{formik.errors.details}</p> : ''}
            <label className='mt-3' htmlFor="phone">Phone : </label>
            <input type="tel" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control' id='phone' name='phone' />
            {formik.errors.phone && formik.touched.phone ? <p className='text-danger'>{formik.errors.phone}</p> : ''}
            <label className='mt-3' htmlFor="city">City: </label>
            <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} className='form-control' id='city' name='city' />
            {formik.errors.city && formik.touched.city ? <p className='text-danger'>{formik.errors.city}</p> : ''}
            <div>
            </div>
            <button disabled={!(formik.dirty && formik.isValid)} className='btn bg-main text-light mt-3' type='submit'>Confirm payment <i className="fa-brands fa-cc-visa"></i>{isLoading ? <span><i className='fa-solid fa-spinner fa-spin'></i></span> : ''}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
