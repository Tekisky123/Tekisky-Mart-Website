import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "../Assets/Styles/AddProductForm.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CiSearch } from "react-icons/ci";
import { HiOutlineClock } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";

Modal.setAppElement("#root"); // Set the root element for accessibility

const ProductList = () => {
  const [loading, setLoading] = useState(true);
  console.log(loading);

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, id]);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // New state for search input
  const [filterByApproved, setFilterByApproved] = useState("");
  const [filterByDealOfDay, setFilterByDealOfDay] = useState("");  
  const userRole = localStorage.getItem("userRole");
  const mobileNumber = localStorage.getItem("mobileNumber");

  const [updatedProduct, setUpdatedProduct] = useState({
    productBrand: "",
    availableStockQty: 0,
    mrp: 0,
    offerPrice: 0,
    packetweight: 0,
    unitOfMeasure: "",
    description: "",
    createdBy: "",
    productName: "",
    productType: "",
    productCategory: "",
    manufactureDate: "",
    expiryDate: "",
    sellerInformation: "",
    dealOfDay: false, // Assuming dealOfDay is a boolean field
    approved: false, // Assuming dealOfDay is a boolean field
    imageURL: [], // Assuming imageURL is an array field
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = {};
        if (userRole == "superadmin") {
          response = await axios.get(
            "https://tekiskymart.up.railway.app/product/getproduct"
          );
        } else {
          response = await axios.get(
            "https://tekiskymart.up.railway.app/product/mobile/" + mobileNumber
          );
        }
        console.log("response", response);
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMoreInfo = (product) => {
    setSelectedProduct(product);

    setShowModal(true);
  };

  useEffect(() => {
    if (selectedProduct) {
      setUpdatedProduct({
        productBrand: selectedProduct.productBrand,
        availableStockQty: selectedProduct.availableStockQty,
        mrp: selectedProduct.mrp,
        offerPrice: selectedProduct.offerPrice,
        packetweight: selectedProduct.packetweight,
        unitOfMeasure: selectedProduct.unitOfMeasure,
        description: selectedProduct.description,
        createdBy: selectedProduct.createdBy,
        productName: selectedProduct.productName,
        productType: selectedProduct.productType,
        productCategory: selectedProduct.productCategory,
        manufactureDate: selectedProduct.manufactureDate,
        expiryDate: selectedProduct.expiryDate,
        sellerInformation: selectedProduct.sellerInformation,
        dealOfDay: selectedProduct.dealOfDay,
        approved: selectedProduct.approved,
        imageURL: selectedProduct.imageURL,
      });
    }
  }, [selectedProduct]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      // Validate fields before submitting
      const requiredFields = [
        // "productType",
        // "productCategory",
        // "productBrand",
        "availableStockQty",
        "mrp",
        "offerPrice",
        "packetweight",
        "unitOfMeasure",
        "description",
        // "createdBy",
        "productName",
        "manufactureDate",
        "expiryDate",
        "sellerInformation",
        "imageURL",
      ];

      // Check if any required field is empty
      if (requiredFields.some((field) => !updatedProduct[field])) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please fill in all required fields.",
        });
        return;
      }

      // Send a request to update the product by ID
      await axios.put(
        `https://tekiskymart.up.railway.app/product/update/${selectedProduct?._id}`,
        updatedProduct
      );

      // Display SweetAlert on successful update
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `${selectedProduct?.productName} has been updated successfully.`,
      });

      // Close the modal and refresh the product list
      setShowModal(false);
      setProducts(
        products.map((product) =>
          product._id === selectedProduct?._id
            ? { ...product, ...updatedProduct }
            : product
        )
      );

      // Set isEditing to false after successful update
      setEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update the product");
    } finally {
      setLoading(false); // Set loading to false after the update process, whether successful or not
    }
  };

  const handleDelete = async () => {
    try {
      // Display SweetAlert confirmation dialog
      const result = await Swal.fire({
        title: `Are you sure you want to delete ${selectedProduct?.productName}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      // Check if the user confirmed deletion
      if (result.isConfirmed) {
        // Send a request to delete the product by ID
        await axios.get(
          `https://tekiskymart.up.railway.app/product/delete/${selectedProduct?._id}`
        );

        // Display a success toast

        // Close the modal and refresh the product list
        setShowModal(false);
        setProducts(
          products.filter((product) => product._id !== selectedProduct?._id)
        );

        // Display SweetAlert to indicate successful deletion
        Swal.fire({
          title: "Product Deleted!",
          text: `${selectedProduct?.productName} has been deleted successfully.`,
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);

      // Display an error toast if the deletion fails
      // toast.error("Failed to delete the product");
    }
  };

  const filteredProducts = products.filter((product) => {
    const productNameMatch = product.productName.toLowerCase().includes(searchInput.toLowerCase());
    const productCategoryMatch = product.productCategory.toLowerCase().includes(searchInput.toLowerCase());
    const approvedMatch = filterByApproved === "" || product.approved.toString() === filterByApproved;
    const dealOfDayMatch = filterByDealOfDay === "" || product.dealOfDay.toString() === filterByDealOfDay;
    return (productNameMatch || productCategoryMatch) && approvedMatch && dealOfDayMatch;
  });
  
  return (
    <div className="table-responsive container mt-4">
      <div style={{ marginBottom: "40px" }}>
        <button className="formButton" onClick={() => navigate("/add-Product")}>
          Add product
        </button>
      </div>
      <div className="product-sub-headings">
      <div className="custom-search-bar">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by Product Name or Product Category"
        />
        <div className="search-icon">
          <CiSearch />
          
        </div>
        
      </div>
      <div>
      <div className="custom-filter">
              <label htmlFor="approved">Approved Products:</label>
              <select
                id="approved"
                value={filterByApproved}
                onChange={(e) => setFilterByApproved(e.target.value)}
              >
                <option value="">All</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              </div>
              <div className="custom-filter">
              <label htmlFor="dealOfDay">Deals of the Day:</label>
              <select
                id="dealOfDay"
                value={filterByDealOfDay}
                onChange={(e) => setFilterByDealOfDay(e.target.value)}
              >
                <option value="">All</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              </div>
      </div>
             
</div>

      
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Product ID</th>
            <th>Product Category</th>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Approved</th>
            <th>Deal's Of The Day</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.reverse().map((product) => (
            <tr key={product._id}>
              {/* <td>{product._id}</td> */}
              <td> {product.productId}</td>
              <td>{product.productCategory}</td>
              <td>{product.productName}</td>
              <td>{product.productType}</td>
              <td className="approved-or-not">
                {product.approved ? (
                  <FaCheckCircle className="approved-icon" />
                ) : (
                  <HiOutlineClock className="pending-icon" />
                )}
              </td>
              <td className="approved-or-not">
                {product.dealOfDay ? (
                  <FaCheckCircle  className="approved-icon" />
                ) : (
                  <HiOutlineClock className="pending-icon" />
                )}
              </td>
              <td>
                <button
                  style={{ color: "white" }}
                  className="btn btn-info"
                  onClick={() => handleMoreInfo(product)}
                >
                  More Info
                </button>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "80%", // Adjust the width as needed
            maxWidth: "800px", // Adjust the max-width as needed
            margin: "auto",
          },
        }}
      >
        <div className="table-data-inputs">
          <h4>Product Name :- {selectedProduct?.productName}</h4>
          <table className="table table-striped  table-bordered">
            <tbody>
              <tr>
                <th>Product Type</th>
                <td>
                  {isEditing
                    ? // <input
                      //   type="text"
                      //   value={updatedProduct.productType}
                      //   onChange={(e) =>
                      //     setUpdatedProduct({
                      //       ...updatedProduct,
                      //       productType: e.target.value,
                      //     })
                      //   }
                      // />
                      selectedProduct?.productType
                    : selectedProduct?.productType}
                </td>
              </tr>
              <tr>
                <th>Category</th>
                <td>
                  {isEditing
                    ? // <input
                      //   type="text"
                      //   value={updatedProduct.productCategory}
                      //   onChange={(e) =>
                      //     setUpdatedProduct({
                      //       ...updatedProduct,
                      //       productCategory: e.target.value,
                      //     })
                      //   }
                      // />
                      selectedProduct?.productCategory
                    : selectedProduct?.productCategory}
                </td>
              </tr>
              <tr>
                <th>Brand</th>
                <td>
                  {isEditing
                    ? // <input
                      //   type="text"
                      //   value={updatedProduct.productBrand}
                      //   onChange={(e) =>
                      //     setUpdatedProduct({
                      //       ...updatedProduct,
                      //       productBrand: e.target.value,
                      //     })
                      //   }
                      // />
                      selectedProduct?.productBrand
                    : selectedProduct?.productBrand}
                </td>
              </tr>
              <tr>
                <th>Stock Quantity</th>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={updatedProduct.availableStockQty}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          availableStockQty: e.target.value,
                        })
                      }
                    />
                  ) : (
                    selectedProduct?.availableStockQty
                  )}
                </td>
              </tr>
              <tr>
                <th>MRP</th>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={updatedProduct.mrp}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          mrp: e.target.value,
                        })
                      }
                    />
                  ) : (
                    selectedProduct?.mrp
                  )}
                </td>
              </tr>
              <tr>
                <th>Offer Price</th>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={updatedProduct.offerPrice}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          offerPrice: e.target.value,
                        })
                      }
                    />
                  ) : (
                    selectedProduct?.offerPrice
                  )}
                </td>
              </tr>
              <tr>
                <th>Packet Weight</th>
                <td>
                  {isEditing ? (
                    <>
                      <input
                        type="number"
                        value={updatedProduct.packetweight}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            packetweight: e.target.value,
                          })
                        }
                      />
                      <select
                        value={updatedProduct.unitOfMeasure}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            unitOfMeasure: e.target.value,
                          })
                        }
                      >
                        <option value="g">grams (g)</option>
                        <option value="kg">kilograms (kg)</option>
                        <option value="l">liter (l)</option>
                        <option value="ml">milliliter (ml)</option>
                      </select>
                    </>
                  ) : (
                    <>
                      {selectedProduct?.packetweight}{" "}
                      {selectedProduct?.unitOfMeasure}
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <th>Description</th>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={updatedProduct.description}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    selectedProduct?.description
                  )}
                </td>
              </tr>
              {/* <tr>
                <th>Created By</th>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={updatedProduct.createdBy}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          createdBy: e.target.value,
                        })
                      }
                    />
                  ) : (
                    selectedProduct?.createdBy
                  )}
                </td>
              </tr> */}
              <tr>
                <th>Manufacture Date</th>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={updatedProduct.manufactureDate}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          manufactureDate: e.target.value,
                        })
                      }
                    />
                  ) : (
                    selectedProduct?.manufactureDate
                  )}
                </td>
              </tr>
              <tr>
                <th>Expiry Date</th>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={updatedProduct.expiryDate}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          expiryDate: e.target.value,
                        })
                      }
                    />
                  ) : (
                    selectedProduct?.expiryDate
                  )}
                </td>
              </tr>
              <tr>
                <th>Seller Information</th>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={updatedProduct.sellerInformation}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          sellerInformation: e.target.value,
                        })
                      }
                    />
                  ) : (
                    selectedProduct?.sellerInformation
                  )}
                </td>
              </tr>
              {userRole == "superadmin" && (
                <>
                  <tr>
                    <th>Deal of the Day</th>
                    <td>
                      {isEditing ? (
                        <select
                          value={updatedProduct.dealOfDay}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              dealOfDay: e.target.value === "true",
                            })
                          }
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      ) : selectedProduct?.dealOfDay ? (
                        "Yes"
                      ) : (
                        "No"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Approved</th>
                    <td>
                      {isEditing ? (
                        <select
                          value={updatedProduct.approved}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              approved: e.target.value === "true",
                            })
                          }
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      ) : selectedProduct?.approved ? (
                        "Yes"
                      ) : (
                        "No"
                      )}
                    </td>
                  </tr>
                </>
              )}
              <tr>
                <th>Images</th>
                <td>
                  <div className="image-container">
                    {selectedProduct?.imageURL.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Product ${index + 1}`}
                        className="modal-image"
                      />
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
            <th>Actions</th>
            <div className="option-buttons">
              {isEditing ? (
                <button
                  className="btn btn-success"
                  onClick={() => {
                    handleUpdate();
                    // alert("Are You Sure You Want To Save Changes");
                  }}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    setEditing(true);
                    setUpdatedProduct({ ...selectedProduct });
                  }}
                >
                  Update Product
                </button>
              )}
              <button className="btn btn-danger" onClick={() => handleDelete()}>
                Delete Product
              </button>
            </div>
          </table>
          <button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
