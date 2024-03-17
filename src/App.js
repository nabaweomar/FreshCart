import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Products from './Components/Products/Products';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Wishlist from './Components/Wishlist/Wishlist';
import UserContextProdiver from './Context/userToken';
import { ToastContainer, toast } from 'react-toastify';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProdiver from './Context/cart';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import Checkout from './Components/Checkout/Checkout';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import EditeData from './Components/EditeData/EditeData';
import Allorders from './Components/allorders/allorders';
import Notfound from './Components/notfound/notfound';

function App() {
  let routes = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'productdetails/:detailsId', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'categorydetails/:detailsId', element: <ProtectedRoute><CategoryDetails /></ProtectedRoute> },
        { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: 'editedata', element: <ProtectedRoute><EditeData /></ProtectedRoute> },
        { path: 'resetpassword', element: <ResetPassword /> },
        { path: 'forgotpassword', element: <ForgetPassword /> },
        { path: 'signin', element: <Signin /> },
        { path: 'signup', element: <Signup /> },
        { path: 'FreshCart', element: <Signup /> },
        { path: '*', element: <Notfound /> },
      ]
    }
  ])
  return (
    <>
      <UserContextProdiver>
        <CartContextProdiver>
          <RouterProvider router={routes}></RouterProvider>
          <ToastContainer theme='colored' position='top-left' />
        </CartContextProdiver>
      </UserContextProdiver>
    </>
  );
}

export default App;
