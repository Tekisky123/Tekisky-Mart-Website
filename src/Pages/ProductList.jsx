import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "../Assets/Styles/AddProductForm.css";
import { toast } from "react-toastify";

Modal.setAppElement("#root"); // Set the root element for accessibility

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setEditing] = useState(false);

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
    imageURL: [], // Assuming imageURL is an array field
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://tekiskymart.onrender.com/admin/getproduct"
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
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
        imageURL: selectedProduct.imageURL,
      });
    }
  }, [selectedProduct]);

  const handleUpdate = async () => {
    try {
      // Send a request to update the product by ID
      await axios.put(
        `https://tekiskymart.onrender.com/admin/update/${selectedProduct?._id}`,
        updatedProduct
      );

      // Display a success toast
      toast.success(`${selectedProduct?.productName} updated successfully`);

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
    }
  };

  const handleDelete = async () => {
    try {
      // Send a request to delete the product by ID
      await axios.get(
        `https://tekiskymart.onrender.com/admin//delete/${selectedProduct?._id}`
      );

      // Display a success toast
      toast.success(`${selectedProduct?.productName} deleted successfully`);

      // Close the modal and refresh the product list
      setShowModal(false);
      setProducts(
        products.filter((product) => product._id !== selectedProduct?._id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);

      if (error.response) {
        // The request was made, but the server responded with an error status
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }

      // Display an error toast if the deletion fails
      toast.error("Failed to delete the product");
    }
  };

  return (
    <div className="table-responsive container mt-4">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Product ID</th>
            <th>Product Category</th>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              {/* <td>{product._id}</td> */}
              <td>{product.productId}</td>
              <td>{product.productCategory}</td>
              <td>{product.productName}</td>
              <td>{product.productType}</td>
              <td>
                <button
                style={{color:"white"}}
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
                  {isEditing ? (
                    <input
                      type="text"
                      value={updatedProduct.productType}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          productType: e.target.value,
                        })
                      }
                    />
                  ) : (
                    selectedProduct?.productType
                  )}
                </td>
              </tr>
              <tr>
                <th>Category</th>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={updatedProduct.productCategory}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          productCategory: e.target.value,
                        })
                      }
                    />
                  ) : (
                    selectedProduct?.productCategory
                  )}
                </td>
              </tr>
              <tr>
                <th>Brand</th>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={updatedProduct.productBrand}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          productBrand: e.target.value,
                        })
                      }
                    />
                  ) : (
                    selectedProduct?.productBrand
                  )}
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
                      <input
                        type="text"
                        value={updatedProduct.unitOfMeasure}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            unitOfMeasure: e.target.value,
                          })
                        }
                      />
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
              <tr>
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
              </tr>
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
                  ) : (
                    selectedProduct?.dealOfDay ? "Yes" : "No"
                  )}
                </td>
              </tr>
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
                  alert("Are You Sure You Want To Save Changes");
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
            <button
              className="btn btn-danger"
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete ${selectedProduct?.productName}?`
                  )
                ) {
                  handleDelete();
                }
              }}
            >
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