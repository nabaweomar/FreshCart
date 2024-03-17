import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = createContext();

export default function CartContextProdiver(myprops) {
  const [cartNumber, setCartNumber] = useState(0);
  const [userName, setName] = useState(null);
  let baseUrl = "https://ecommerce.routemisr.com";
  let header = {
    token: localStorage.getItem("userToken"),
  };
  // Update user Info
  function updateData(values) {
    return axios.put(
      `${baseUrl}/api/v1/users/updateMe/`,
      {
        name: values.name,
        email: values.email,
        phone: values.phone,
      },
      {
        headers: header,
      }
    );
  }
  // Update logged user Password
  function updatePassword(values) {
    return axios.put(
      `${baseUrl}/api/v1/users/changeMyPassword`,
      {
        currentPassword: values.currentPassword,
        password: values.password,
        rePassword: values.rePassword,
      },
      {
        headers: header,
      }
    );
  }
  // Add to wisList
  function addToWishList(id) {
    return axios.post(
      `${baseUrl}/api/v1/wishlist`,
      {
        productId: id,
      },
      {
        headers: header,
      }
    );
  }
  function getUserWishList() {
    return axios.get(`${baseUrl}/api/v1/wishlist`, {
      headers: header,
    });
  }
  function removeWishList(id) {
    return axios.delete(`${baseUrl}/api/v1/wishlist/${id}`, {
      headers: header,
    });
  }
  // Add product to cart
  function addProduct(id) {
    return axios.post(
      `${baseUrl}/api/v1/cart/`,
      {
        productId: id,
      },
      {
        headers: header,
      }
    );
  }
  //   Get user Cart
  function getCart() {
    return axios.get(`${baseUrl}/api/v1/cart`, {
      headers: header,
    });
  }
  //   Update on a specific item
  function updateItem(id, count) {
    return axios.put(
      `${baseUrl}/api/v1/cart/${id}`,
      {
        count: count,
      },
      {
        headers: header,
      }
    );
  }
  //   Delete a specific item
  function removeItem(id) {
    return axios.delete(`${baseUrl}/api/v1/cart/${id}`, {
      headers: header,
    });
  }
  //   Clear user Cart
  function clearCart() {
    return axios.delete(`${baseUrl}/api/v1/cart`, {
      headers: header,
    });
  }
  function checkoutPayment(id, formData) {
    return axios.post(
      `${baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
      {
        shippingAddress: formData,
      },
      {
        headers: header,
      }
    );
  }

  return (
    <cartContext.Provider
      value={{
        addProduct,
        cartNumber,
        setCartNumber,
        getCart,
        removeItem,
        updateItem,
        clearCart,
        checkoutPayment,
        addToWishList,
        getUserWishList,
        removeWishList,
        updatePassword,
        userName,
        setName,
        updateData,
      }}
    >
      {myprops.children}
    </cartContext.Provider>
  );
}
