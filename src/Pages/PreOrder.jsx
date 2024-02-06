import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { Context } from "../common/Context";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const PreOrder = () => {
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, id]);

  const { ToastContainer, toast, Swal } = useContext(Context);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    preOrderProduct: "",
    quantity: "",
    phoneNumber: "",
    additionalAdd: "",
    description: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    preOrderProduct: "",
    phoneNumber: "",
    additionalAdd: "",
    landMark: "",
    description: "",
    pincode: "",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://tekiskymart.up.railway.app/product/getcategories"
        );
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const handlePreOrder = (e) => {
    e.preventDefault();

    var requiredFields = [
      "preOrderProduct",
      "fullName",
      "quantity",
      "phoneNumber",
      // "pincode",
      // "additionalAdd",
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
      Swal.fire({
        title: "Warning!",
        text: "All mandatory fields are required",
        icon: "error",
      });
    }
    if (!hasError) {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      costumerName: formData.fullName,
      wichPoductWantToPurchase: formData.preOrderProduct,
      quantity: formData.quantity,
      mobileNumber: formData.phoneNumber,
    };

    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post(
        "https://tekiskymart.up.railway.app/pre/order",
        payload
      );

      if (response.data.status == 200 || response.data.success == true) {
        toast.success("Your pre-order has been booked successfully");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <div style={{ width: "80%", margin: " 80px auto" }}>
      <ToastContainer />
      <h2 style={{ textAlign: "center" }}>Pre Order</h2>
      <marquee
        direction="left"
        style={{ color: "#004AAD", fontWeight: "bold" }}
      >
        <span style={{ marginRight: "100px", marginBottom: "50px" }}>
          {" "}
          Get 15% off on pre-orders!{" "}
        </span>
        <span>Pre order means order us 5 to 10 days before</span>
      </marquee>

      <form action="">
        <>
          <div>
            <Row className="Row">
              <Col xs={12} md={4} xl={4}>
                <div className="Formlabel">
                  Your Name
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
                  Your Mobile Number
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
                  Which product you want to purchase
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
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </Col>
              <Col xs={12} md={4} xl={4}>
                {" "}
                <div className="Formlabel">
                  How much quantity
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
                  Description
                  {/* <span className="error-message">⁕</span>{" "} */}
                </div>
              </Col>
              <Col xs={12} md={6} xl={6}>
                <textarea
                  style={{ height: "auto" }}
                  type="textarea"
                  rows="4"
                  className="MyInput"
                  placeholder="Enter Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Col>
              {/* <Col xs={12} md={4} xl={4}>
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
                  </Col> */}

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
                  <button className="NextBtn" onClick={handlePreOrder}>
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
