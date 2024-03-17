import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export default function ForgetPassword() {
  let navigate = useNavigate();
  const [errorMsg, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  async function forgotPassword(values) {
    setLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
    console.log(data);
    setLoading(false)
    toast.success(data.message);
    if (data.statusMsg == 'success') {
      document.querySelector('.forgotPassword').classList.add('d-none');
      document.querySelector('.resetPassword').classList.replace('d-none', 'd-block');
    }
  }
  // Sending verification code
  let ForgetPasswordSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email')
  })
  let formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: ForgetPasswordSchema,
    onSubmit: forgotPassword
  })
  // Code Verification
  async function codeVerification(values) {
    setLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values).catch((err) => {
      setError(err.response.data.message)
      setLoading(false)
    })
    console.log(data);
    if (data.status == "Success") {
      toast.success('Code verified');
      setLoading(false)
      navigate('/resetpassword')
    }
  }
  let codeSchema = Yup.object({
    resetCode: Yup.string().required('Validation code is required!').max(6, 'Verification code must be 6 Numbers!').min(6, 'Verification code must be 6 Numbers!')
  })
  let codeFormik = useFormik({
    initialValues: {
      resetCode: ''
    },
    validationSchema: codeSchema,
    onSubmit: codeVerification
  })
  return (
    <div className='container'>
      <div className="row forgotPassword shadow-sm p-5">
        <h2 className='text-main'>Forget password</h2>
        <div className="col-md-12 mt-5">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input className='form-control' type="email" id='email' name='email' value={formik.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.email && formik.touched.email ? <p className='text-danger'>{formik.errors.email}</p> : ''}
            <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-light mt-2'>Send code {isLoading ? <span><i className='fa-solid fa-spinner fa-spin'></i></span> : ''}</button>
          </form>
        </div>
      </div>
      <div className="row resetPassword d-none shadow-sm p-5">
        <h2 className='text-main'>Code validation: </h2>
        <div className="col-md-12 mt-5">
          <form onSubmit={codeFormik.handleSubmit}>
            <label htmlFor="resetCode">Enter validation Code:</label>
            <input className='form-control' type="text" id='resetCode' name='resetCode' value={codeFormik.resetCode} onChange={codeFormik.handleChange} onBlur={codeFormik.handleBlur} />
            {codeFormik.errors.resetCode && codeFormik.touched.resetCode ? <p className='text-danger'>{codeFormik.errors.resetCode}</p> : ''}
            <button disabled={!(codeFormik.isValid && codeFormik.dirty)} className='btn bg-main text-light mt-2'>Submit {isLoading ? <span><i className='fa-solid fa-spinner fa-spin'></i></span> : ''}</button>
            {errorMsg !== null ? <p className='text-danger text-center'>{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    </div>
  )
}
