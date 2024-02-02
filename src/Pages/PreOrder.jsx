import React, { useState } from 'react';
import { Col, Row } from "react-bootstrap";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";

const PreOrder = () => {
  // State object to store user input
  const [formData, setFormData] = useState({
    fullName: '',
    preOrderProduct: '',
    quantity: '',
    name: '',
    phoneNumber: '',
    additionalAdd: '',
    pincode: '',
  });
  const [errors, setErrors] = useState({
    fullName: '',
    preOrderProduct: '',
    quantity: '',
    name: '',
    phoneNumber: '',
    additionalAdd: '',
    landMark: '',
    pincode: '',
  })

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


  const handleSubmit=(e)=>{
    e.preventDefault();
   console.log(formData)

  }

  return (
    <div style={{ width: "80%", margin: " 80px auto" }}>
      <h2 style={{textAlign:"center"}}>Pre-Order Page</h2>
      <p style={{color:"#0cc1e0",fontWeight:"bold"}}>Get 15% off on pre-orders!</p>
      <p style={{color:"#0cc1e0",fontWeight:"bold"}}>Pre order means order us 5 to 10 days before</p>

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
                    <div className="Formlabel">
                    Which product want to purchase
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                  <select
  className="MyInput"
  name="preOrderProduct"
  value={formData.preOrderProduct}
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
                    Who much quantity
                    {/* <FaWhatsapp style={{fontSize:"30px",color:"green"}}/> */}
                  
                    <span className="error-message">⁕</span>{" "}
                  </div>
                </Col>
                <Col xs={12} md={6} xl={6}>
                  <input
                    type="number"
                    className="MyInput"
                    placeholder="Quantity"
                    name="quantity"
                    value={formData.quantity}
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

                      <button className="NextBtn" onClick={handleSubmit}>
                        Submit Pre Order
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          </form>
    </div>
  );
};

export default PreOrder;
