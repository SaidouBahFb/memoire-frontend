import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import { createProductReview, listProductDetails } from "../Redux/Actions/ProductActions";
import Loading from "../components/LoadingError/Loading";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import moment from 'moment'


const SingleProduct = ({ history,match }) => {

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productId = match.params.id;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const {loading, error, product} = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview, 
    error:errorCreateReview, 
    success:successCreateReview
  } = productReviewCreate;


  useEffect(() => {

    if (successCreateReview) {
      alert("Avis soumis")
      setRating(0)
      setComment("")
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }

    dispatch(listProductDetails(productId));

  },[dispatch, productId, successCreateReview]);

  const AddToCardHandle = (e) => {
    e.preventDefault();
    history.push(`/cart/${productId}?qty=${qty}`);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, {
      rating,
      comment,
    })
    );
  }

  return (
    <>
      <Header />
      <div className="container single-product">
        {
          loading ? (
            <Loading/>
          )
          : error ? (
            <Message variant="alert-danger">{error}</Message>
          )
          :
          (
            <>
              <div className="row">
                  <div className="col-md-6">
                        <div className="single-image">
                          <img src={product.image} alt={product.name} />
                        </div>
                        </div>
                        <div className="col-md-6">
                          <div className="product-dtl">
                            <div className="product-info">
                              <div className="product-name">{product.name}</div>
                            </div>
                            <p>{product.description}</p>

                            <div className="product-count col-lg-7 ">
                              <div className="flex-box d-flex justify-content-between align-items-center">
                                <h6>Prix</h6>
                                <span>{product.price} cfa</span>
                              </div>
                              <div className="flex-box d-flex justify-content-between align-items-center">
                                <h6>Statut</h6>
                                {product.countInStock > 0 ? (
                                  <span>En Stock</span>
                                ) : (
                                  <span>En rupture de stock</span>
                                )}
                              </div>
                              <div className="flex-box d-flex justify-content-between align-items-center">
                                <h6>Commentaires</h6>
                                <Rating
                                  value={product.rating}
                                  text={`${product.numReviews} Avis`}
                                />
                              </div>
                              {product.countInStock > 0 ? (
                                <>
                                  <div className="flex-box d-flex justify-content-between align-items-center">
                                    <h6>Quantité</h6>
                                    <select value={qty}
                                    onChange={(e) => setQty(e.target.value)}>
                                      {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                <button onClick={AddToCardHandle} className="round-black-btn">Ajouter au panier</button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RATING */}
                <div className="row my-5">
                  <div className="col-md-6">
                    <h6 className="mb-3">Avis</h6>
                    {
                      product.reviews.length === 0 && (
                        <Message variant={"alert-info mt-3"}>Aucun avis</Message>
                      )
                    }

                    {
                      product.reviews.map((review) => (
                        <div key={review._id} className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
                          <strong>{review.name}</strong>
                          <Rating value={review.rating}/>
                          <span>{moment(review.createdAt).add(10, 'days').calendar()}</span>
                          <div className="alert alert-info mt-3">
                            {review.comment}
                          </div>
                        </div>
                      ))
                    }
                    
                  </div>
                  <div className="col-md-6">
                    <h6>DONNEZ VOTRE AVIS</h6>
                    <div className="my-4">
                      {loadingCreateReview && <Loading/>}
                      {errorCreateReview && (
                        <Message variant="alert-danger">Vous avez dejà donné votre avis</Message>
                      )}
                    </div>
                    {
                      userInfo ? (
                        <form onSubmit={submitHandler}>
                            <div className="my-4">
                              <strong>Évaluation</strong>
                              <select value={rating} onChange={(e)=>setRating(e.target.value)} className="col-12 bg-light p-3 mt-2 border-0 rounded">
                                <option value="" disabled>Sélectionner...</option>
                                <option value="1">1 - Mauvais</option>
                                <option value="2">2 - Passable</option>
                                <option value="3">3 - Bon</option>
                                <option value="4" selected>4 - Très Bien</option>
                                <option value="5">5 - Excellent</option>
                              </select>
                            </div>
                            <div className="my-4">
                              <strong>Commenter</strong>
                              <textarea
                                row="3"
                                value={comment}
                                onChange={(e)=> setComment(e.target.value)}
                                className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                required
                              ></textarea>
                            </div>
                            <div className="my-3">
                              <button disabled={loadingCreateReview} className="col-12 bg-black border-0 p-3 rounded text-white">
                                Envoyer
                              </button>
                            </div>
                          </form>
                      ):
                      (
                        <div className="my-3">
                        <Message variant={"alert-warning"}>
                          Svp{" "}
                          <Link to="/login">
                            " <strong>Connexion</strong> "
                          </Link>{" "}
                          écrire un commentaire{" "}
                        </Message>
                      </div>
                      )
                    }                  
                  </div>
                </div>
            </>
          )
        }
        

      </div>
    </>
  );
};

export default SingleProduct;
