import { Link } from "react-router-dom";
import "./css/NavigationBar.css";
import { useContext } from "react";
import { CartContext } from "../cartContext/CartContext";


function NavigationBar() {
  const {cart} = useContext(CartContext)

  return (
    <>
      <div className="navigationBar ">
        <div className="topNav pb-0 mb-2">
          <ul className="list-unstyled d-flex gap-5">
            <Link to={"/homepage"}>
              <li>Home</li>
            </Link>
            <li className="dropdown">
              <Link
                to={"#"}
                className="dropdown-toggle"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Shop
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link to={"/categories/kids"} className="dropdown-item">
                    Kids
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/categories/electronics"}
                    className="dropdown-item"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link to={"/categories/clothing"} className="dropdown-item">
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link to={"/categories/household"} className="dropdown-item">
                    Household
                  </Link>
                </li>
                <li>
                  <Link to={"categories/furniture"} className="dropdown-item">
                    Furniture
                  </Link>
                </li>
              </ul>
            </li>

            <Link to={'/about'}><li>About Us</li></Link>
            <Link to={'/contact'}><li>Contact Us</li></Link>
          </ul>
        </div>
        <div className="middleNav row d-flex align-items-center mt-4">
          <div className="col-md-4 d-flex align-items-center gap-3">
            <i className="fa-solid fa-bag-shopping"></i>
            <h2 className="m-0 fw-bold">ShoppyZone</h2>
          </div>
          <div className="col-md-4">
            <form className="searchForm d-flex align-items-center">
              <input
                className="form-control"
                type="text"
                id="searchInput"
                placeholder="Search"
              />
              <button className="btn px-3">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
          <div className="col-md-4 text-end ">
            <Link to={"/admin"}>
              <i className="fa-solid fa-user"></i>
            </Link>
            <Link className="cartIcon" to={"/cart"}>
              <i className="fa-solid fa-cart-shopping ms-5"></i>
              <p className="cartIndicator">{cart.length}</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="lastNav">
        <ul className="list-unstyled m-0 d-flex align-items-center justify-content-between">
          <li>
            <Link to={"/categories/appliances"}>
              <i className="fa-solid fa-blender me-2"></i> Home Appliances
            </Link>
          </li>
          <li>
            <Link to={"/categories/audio"}>
              <i className="fa-solid fa-headphones me-2"></i> Bluetooth Audio
            </Link>
          </li>
          <li>
            <Link to={"/categories/camera"}>
              <i className="fa-solid fa-camera-retro me-2"></i> Camera Digital
            </Link>
          </li>
          <li>
            <Link to={"/categories/clothing"}>
              <i className="fa-sharp fa-solid fa-shirt me-2"></i> Fashion &
              Beauty
            </Link>
          </li>
          <li>
            <Link to={"/categories/electronics"}>
              <i className="fa-solid fa-laptop me-2"></i> Electronics
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavigationBar;
