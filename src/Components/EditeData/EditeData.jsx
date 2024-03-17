import React, { useContext, useState } from 'react'
import { cartContext } from '../../Context/cart'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function EditeData() {
  let { updatePassword, updateData } = useContext(cartContext);
  const [errMsg, setMsg] = useState(null);
  const [isLoading, setLoading] = useState(false);

  let navigate = useNavigate();
  async function updateMyPassword(formik) {
    setLoading(true)
    let { data } = await updatePassword(formik).catch((err) => {
      setMsg(err.response.data.errors.msg)
      setLoading(false)
    })
    if (data.message == "success") {
      toast.success('Password has been changed,Please log in again!');
      localStorage.removeItem('userToken');
      navigate('/signin')
      setLoading(false)
    }
  }
  let editePasswordSchema = Yup.object({
    currentPassword: Yup.string().required('Current password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Password must be 8 characters and contains one lower character and one upper character at least!'),
    password: Yup.string().required('New password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Password must be 8 characters and contains one lower character and one upper character at least!'),
    rePassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password')], 'Confirm password does not match password'),
  })
  let formik = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      rePassword: ''
    },
    validationSchema: editePasswordSchema,
    onSubmit: updateMyPassword
  })
  // Edite Personal data
  // async function updateMyData(dataFormik) {
  //   setLoading(true);
  //   let { data } = await updateData(dataFormik).catch((err) => {
  //     setMsg(err.response.data.errors.msg);
  //     setLoading(false);
  //   })
  //   console.log(data);
  // }
  // let editeDataSchema = Yup.object({
  //   name: Yup.string().required('What is your name?').max(10, 'Max name length is 10 characters'),
  //   email: Yup.string().required('Email is required').email('Enter a valid email'),
  //   phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter a valid number'),
  // })
  // let dataFormik = useFormik({
  //   initialValues: {
  //     name: '',
  //     email: '',
  //     phone: ''
  //   },
  //   validationSchema: editeDataSchema,
  //   onSubmit: updateMyData
  // })
  return (
    <div className='container shadow-sm p-5'>
      <div className="row pb-5">
        <div className="col-md-3">
          <div>
            {/* <h5 className='mt-4 btn btn-outline-success'>Change your personal data</h5> */}
            <h5 className='mt-4 btn btn-outline-success'>Change your Password</h5>
          </div>
        </div>
        {/* <div className="personalData col-md-9 pe-5">
          <form onSubmit={dataFormik.handleSubmit}>
            <label className='mt-3' htmlFor="name">Name:</label>
            <input className='form-control' type="text" id='name' name='name' value={dataFormik.name} onChange={dataFormik.handleChange} onBlur={dataFormik.handleBlur} />
            {dataFormik.errors.name && dataFormik.touched.name ? <p className='text-danger'>{dataFormik.errors.name}</p> : ''}
            <label className='mt-3' htmlFor="email">Email:</label>
            <input className='form-control' type="email" id='email' name='email' value={dataFormik.email} onChange={dataFormik.handleChange} onBlur={dataFormik.handleBlur} />
            {dataFormik.errors.email && dataFormik.touched.email ? <p className='text-danger'>{dataFormik.errors.email}</p> : ''}
            <label className='mt-3' htmlFor="phone">Phone:</label>
            <input className='form-control' type="tel" id='phone' name='phone' value={dataFormik.phone} onChange={dataFormik.handleChange} onBlur={dataFormik.handleBlur} />
            {dataFormik.errors.phone && dataFormik.touched.phone ? <p className='text-danger'>{dataFormik.errors.phone}</p> : ''}
            <button type='submit' disabled={!(dataFormik.isValid && dataFormik.dirty)} className='btn bg-main text-light mt-3'>Edit {isLoading ? <span><i className='fa-solid fa-spinner fa-spin'></i></span> : ''}</button>
            {errMsg !== null ? <p className='text-danger text-center'>{errMsg}</p> : ''}
          </form>
        </div> */}
        <div className="changePassword col-md-9 pe-5">
          <form onSubmit={formik.handleSubmit}>
            <label className='mt-3' htmlFor="currentPassword">Current password:</label>
            <input className='form-control' type="password" id='currentPassword' name='currentPassword' value={formik.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.currentPassword && formik.touched.currentPassword ? <p className='text-danger'>{formik.errors.currentPassword}</p> : ''}
            <label className='mt-3' htmlFor="password">New password:</label>
            <input className='form-control' type="password" id='password' name='password' value={formik.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.password && formik.touched.password ? <p className='text-danger'>{formik.errors.password}</p> : ''}
            <label className='mt-3' htmlFor="rePassword">Confirm password:</label>
            <input className='form-control' type="password" id='rePassword' name='rePassword' value={formik.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.rePassword && formik.touched.rePassword ? <p className='text-danger'>{formik.errors.rePassword}</p> : ''}
            <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-light mt-3'>Edit {isLoading ? <span><i className='fa-solid fa-spinner fa-spin'></i></span> : ''}</button>
            {errMsg !== null ? <p className='text-danger text-center'>{errMsg}</p> : ''}
          </form>
        </div>
      </div>
    </div>
  )
}
