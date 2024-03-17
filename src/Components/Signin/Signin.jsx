import React, { useContext, useState } from 'react'
import img from '../../assets/imgs/Computer login-amico.png'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/userToken';
import { cartContext } from '../../Context/cart';

export default function Signin() {
  let { setToken } = useContext(userContext)
  let { setName } = useContext(cartContext);
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setError] = useState(null);
  let navigate = useNavigate();
  async function signin(values) {
    setLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err) => {
      setError(err.response.data.message)
      setLoading(false);
    })
    if (data.message == "success") {
      setName(data.user.name)
      localStorage.setItem('userName', data.user.name)
      navigate('/home');
      setLoading(false)
      setToken(data.token)
      localStorage.setItem('userToken', data.token);
    }
  }

  let signinValidation = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Password must be 8 characters and contains one lower character and one upper character at least!'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: signinValidation,
    onSubmit: signin
  })
  return (
    <div>
      <div className="row mt-5  bg-subMain rounded-4">
        <div className="col-md-6 d-flex justify-content-center flex-column ps-5">
          <h3>Login now <i className="fa-solid fa-right-to-bracket"></i></h3>
          <form onSubmit={formik.handleSubmit}>
            <label className='mt-3' htmlFor="email">Email: </label>
            <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control' id='email' name='email' />
            {formik.errors.email && formik.touched.email ? <p className='text-danger'>{formik.errors.email}</p> : ''}
            <label className='mt-3' htmlFor="password">Password: </label>
            <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control' id='password' name='password' />
            <p className='mt-2'><Link to='/forgotpassword'>Forgot your password?</Link></p>
            {formik.errors.password && formik.touched.password ? <p className='text-danger'>{formik.errors.password}</p> : ''}
            <div>
              {errorMsg !== null ? <p className='text-danger'>{errorMsg}</p> : ''}
            </div>
            <button disabled={!(formik.dirty && formik.isValid)} className='btn bg-main text-light' type='submit'>Login{isLoading ? <span><i className='fa-solid fa-spinner fa-spin'></i></span> : ''}</button>
            <p className='mt-2 text-center'>Don't have an account? <span><Link className='text-decoration-none text-main fw-bolder' to='/signup'>Register now...</Link></span></p>
          </form>
        </div>
        <div className="col-md-6 login-img">
          <img src={img} alt="LoginImg" />
        </div>
      </div>
    </div>
  )
}
