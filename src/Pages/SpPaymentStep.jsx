import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { Base_Url, saveOrderProductAPI } from "../common/Apis";
import { Context } from "../common/Context";

const SpPaymentStep = () => {
  const {
    productSize,
    cartItems,
    handleRemoveFromCart,
    singleSubTotal,
    singleSavedAmount,
    handleCartProductQuantity,
    ToastContainer,
    toast,
    selectProductData,
    ourProduct,
    singleItems,
    setSingleItems
  } = useContext(Context);
  console.log("cartItems",cartItems);
  console.log("singleItems",singleItems);
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    AlternateNumber: "",
    email: "",
    houseNo: "",
    area: "",
    landMark: "",
    // addressType: "",
    additionalAdd: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    AlternateNumber: "",
    email: "",
    houseNo: "",
    area: "",
    landMark: "",
    addressType: "",
    additionalAdd: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async () => {
    // Handle form submission and order details here
    console.log("Form data:", formData);
    console.log("Order details:", cartItems);
    try {
      const payload = {
        customerName: formData.fullName,
        mobileNumber: formData.phoneNumber,
        alternateNumber: formData.AlternateNumber,
        landmark: formData.landMark,
        address: formData.additionalAdd,
        products: [],
        totalAmount: singleSubTotal,
      };

      const selectedProducts = [];

      let quantity=singleItems?.quantity ? singleItems?.quantity : 1

        selectedProducts.push({
          product: singleItems.product._id || singleItems._id,
          quantity: quantity,
        });
      
      payload.products = selectedProducts;
      console.log("payload", payload);

      const response = await axios.post(
        `
    ${Base_Url}${saveOrderProductAPI}`,
        payload
      );
      const data = response.data;
      if (data.success) {
        toast.success(
          "Your order has been placed successfully. Our operator will contact you shortly"
        );
        // setSingleItems([])
        // Close the modal only after a successful request
        closeModal();
        navigate('/')
      } else {
        // Handle error if needed
        console.error("Error fetching data:", data.error);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "phoneNumber" || name === "AlternateNumber") {
      // Remove any non-digit characters (except '-')
      const numericValue = value.replace(/[^0-9-]/g, "");

      // Ensure the length does not exceed 10 digits
      const maxLength = 12;
      const truncatedValue = numericValue.slice(0, maxLength);

      // Parse the numeric value as an integer
      const intValue = parseInt(truncatedValue, 12);

      // Check if the parsed value is a positive number
      const isValidNumber = !isNaN(intValue) && intValue >= 0;

      // Update form data and errors accordingly
      setFormData((prevData) => ({
        ...prevData,
        [name]: isValidNumber ? truncatedValue : "",
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValidNumber ? "" : "Please enter a valid 10-digit number",
      }));
    } else if (
      name === "aadharNumber" ||
      name === "pincode" ||
      name === "rationCardNo"
    ) {
      // Remove any non-digit characters
      const numericValue = value.replace(/[^0-9]/g, "");

      // Check if the length does not exceed the specified limit
      const maxLength =
        name === "aadharNumber" ? 12 : name === "pincode" ? 6 : 16;
      const truncatedValue = numericValue.slice(0, maxLength);

      // Update form data with the truncated value
      setFormData((prevData) => ({ ...prevData, [name]: truncatedValue }));
    } else if (name === "age") {
      const ageValue = parseInt(value, 10);

      // Check if the value is within the desired range (1 to 120)
      const isValidAge = !isNaN(ageValue) && ageValue >= 1 && ageValue <= 120;

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValidAge ? "" : "Age must be between 1 and 120",
      }));

      // Update form data with the validated value
      setFormData((prevData) => ({
        ...prevData,
        [name]: isValidAge ? ageValue : "",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    var requiredFields = [
      "phoneNumber",
      "fullName",
      // "AlternateNumber",
      // "email",
      // "houseNo",
      // "area",
      "landMark",
      // "addressType",
      "additionalAdd",
    ];

    let hasError = false;

    console.log(hasError);

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: " ",
        }));
        hasError = true;
      }
    });

    if (hasError) {
      alert("Mandatory fields are required");
    }
    if (!hasError) {
      openModal();
    }
  };

  const handlePrevious=()=>{
    //  setSingleItems({})
    //  navigate(`/single-product/${singleItems.product._id}`)
     navigate(`/`)
    }

  return (
    <div>
      <ToastContainer />

      <h2 className="first-container-heading">Payment Step</h2>

      <div className="stepContiner">
        <div style={{ width: "80%", margin: " 80px auto" }}>
          <form action="">
            <>
              <Row className="Row">
                <Col xs={12} md={4} xl={4}>
                  {" "}
                  <div className="Formlabel">
                    Enter Your Mobile Number
                    <span className="error-message">⁕</span>{" "}
                  </div>
                </Col>
                <Col xs={12} md={6} xl={6}>
                  <input
                    type="number"
                    className="MyInput"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col xs={12} md={6} xl={6}></Col>
                <Col xs={12} md={6} xl={6}></Col>
              </Row>
            </>

            <>
              <div>
                <Row className="Row">
                  <Col xs={12} md={4} xl={4}>
                    <div className="Formlabel">
                      Name
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                    <input
                      type="text"
                      className="MyInput"
                      placeholder="Enter Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                      Alternate Mobile Number
                      {/* <span className="error-message">⁕</span>{" "} */}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                    <input
                      type="number"
                      className="MyInput"
                      placeholder="Enter Alternate Mobile Number"
                      name="AlternateNumber"
                      value={formData.AlternateNumber}
                      onChange={handleInputChange}
                    />
                  </Col>
                  {/* <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                    Email Address
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col> */}
                  {/* <Col xs={12} md={6} xl={6}>
                    <input
                      type="email"
                      className="MyInput"
                      placeholder="Enter Email Adress"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Col> */}
                  {/* <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                    House No, Bulding ,Company ,Appartment
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                    <input
                      type="text"
                      className="MyInput"
                      placeholder="Enter House No, Bulding ,Company ,Appartment"
                      name="houseNo"
                      value={formData.houseNo}
                      onChange={handleInputChange}
                    />
                  </Col> */}
                  {/* <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                      Area Colony , Street , Sector , Village
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                    <input
                      type="text"
                      className="MyInput"
                      placeholder="Enter Area Colony , Street , Sector , Village"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                    />
                  </Col> */}
                  <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                      Landmark e.g. near IT park
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                    <input
                      type="text"
                      className="MyInput"
                      placeholder="Enter Landmark e.g. near IT park"
                      name="landMark"
                      value={formData.landMark}
                      onChange={handleInputChange}
                    />
                  </Col>
                  {/* <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                    Address Type
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                  <select
                  name="addressType"
                  className="MyInput"
                  value={formData.addressType}
                  onChange={handleInputChange}
                >
                  <option value="empty">Select Address Type</option>
                  <option value="male">Home</option>
                  <option value="female">Office</option>

                </select>
                  </Col> */}
                  <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                      Address Details
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                    <textarea
                      style={{ height: "auto" }}
                      type="textarea"
                      rows="4"
                      className="MyInput"
                      placeholder="Enter House No, Bulding ,Company ,Appartment ,Area Colony , Street , Sector , Village"
                      name="additionalAdd"
                      value={formData.additionalAdd}
                      onChange={handleInputChange}
                    />
                  </Col>

                  <Col xs={12} md={6} xl={6}></Col>
                  <Col xs={12} md={6} xl={6}>
                    {" "}
                    <div
                      style={{
                        float: "right",
                        margin: "10px",
                        display: "flex",
                      }}
                    >
                      <button
                        className="NextBtn"
                        onClick={handlePrevious}
                      >
                        Previous
                      </button>
                      <button className="NextBtn" onClick={handleNext}>
                        Next
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          </form>
        </div>
      </div>
      <div className="modalDiv">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Order Preview"
        >
          <div>
            <div style={{ width: "80%", margin: "20px auto" }}></div>
            <div className="cx-cart m-4">
              <Row>
                <Col xs={12} md={12} xl={12}>
                  <div className="cx-heading">
                    <h3>Shipping Cart</h3>
                  </div>
                </Col>
                <Col xs={12} md={8} xl={8}>
                  <div className="customerDetail">
                    <div>
                      <span>Name</span>
                      <span>{formData.fullName}</span>
                    </div>
                    <div>
                      <span>Contact Number</span>
                      <span>{formData.phoneNumber}</span>
                    </div>
                    <div>
                      <span>Alternate Mobile Number</span>
                      <span>{formData.AlternateNumber}</span>
                    </div>
                    <div>
                      <span>Landmark</span>
                      <span>{formData.landMark}</span>
                    </div>
                    <div>
                      <span>Address Details</span>
                      <span>{formData.additionalAdd}</span>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={4} xl={4}>
                  <div className="item-total totalCart">
                    <h4 style={{ marginBottom: "1rem" }}>Cart Total</h4>
                    <div>
                      <h5 className="totalDiv">
                        <span>Subtotal</span>
                        <span>{singleSubTotal} &#8377;</span>
                      </h5>
                      <h5 style={{ fontWeight: "600", marginBottom: "1rem" }}>
                        Shipping
                      </h5>
                      <h6 style={{ color: "gray" }}>
                        free delivery for order above 500 delivery charge 20 rs
                      </h6>
                      <h6 style={{ color: "gray", marginBottom: "1rem" }}>
                        <span>saved Amount:</span>
                        <span>&#8377; {singleSavedAmount}</span>
                      </h6>
                      <h6 style={{ fontWeight: "600", marginBottom: "1rem" }}>
                        Shipping to maharashtra
                      </h6>
                      <h5
                        style={{ fontWeight: "600", marginBottom: "1rem" }}
                        className="totalDiv"
                      >
                        <span>Total</span>
                        <span>{singleSubTotal} &#8377;</span>
                      </h5>
                      {/* <button style={{width:"100%",marginBottom:"0.5rem"}} className="checkoutBtn" onClick={()=>navigate('/payment_step')}>Proceed To Checkout</button> */}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            <div
              style={{ textAlign: "center", margin: "20px", display: "flex" }}
            >
              <button onClick={closeModal} className="NextBtn">
                Back
              </button>
              <button onClick={handleSubmit} className="NextBtn">
                Submit
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SpPaymentStep;
