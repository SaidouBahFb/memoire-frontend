import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/Actions/CartActions";
import Header from "./../components/Header";

const PaymentScreen = ({history}) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const {shippingAddress} = cart;

  if (!shippingAddress) {
    history.push("/shipping")
  }

  const [paymentMethod, setPaymentMethod] = useState("Payer à la livraison");
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder")
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SÉLECTIONNEZ LE MODE DE PAIEMENT</h6>
          <div className="payment-container">
            <div className="radio-container">
            <select className="form-control" required 
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value) }
            >
                <option disabled>--Faites un choix--</option>
                <option value="Payer à la livraison" selected>Payer à la livraison</option>
                <option value="Wave">Wave</option>
                <option value="Orange money">Orange Money</option>
                <option value="PayPal">PayPal</option>
                <option value="Credit Card">Credit Card</option>
            </select>
              
            </div>
          </div>

          <button type="submit">
              Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
