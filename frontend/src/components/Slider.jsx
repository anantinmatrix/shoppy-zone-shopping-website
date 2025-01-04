import React, { useEffect, useRef } from "react";
import "./css/Slider.css";
import { API_URL } from "../config/config";
import { useNavigate } from "react-router-dom";

function Slider({products}) {
  const navigate = useNavigate()
 
  return (
    <div id="slider" className="carousel slide">
      <div className="carousel-inner">
        {products.map((card, index) => {
          return (
            <div key={index} className="carousel-item active">
              <img
                src={`${API_URL}${card.image}`}
                className="d-block w-100"
                alt="card_image"
              />
              <div className="cardInfo">
                <p className="w-25">{card.description}</p>
                <h3>{card.productName}</h3>
                <h5>Rs. {card.price}</h5>
                <button onClick={()=> navigate(`/products/${card._id}`)} className="sliderCardBtn">Shop Now</button>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#slider"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#slider"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Slider;
