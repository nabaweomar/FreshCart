import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export default function Signup() {
  let [isLoading, setloading] = useState(false);
  const [errorMsg, setError] = useState(null);
  let navigate = useNavigate();
  async function signup(values) {
    setloading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((err) => {
      setError(err.response.data.message);
      setloading(false);
    })
    if (data.message == 'success') {
      toast.success("Account created successfully");
      navigate('/signin');
      setloading(false);
    }
  }

  let signupSchema = Yup.object({
    name: Yup.string().required('What is your name?').max(10, 'Max name length is 10 characters'),
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter a valid number'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Password must be 8 characters and contains one lower character and one upper character at least!'),
    rePassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password')], 'Confirm password does not match password'),

  })
  let formik = useFormik({

    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema: signupSchema,
    onSubmit: signup
  })
  return (
    <div>
      <div className="row my-5 py-5 bg-subMain rounded-4">
        <div className="col-md-12 mt-5 d-flex justify-content-center flex-column ps-5">
          <h3>Register now :</h3>
          <form onSubmit={formik.handleSubmit}>
            <label className='mt-3' htmlFor="name">Name: </label>
            <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} className='form-control' id='name' name='name' />
            {formik.errors.name && formik.touched.name ?
              <p className='text-danger'>{formik.errors.name}</p> : ''}
            <label className='mt-3' htmlFor="email">Email: </label>
            <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className='form-control' id='email' name='email' />
            {formik.errors.email && formik.touched.email ?
              <p className='text-danger'>{formik.errors.email}</p> : ''}
            <label className='mt-3' htmlFor="phone">Phone: </label>
            <input type="tel" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className='form-control' id='phone' name='phone' />
            {formik.errors.phone && formik.touched.phone ?
              <p className='text-danger'>{formik.errors.phone}</p> : ''}
            <label className='mt-3' htmlFor="password">Password: </label>
            <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className='form-control' id='password' name='password' />
            {formik.errors.password && formik.touched.password ?
              <p className='text-danger'>{formik.errors.password}</p> : ''}
            <label className='mt-3' htmlFor="rePassword">Confirm password: </label>
            <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} className='form-control' id='rePassword' name='rePassword' />
            {formik.errors.rePassword && formik.touched.rePassword ?
              <p className='text-danger'>{formik.errors.rePassword}</p> : ''}
            <button disabled={!(formik.dirty && formik.isValid)} className='btn bg-main text-light mt-3' type='submit'>Register {isLoading ? <span><i className='fa-solid fa-spinner fa-spin'></i></span> : ''}</button>
            <div className="col-md-12 text-center">
              {errorMsg !== null ? <p className='text-danger'>{errorMsg}</p> : ''}
            </div>
            <div className="col-md-12 text-center mt-2">
              <p>Have an account? <Link className='fw-bold text-decoration-none text-main' to='/signin'>Login</Link> </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
