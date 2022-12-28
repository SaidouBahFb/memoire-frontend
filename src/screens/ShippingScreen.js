import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { saveShippingAddress } from "../Redux/Actions/CartActions";

const ShippingScreen = ({history}) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const {shippingAddress} = cart;

  const [city, setCity] = useState(shippingAddress.city);
  const [address, setAddress] = useState(shippingAddress.address);
  const [phoneNo, setPhoneNo] = useState(shippingAddress.setPhoneNo);

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({city,address,phoneNo}));
    history.push("/payment")
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>ADRESSE DE LIVRAISON</h6>
          <input type="text" placeholder="Entrez la ville" required
            value={city}
            onChange={(e) => setCity(e.target.value) }
          />
          <input type="text" placeholder="Entrer l'adresse" required
            value={address}
            onChange={(e) => setAddress(e.target.value) }
          />         
          <input type="text" placeholder="Enter le numéro de téléphone" required
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value) }
          />
          <button type="submit">
              Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
