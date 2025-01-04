import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/SingleProduct.css";
import Rating from "../components/Rating";
import axios from "axios";
import { API_URL } from "../config/config";
import { showNotification } from "../NotificationProvider";
import { CartContext } from "../cartContext/CartContext";

function SingleProduct() {
  const { cart, dispatch } = useContext(CartContext);
  const productId = useParams();
  const navigate  = useNavigate()

  const [item, setitem] = useState({});
  const [ratings, setratings] = useState(1);
  const [comment, setcomment] = useState("");
  const [reviews, setreviews] = useState([]);
  const [seller, setseller] = useState({});

  //   Functions are defined here
  const fetchProduct = () => {
    axios
      .get(`${API_URL}/products/singleproduct/${productId.productId}`)
      .then((res) => {
        setitem(res.data.product);
        console.log(productId,res.data.product)
      })
      .catch((err) => {
        showNotification("error", "Problem Fetching the Product", 3);
      });
  };

  const fetchReviews = () => {
    axios
      .get(`${API_URL}/products/productreview/${productId.productId}`)
      .then((res) => {
        setreviews(res.data.reviews);
      })
      .catch((err) => {
        showNotification("error", "Problem Fetching the Reviews", 3);
      });
  };

  const postReview = (e) => {
    e.preventDefault();
    if (!ratings || !comment) {
      showNotification("error", "Please fill all the fields", 3);
      return;
    }
    axios
      .post(
        `${API_URL}/reviews/addreview/${productId.productId}`,
        {
          rating: ratings,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        showNotification("success", "Review posted", 3);
        setratings(1);
        setcomment("");
        fetchReviews();
      })
      .catch((err) => {
        showNotification("error", "error", 3);
      });
  };
  const fetchSeller = () => {
    axios
      .get(`${API_URL}/users/getuser/${item.author}`)
      .then((res) => {
        setseller(res.data.user);
      })
      .catch((err) => {});
  };
  //

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, []);
  useEffect(() => {
    if (item.author) {
      fetchSeller();
    }
  }, [item]);
//   console.log(seller, item.author);
  return (
    <div className="SingleProductPage container-fluid ">
      <div className="productBody row mb-5">
        <div className="SingleProductImage col-md-4">
          <img src={`${API_URL}${item.image}`} alt="product_image" />
        </div>
        <div className="col-1"></div>
        <div className="SingleProductDetails col-md-3">
          <h1>{item.name}</h1>
          <h5 className="text-muted mt-3">{item.brand}</h5>
          <h4 className="mt-4">Rs. {item.price}</h4>
          <h6 className="mt-3">
            Rating: <Rating rating={item.averageRating} />{" "}
            {item.averageRating ? item.averageRating : 0}/5
          </h6>
          <p>{item.reviews ? item.reviews.length : 0} Reviews</p>
          <p className="mt-4">{item.description}.</p>
        </div>
        <div className="col-1"></div>
        <div className="SingleProductOrder col-md-3 ">
          <div className="cartOrder w-75 ">
            <div className="orderBody">
              <h6>Seller</h6>
              <h5>{seller.name}</h5>
              <hr />
              <h6>Price : Rs. {item.price}</h6>
              <hr />
              <h6>Status : {item.stock ? "In Stock" : "Out of Stock"}</h6>
              <hr />
              
              {cart.some((p) => p._id === item._id) ? (
                <button
                  onClick={() => {
                    dispatch({ type: "Remove", _id: item._id });
                    showNotification("success","Removed from Cart",3);
                  }}
                  className="btn bg-danger text-white"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={() => {{localStorage.getItem('token') ? dispatch({ type: "Add", item: item }) : navigate('/login')}; showNotification("success", "Added to Cart",3)}}
                  className="btn bg-primary"
                >
                  Add to Cart
                </button>
              )}
            
            </div>
          </div>
        </div>
      </div>
      <div className="SingleProductReview">
        <div className="addReview mb-5 w-50">
          <h3 className="mb-3">Add your review</h3>
          <form onSubmit={postReview}>
            <label htmlFor="ratings">Ratings :</label>
            <input
              id="ratings"
              className="form-control w-25 mb-3"
              type="number"
              min={1}
              max={5}
              onChange={(e) => setratings(e.target.value)}
            />
            <textarea
              name="review"
              id="review"
              className="form-control mb-3"
              placeholder="Add your review"
              rows={5}
              cols={10}
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
            ></textarea>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <h3>Reviews</h3>
        <div className="reviews border-1 border-black p-2">
          {reviews ? (
            <div>
              {reviews.map((review) => {
                return (
                  <div key={review._id} className="mb-3">
                    <Rating rating={review.rating} />
                    <h6>by {review.user.name}</h6>
                    <p>{review.comment}</p>
                    <hr />
                  </div>
                );
              })}
            </div>
          ) : (
            <p>{"No reviews"}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
