import axios from "axios";
import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Context } from "../common/Context";
import { useNavigate } from "react-router-dom";

const SaleWithUs = () => {
  const {

    ToastContainer,toast

  } = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    saleProduct: "",
    hasShop: "no",
    shopName: "",
    hasGSTNumber: "no",
    GSTNumber: "",
    phoneNumber: "",
    productDetails: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    saleProduct: "",
    hasShop: "",
    shopName: "",
    hasGSTNumber: "",
    GSTNumber: "",
    phoneNumber: "",
    productDetails: "",
  });

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



  const handleSaleWithUs = async(e) => {
    e.preventDefault();

  
    var requiredFields = [
      "fullName",
      "saleProduct",
      "hasShop",
      "hasGSTNumber",
      "phoneNumber",
      "productDetails",
    ];
  
    let hasError = false;
  
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
      const payload = {
        shopSellerName: formData.fullName,
        doYouHaveGST: formData.hasGSTNumber === 'yes' ? true : false,
        doYouHaveShop: formData.hasShop === 'yes' ? true : false,
        GST: formData.GSTNumber,
        shopName: formData.shopName,
        productDetails: formData.productDetails,
        mobileNumber: formData.phoneNumber,
        whichProductYouHaveToSale: formData.saleProduct,
      };
    
      try {
        // Make a POST request to your backend API endpoint
        const response = await axios.post(
          "https://tekiskymart.onrender.com/client/enquiry",
          payload
        );
    
        if (response.data.status === 200 || response.data.success === true) {
          toast.success('Tekisky Mart team will contact you soon')
          setTimeout(() => {
            navigate('/')
          }, 3000);
        }
      } catch (error) {
        console.error("Error creating user:", error.message);
        alert(error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
  
  
  };

  return (
    <div>
      <ToastContainer/>
      <div style={{ width: "80%", margin: " 80px auto" }}>
        <Row className="Row">
          <Col xs={12}>
            <h1 style={{textAlign:"center"}}>Sell With Us</h1>
            <h3>Terms & Conditions</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ea
              maxime quibusdam reprehenderit omnis, consequatur, vero sit
              provident repellendus quidem eveniet pariatur, nisi cupiditate
              magnam assumenda debitis dicta unde veniam.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ea
              maxime quibusdam reprehenderit omnis, consequatur, vero sit
              provident repellendus quidem eveniet pariatur, nisi cupiditate
              magnam assumenda debitis dicta unde veniam.
            </p>
          </Col>
        </Row>
        <form action="">
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
                    Mobile Number
                    {/* <FaWhatsapp style={{fontSize:"30px",color:"green"}}/> */}
                    <span className="error-message">⁕</span>{" "}
                  </div>
                </Col>
                <Col xs={12} md={6} xl={6}>
                  <input
                    type="number"
                    className="MyInput"
                    placeholder="Mobile Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col xs={12} md={4} xl={4}>
                  <div className="Formlabel">
                    Which product do you want to sell
                    <span className="error-message">⁕</span>{" "}
                  </div>
                </Col>
                <Col xs={12} md={6} xl={6}>
                  {/* <select
                    className="MyInput"
                    name="saleProduct"
                    value={formData.saleProduct}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Product</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                    <option value="option5">Option 5</option>
                  </select> */}

                  <input
                type="text"
                    className="MyInput"
                    placeholder="Enter Product Name"
                    name="saleProduct"
                    value={formData.saleProduct}
                    onChange={handleInputChange}
                  />
                </Col>
  
                <Col xs={12} md={4} xl={4}>
                  {" "}
                  <div className="Formlabel">
                    Product Details
                    <span className="error-message">⁕</span>{" "}
                  </div>
                </Col>
                <Col xs={12} md={6} xl={6}>
                  <textarea
                    style={{ height: "auto" }}
                    type="textarea"
                    rows="4"
                    className="MyInput"
                    placeholder="Enter product details"
                    name="productDetails"
                    value={formData.productDetails}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col xs={12} md={4} xl={4}>
                  {" "}
                  <div className="Formlabel">
                    Do You have shop ?
                    {/* <span className="error-message">⁕</span>{" "} */}
                   
                  
                  </div>
                </Col>
                <Col xs={12} md={6} xl={6}>
                <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        width:"50%"
                      }}
                    >
                      <label>Yes</label>
                      <input
                        style={{ width: "auto" }}
                        type="radio"
                        name="hasShop"
                        value="yes"
                        checked={formData.hasShop == "yes"}
                        onChange={handleInputChange}
                      />
                      <label> No</label>
                      <input
                        style={{ width: "auto" }}
                        type="radio"
                        name="hasShop"
                        value="no"
                        checked={formData.hasShop == "no"}
                        onChange={handleInputChange}
                      />
                    </div>
                  {formData.hasShop === "yes" && (
                    <input
                      type="text"
                      className="MyInput"
                      placeholder="Shop Name"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleInputChange}
                    />
                  )}
                </Col>

                <Col xs={12} md={4} xl={4}>
                  {" "}
                  <div className="Formlabel">
                    Do You have G.S.T. Number ?
                    {/* <span className="error-message">⁕</span>{" "} */}
                
                  
                  </div>
                </Col>
                <Col xs={12} md={6} xl={6}>
                <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        width:"50%"
                      }}
                    >
                      <label>Yes</label>
                      <input
                        style={{ width: "auto" }}
                        type="radio"
                        name="hasGSTNumber"
                        value="yes"
                        checked={formData.hasGSTNumber == "yes"}
                        onChange={handleInputChange}
                      />
                      <label> No</label>
                      <input
                        style={{ width: "auto" }}
                        type="radio"
                        name="hasGSTNumber"
                        value="no"
                        checked={formData.hasGSTNumber == "no"}
                        onChange={handleInputChange}
                      />
                    </div>
                  {formData.hasGSTNumber === "yes" && (
                    <input
                      type="text"
                      className="MyInput"
                      placeholder="GST Number"
                      name="GSTNumber"
                      value={formData.GSTNumber}
                      onChange={handleInputChange}
                    />
                  )}
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
                    <button className="NextBtn" onClick={handleSaleWithUs}>
                      Submit Enquiry
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          </>
        </form>
      </div>
    </div>
  );
};

export default SaleWithUs;
