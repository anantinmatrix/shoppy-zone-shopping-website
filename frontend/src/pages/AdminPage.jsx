import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config/config";
import { showNotification } from "../NotificationProvider";
import Rating from "../components/Rating";
import { useNavigate, Link } from "react-router-dom";

function AdminPage() {
  const [userInfo, setuserInfo] = useState({});
  const [addProductInfo, setaddProductInfo] = useState({});
  const [imageFile, setimageFile] = useState(null);
  const [userProducts, setuserProducts] = useState([]);
  const [editUserModal, setEditUserModal] = useState(false);
  const [editUser, seteditUser] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const updateUserChange = (e) => {
    seteditUser({
      ...editUser,
      [e.target.id]: e.target.value,
    });
  };
  const updateUserForm = (e) => {
    e.preventDefault();
    axios.put(`${API_URL}/users/updateuser`,
        {
          name: editUser.editName,
          address: editUser.editAddress,
          city: editUser.editCity,
          postalCode: editUser.editPostalCode,
          country: editUser.editcountry,
        },
        {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setEditUserModal(false)
        getUserInfo()
        showNotification("success", "Updated user info", 3);
      })
      .catch((err) => {
        showNotification("error", "Error updating user info", 3);
      });
  };

  const handleOnChange = (e) => {
    setaddProductInfo({
      ...addProductInfo,
      [e.target.id]: e.target.value,
    });
  };
  const getAdminProducts = () => {
    try {
      axios
        .get(`${API_URL}/products/userproducts`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setuserProducts(res.data.products);
        });
    } catch (err) {
      showNotification("error", "Error getting the products", 3);
    }
  };
  const handleFile = (e) => {
    setimageFile(e.target.files[0]);
  };
  const handleCreateProduct = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("name", addProductInfo.productName);
    form.append("description", addProductInfo.productDescription);
    form.append("price", addProductInfo.productPrice);
    form.append("category", addProductInfo.productCategory);
    form.append("brand", addProductInfo.productBrand);
    form.append("image", imageFile);

    axios
      .post(`${API_URL}/products/createproduct`, form, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        showNotification("success", "Uploaded Successfully", 3);
        getAdminProducts();
      })
      .catch((err) => {
        showNotification("error", "Error creating the product", 3);
      });
  };
  const getUserInfo = () => {
    axios
      .get(`${API_URL}/users/getuser`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setuserInfo(res.data.user);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAdminProducts();
    getUserInfo();
  }, []);
  return (
    <div className="container-fluid">
      {editUserModal ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            height: "100vh",
            width: "100vw",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "1000",
            backdropFilter: "brightness(50%)",
          }}
        >
          <form
            onSubmit={updateUserForm}
            className="p-4 bg-light-subtle shadow rounded-2"
            style={{ width: "20rem" }}
          >
            <h5 className="text-center mb-3">Update User</h5>
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Name"
              id="editName"
              onChange={(e) => updateUserChange(e)}
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Address"
              id="editAddress"
              onChange={(e) => updateUserChange(e)}
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="City"
              id="editCity"
              onChange={(e) => updateUserChange(e)}
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Postal Code"
              id="editPostalCode"
              onChange={(e) => updateUserChange(e)}
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Country"
              id="editCountry"
              onChange={(e) => updateUserChange(e)}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              onClick={() => setEditUserModal(false)}
              className="btn btn-danger ms-3"
            >
              Close
            </button>
          </form>
        </div>
      ) : null}
      <div className="adminInfo row justify-content-between">
        <div className="col-md-7 shadow">
          <h3>User</h3>
          <p>{userInfo.email}</p>
          <h5>{userInfo.name}</h5>

          <h5>
            Address :
            {userInfo.shipping ? `${userInfo.shipping.address},${userInfo.shipping.city},${userInfo.shipping.country}` : null}
          </h5>
          {user?.isSeller ? <p>Seller</p> : null}
          <button
            onClick={() => {
              setEditUserModal(true);
            }}
            className="btn btn-primary mb-3 mt-2"
          >
            Edit User
          </button>
          <div>
            <h3>Products</h3>
            <h6>List of Products :</h6>
            <div className="userProducts">
              {userProducts.map((product) => {
                return (
                  <div
                    key={product._id}
                    className="border border-1 shadow-sm rounded-2 mb-3"
                  >
                    <div className="row align-items-center p-2">
                      <div className="col-md-5">
                        <img
                          src={`${API_URL}${product.image}`}
                          alt="product_image"
                          style={{ objectFit: "cover", width: "10rem" }}
                        />
                      </div>
                      <div className="col-md-7">
                        <h4>{product.name}</h4>
                        <h6>Rs. {product.price}</h6>
                        <div>
                          <p>
                            Ratings :{" "}
                            {product.reviews ? product.reviews.length : 0}/5
                          </p>{" "}
                          <Rating rating={product.reviews.length} />
                        </div>
                        <button
                          onClick={() => navigate(`/products/${product._id}`)}
                          className="btn btn-primary"
                        >
                          See Product
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-md-4 shadow d-flex align-items-center flex-column p-4">
          <h4>Add a Product</h4>
          <form className="w-75" onSubmit={handleCreateProduct}>
            <input
              type="text"
              className="form-control mb-2"
              id="productName"
              placeholder="Product Name"
              onChange={(e) => handleOnChange(e)}
            />
            <input
              type="number"
              className="form-control mb-2"
              id="productPrice"
              placeholder="Product Price"
              onChange={(e) => handleOnChange(e)}
            />
            <textarea
              className="form-control mb-2"
              id="productDescription"
              placeholder="Product Description"
              onChange={(e) => handleOnChange(e)}
            />
            <input
              type="text"
              className="form-control mb-2"
              id="productBrand"
              placeholder="Product Brand"
              onChange={(e) => handleOnChange(e)}
            />
            <input
              type="file"
              className="form-control mb-2"
              id="productImage"
              placeholder="Product Image"
              onChange={(e) => handleFile(e)}
            />
            <select
              name="category"
              id="category"
              className="form-control mb-2"
              value={addProductInfo.productCategory}
              onChange={(e) => handleOnChange(e)}
            >
              <option value="kids">Kids</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="household">Household</option>
              <option value="furniture">Furniture</option>
              <option value="audio">Audio</option>
              <option value="camera">Camera</option>
            </select>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Add Products
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
