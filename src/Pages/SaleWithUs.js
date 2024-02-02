import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const SaleWithUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    saleProduct: "",
    hasGSTNumber: "no",
    name: "",
    phoneNumber: "",
    productDetails: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    saleProduct: "",
    hasGSTNumber: "",
    name: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <div style={{ width: "80%", margin: " 80px auto" }}>
        <Row className="Row">
          <Col xs={12}>
            <h1 style={{textAlign:"center"}}>Sale With Us</h1>
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
                    Which product do you want to sale
                    <span className="error-message">⁕</span>{" "}
                  </div>
                </Col>
                <Col xs={12} md={6} xl={6}>
                  <select
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
                  </select>
                </Col>
                <Col xs={12} md={4} xl={4}>
                  {" "}
                  <div className="Formlabel">
                    Do You have G.S.T. Number
                    {/* <span className="error-message">⁕</span>{" "} */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
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
                  
                  </div>
                </Col>
                <Col xs={12} md={6} xl={6}>
                  {formData.hasGSTNumber === "yes" && (
                    <input
                      type="number"
                      className="MyInput"
                      placeholder="GST Number"
                      name="hasGSTNumber"
                      value={formData.hasGSTNumber}
                      onChange={handleInputChange}
                    />
                  )}
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
                    <button className="NextBtn" onClick={handleSubmit}>
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
