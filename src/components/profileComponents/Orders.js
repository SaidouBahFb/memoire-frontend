import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
const Orders = (props) => {
  const {loading, error, orders} = props;
  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {
        loading ? (
          <Loading/>
        ): error ? (
          <Message variant="alert-danger">{error}</Message>
        )
        :
        (
          <>
            {
              orders.length === 0 ? (
                <div className="col-12 alert alert-info text-center mt-3">
                  Pas de commandes
                  <Link
                    className="btn btn-success mx-2 px-3 py-2"
                    to="/"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Achetez maintenant
                  </Link>
                </div>
              )
              :
              (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>STATUT</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orders.map((order) => (
                          <tr className={`${order.isPaid ? "alert-success" : "alert-danger"}`} key={order._id}>
                          <td>
                            <a href={`/order/${order._id}`} className="link">
                              {order._id}
                            </a>
                          </td>
                          <td>{order.isPaid ? <>Payé</> : <>Non payé</>}</td>
                          <td>{order.isPaid 
                            ? moment(order.paidAt).add(10, 'days').calendar()
                            : moment(order.createdAt).add(10, 'days').calendar()}</td>
                          <td>{order.totalPrice} cfa</td>
                        </tr>
                        ))
                      }
                      
                    </tbody>
                  </table>
                </div>
              )
            }
          </>
        )
      }
      {/*  */}

    </div>
  );
};

export default Orders;
