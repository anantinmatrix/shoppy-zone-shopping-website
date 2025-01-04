import { Link } from "react-router-dom";
import CardType1 from "../components/CardType1";
import CardType2 from "../components/CardType2";
import CardType3 from "../components/CardType3";
import Slider from "../components/Slider";
import "./css/Homepage.css";
import { useEffect, useState } from "react";
import { API_URL } from "../config/config";
import axios from "axios";

function Homepage() {
  const [itemsArr, setitemsArr] = useState([]);
  const [sliderItems,setSliderItems]= useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/products/allproducts`)
      .then((res) => {
        setitemsArr(res.data);
      })
      .catch((err) => {
      });
  }, []);
  useEffect(()=>{
    itemsArr.map((item)=>{
      if(item.category.toLowerCase() === "electronics"){
        setSliderItems((prevState)=>[...prevState,item])
      } 
    })
  },[itemsArr])
  return (
    <div className="homepage container-fluid">
      <div className="topContainer row mb-4">
        <div className="col-md-9">
          <Slider products={sliderItems}/>
        </div>
        <div className="col-md-3 text-end">
          <CardType1
            image={
              "https://i.pinimg.com/564x/fd/72/7d/fd727db859403b1d94373ec4f118cd3f.jpg"
            }
            categoryName={"Gaming Accessories"}
            description={
              "Buy best gaming acceessories and boost up your gaming experience"
            }
          />
        </div>
      </div>
      <h2>Featured Products</h2>
      <div className="secondContainer mt-3 d-flex justify-content-between">
        {itemsArr.map((item) => {
          if (
            item.category.toLowerCase() === "audio" ||
            item.category.toLowerCase() === "camera"
          ) {
            return (
              <Link
                key={item._id}
                to={`/products/${item._id}`}
                className="text-decoration-none"
              >
                <CardType2
                  productImage={`${API_URL}${item.image}`}
                  productName={item.name}
                  shortDescription={item.description}
                />
              </Link>
            );
          }
        })}
      </div>
      <div className="thirdContainer mt-3">
        <h2 className=" fw-medium mb-4">New Arrivals</h2>
        <div className="items">
          {itemsArr.map((item, index) => {
            // const image = item.image.with('/uploads', '')
            return (
              <Link
                key={item._id}
                to={`/products/${item._id}`}
                className="text-decoration-none text-black"
              >
                <CardType3
                  key={item._id}
                  image={`${API_URL}${item.image}`}
                  productBrand={item.brand}
                  title={item.name}
                  price={item.price}
                  rating={item.rating}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
