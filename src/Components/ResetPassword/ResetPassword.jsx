import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export default function ResetPassword() {
  let navigate = useNavigate();

  async function resetPassword(values) {
    let { data } = await axios.put('https:ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
    console.log(data);
    if (data.token) {
      toast.success('Password has been changed.');

      navigate('/signin')
    }
  }

  let resetPasswordSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    newPassword: Yup.string().required('New password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Password must be 8 characters and contains one lower character and one upper character at least!'),
    rePassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('newPassword')], 'Confirm password does not match password'),
  })
  let resetFormik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
      rePassword: ''
    },
    validationSchema: resetPasswordSchema,
    onSubmit: resetPassword
  })
  return (
    <div className='container'>
      <div className="row verifyCode shadow-sm p-5">
        <h2 className='text-main'>Reset password: </h2>
        <div className="col-md-12 mt-4">
          <form onSubmit={resetFormik.handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input className='form-control' type="email" id='email' name='email' value={resetFormik.email} onChange={resetFormik.handleChange} onBlur={resetFormik.handleBlur} />
            {resetFormik.errors.email && resetFormik.touched.email ? <p className='text-danger'>{resetFormik.errors.email}</p> : ''}
            <label className='mt-3' htmlFor="newPassword">New password:</label>
            <input className='form-control' type="password" id='newPassword' name='newPassword' value={resetFormik.newPassword} onChange={resetFormik.handleChange} onBlur={resetFormik.handleBlur} />
            {resetFormik.errors.newPassword && resetFormik.touched.newPassword ? <p className='text-danger'>{resetFormik.errors.newPassword}</p> : ''}
            <label className='mt-3' htmlFor="rePassword">Confirm password:</label>
            <input className='form-control' type="password" id='rePassword' name='rePassword' value={resetFormik.rePassword} onChange={resetFormik.handleChange} onBlur={resetFormik.handleBlur} />
            {resetFormik.errors.rePassword && resetFormik.touched.rePassword ? <p className='text-danger'>{resetFormik.errors.rePassword}</p> : ''}
            <button disabled={!(resetFormik.isValid && resetFormik.dirty)} className='btn bg-main text-light mt-3'>Confirm</button>
          </form>
        </div>
      </div>
    </div>
  )
}
