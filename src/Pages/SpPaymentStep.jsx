import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { Base_Url, saveOrderProductAPI } from "../common/Apis";
import { Context } from "../common/Context";
import "../Assets/Styles/PaymentSteps.css"

const SpPaymentStep = () => {
  const {
    cartItems,
    singleSubTotal,
    singleSavedAmount,
    ToastContainer,
    toast,
    singleItems,
  } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    AlternateNumber: "",
    email: "",
    houseNo: "",
    area: "",
    landMark: "",
    pincode: "",
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
    pincode: "",
    addressType: "",
    additionalAdd: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const payload = {
        customerName: formData.fullName,
        mobileNumber: formData.phoneNumber,
        alternateNumber: formData.AlternateNumber,
        landmark: formData.landMark,
        pincode: formData.pincode,
        address: formData.additionalAdd,
        products: [],
        totalAmount: singleSubTotal,
      };

      const selectedProducts = [];

      let quantity = singleItems?.quantity ? singleItems?.quantity : 1;

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
      console.log("res",response)
      console.log("data",response.data)
      if (data.success||response.status==201) {
        toast.success(
          "Your order has been placed successfully. Our operator will contact you shortly", { autoClose: 1500 }
        );
        // setSingleItems([])
        // Close the modal only after a successful request
        setShowPopup(true);
        closeModal();
        setTimeout(() => {
      setShowPopup(false);
    }, 3000); 
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } else {
        // Handle error if needed
        console.error("Error fetching data:", data.error);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "phoneNumber" || name === "AlternateNumber") {
      // Remove any non-digit characters (except '-')
      const numericValue = value.replace(/[^0-9-]/g, "");

      // Ensure the length does not exceed 10 digits
      const maxLength = 10;
      const truncatedValue = numericValue.slice(0, maxLength);

      // Parse the numeric value as an integer
      const intValue = parseInt(truncatedValue, 10);

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
    const { phoneNumber } = formData;

    if (phoneNumber) {
      const isConfirmed = window.confirm(
        `Are you sure This mobile number  ${phoneNumber} is correct?`
      );

      if (!isConfirmed) {
        // Stop here if not confirmed
        return;
      }
    } else {
      alert("Mobile number is required");
      return;
    }

    var requiredFields = [
      "phoneNumber",
      "fullName",
      "landMark",
      "pincode",
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

  const handlePrevious = () => {
    //  setSingleItems({})
    //  navigate(`/single-product/${singleItems.product._id}`)
    navigate(`/`);
  };

  return (
    <div>
      {loading && (
        <div className="loader-container">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
  

      <h2 className="first-container-heading">Payment Step</h2>

      <div className="stepContiner">
      <ToastContainer />
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
                  <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                    Pin Code 
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                    <input
                      type="text"
                      className="MyInput"
                      placeholder="Enter pincode"
                      name="pincode"
                      value={formData.pincode}
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
                      <button className="NextBtn" onClick={handlePrevious}>
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
                      <span style={{fontWeight:"bold"}}>Name</span>
                      <span>{formData.fullName}</span>
                    </div>
                    <div>
                      <span style={{fontWeight:"bold"}}>Contact Number</span>
                      <span>{formData.phoneNumber}</span>
                    </div>
                    <div>
                      <span style={{fontWeight:"bold"}}>Alternate Mobile Number</span>
                      <span>{formData.AlternateNumber}</span>
                    </div>
                    <div>
                      <span style={{fontWeight:"bold"}}>Landmark</span>
                      <span>{formData.landMark}</span>
                    </div>
                    <div>
                      <span style={{fontWeight:"bold"}}>Pin Code</span>
                      <span>{formData.pincode}</span>
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
                        free delivery for order above 500 
                        {/* delivery charge 20 rs */}
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
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-container">
              <div className="card">
                <div className="circle-container">
                  <i className="checkmark">✓</i>
                </div>
                <h1 className="title">Order Successfull</h1>
                <h5>Your order Id : 5412458</h5>
                <p className="message">Your order has been placed successfully<br/> Our delivery boy will contact you shortly</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpPaymentStep;
