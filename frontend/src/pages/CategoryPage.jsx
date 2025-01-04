import { useEffect, useState } from "react";
import "./css/CategoryPage.css";
import axios from "axios";
import { API_URL } from "../config/config";
import { useParams, Link } from "react-router-dom";
import CardType3 from "../components/CardType3";

function CategoryPage() {
  const category = useParams();
  console.log(category.category);

  const [products, setproducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/products/allproducts`)
      .then((res) => {
        setproducts(res.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <div>
      <h1 style={{ textTransform: "capitalize" }}>{category.category}</h1>
      <div
        className="cards d-grid gap-3"
        style={{
          gridTemplateColumns: "repeat(auto-fit,minmax(250px ,1fr))",
          placeItems: "center",
        }}
      >
        {products.map((product) => {
          if (product.category.toLowerCase() === category.category) {
            return (
              <Link className="text-decoration-none text-black" key={product._id} to={`/products/${product._id}`}>
                <CardType3
                  key={product._id}
                  title={product.name}
                  productBrand={product.brand}
                  price={product.price}
                  rating={product.averageRating}
                  image={`${API_URL}${product.image}`}
                />
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}

export default CategoryPage;
