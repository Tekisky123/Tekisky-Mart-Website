import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import "../Assets/Styles/AddProductForm.css"

const AddProductForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productCategory: '',
    productName: '',
    productType: '',
    productBrand: '',
    availableStockQty: '',
    mrp: '',
    offerPrice: '',
    packetweight: '',
    description: '',
    createdby: '',
    files: [],
    manufactureDate: '',
    expiryDate: '',
    sellerInformation: '',
    dealOfDay: false
  });

  const [filePreviews, setFilePreviews] = useState([]);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const handleFilesChange = useCallback((e) => {
    const { name, files } = e.target;

    const previews = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setFormData((prevData) => ({
      ...prevData,
      [name]: Array.from(files),
    }));
    setFilePreviews(previews);
  }, []);

  const handleRemoveFile = useCallback((index) => {
    setFormData((prevData) => {
      const updatedFiles = [...prevData.files];
      updatedFiles.splice(index, 1);

      setFilePreviews((prevPreviews) => {
        const updatedPreviews = [...prevPreviews];
        updatedPreviews.splice(index, 1);
        return updatedPreviews;
      });

      return {
        ...prevData,
        files: updatedFiles,
      };
    });
  }, []);

  useEffect(() => {
    return () => {
      filePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [filePreviews]);

const validateForm = () => {
  const newErrors = {};
  for (const key in formData) {
    // Exclude checkbox (dealOfDay) from validation
    if (key !== 'files' && key !== 'dealOfDay' && !formData[key]) {
      newErrors[key] = 'This field is required *';
    }
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsLoading(true); // Set loading to true when submitting


    const apiUrl = 'https://tekiskymart.onrender.com/admin/addproduct';

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (key === 'files') {
        formData[key].forEach((file) => {
          formDataToSend.append('files', file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      await axios.post(apiUrl, formDataToSend);
      console.log('Data successfully posted');
      navigate('/');
    } catch (error) {
      console.error('Error posting data:', error);
    }finally {
      setIsLoading(false); // Set loading to false when the request is complete
    }
  };

  return (
    <div  className={`addProductForm ${isLoading ? 'loading' : ''}`}>
      {isLoading && <div className="spinner"></div>}
    <form onSubmit={handleSubmit} className="addProductForm">
     <label className="formLabel">
        Product Category:
        <select
          value={formData.productCategory}
          onChange={(e) =>
            setFormData({ ...formData, productCategory: e.target.value })
          }
          className={`formInput ${errors.productCategory ? 'error' : ''}`}
        >
          <option value="">Select Category</option>
          <option value="DATES">DATES</option>
          <option value="HOMEMADE SNACKS">HOMEMADE SNACKS</option>
          <option value="CLOTHES">CLOTHES</option>
          <option value="PERFUMES">PERFUMES</option>
        </select>
        {errors.productCategory && (
          <span className="errorMessage">{errors.productCategory}</span>
        )}
      </label>

    <label className="formLabel">
      Product Name:
      <input
        type="text"
        value={formData.productName}
        onChange={(e) =>
          setFormData({ ...formData, productName: e.target.value })
        }
        className={`formInput ${errors.productName ? 'error' : ''}`}
      />
      {errors.productName && (
        <span className="errorMessage">{errors.productName}</span>
      )}
    </label>

    <label className="formLabel">
      Product Type:
      <input
        type="text"
        value={formData.productType}
        onChange={(e) =>
          setFormData({ ...formData, productType: e.target.value })
        }
        className={`formInput ${errors.productType ? 'error' : ''}`}
      />
      {errors.productType && (
        <span className="errorMessage">{errors.productType}</span>
      )}
    </label>

    <label className="formLabel">
      Product Brand:
      <input
        type="text"
        value={formData.productBrand}
        onChange={(e) =>
          setFormData({ ...formData, productBrand: e.target.value })
        }
        className={`formInput ${errors.productBrand ? 'error' : ''}`}
      />
      {errors.productBrand && (
        <span className="errorMessage">{errors.productBrand}</span>
      )}
    </label>

    <label className="formLabel">
      Available Stock Qty:
      <input
        type="number"
        value={formData.availableStockQty}
        onChange={(e) =>
          setFormData({
            ...formData,
            availableStockQty: parseInt(e.target.value, 10),
          })
        }
        className={`formInput ${errors.availableStockQty ? 'error' : ''}`}
      />
      {errors.availableStockQty && (
        <span className="errorMessage">{errors.availableStockQty}</span>
      )}
    </label>

    <label className="formLabel">
      MRP:
      <input
        type="number"
        value={formData.mrp}
        onChange={(e) =>
          setFormData({
            ...formData,
            mrp: parseInt(e.target.value, 10),
          })
        }
        className={`formInput ${errors.mrp ? 'error' : ''}`}
      />
      {errors.mrp && <span className="errorMessage">{errors.mrp}</span>}
    </label>

    <label className="formLabel">
      Offer Price:
      <input
        type="number"
        value={formData.offerPrice}
        onChange={(e) =>
          setFormData({
            ...formData,
            offerPrice: parseInt(e.target.value, 10),
          })
        }
        className={`formInput ${errors.offerPrice ? 'error' : ''}`}
      />
      {errors.offerPrice && (
        <span className="errorMessage">{errors.offerPrice}</span>
      )}
    </label>

    <label className="formLabel">
      Packet Weight:
      <input
        type="text"
        value={formData.packetweight}
        onChange={(e) =>
          setFormData({ ...formData, packetweight: e.target.value })
        }
        className={`formInput ${errors.packetweight ? 'error' : ''}`}
      />
      {errors.packetweight && (
        <span className="errorMessage">{errors.packetweight}</span>
      )}
    </label>

    <label className="formLabel">
      Description:
      <input
        type="text"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className={`formInput ${errors.description ? 'error' : ''}`}
      />
      {errors.description && (
        <span className="errorMessage">{errors.description}</span>
      )}
    </label>

    <label className="formLabel">
      Created By:
      <input
        type="text"
        value={formData.createdby}
        onChange={(e) =>
          setFormData({ ...formData, createdby: e.target.value })
        }
        className={`formInput ${errors.createdby ? 'error' : ''}`}
      />
      {errors.createdby && (
        <span className="errorMessage">{errors.createdby}</span>
      )}
    </label>

    {/* <label className="formLabel">
      Files:
      <input
        type="file"
        onChange={handleFileChange}
        className={`formInput ${errors.files ? 'error' : ''}`}
        multiple
      />
      {errors.files && (
        <span className="errorMessage">{errors.files}</span>
      )}
    </label> */}

<div className="upload__box">
        <div className="upload__btn-box">
          <label className="upload__btn">
            <p>Upload images</p>
            <input
              type="file"
              name="files"
              multiple
              data-max_length="5"
              className="upload__inputfile"
              onChange={handleFilesChange}
            />
          </label>
        </div>
        <div className="upload__img-wrap">
          {filePreviews.map((preview, index) => (
            <div key={index} className="upload__img-box">
              <div
                style={{
                  backgroundImage: `url(${preview})`,
                }}
                data-number={index}
                className="img-bg"
              >
                <div
                  className="upload__img-close"
                  onClick={() => handleRemoveFile(index)}
                ></div>
              </div>
            </div>
          ))}
          </div>
        </div>

    <label className="formLabel">
      Manufacture Date:
      <input
        type="date"
        value={formData.manufactureDate}
        onChange={(e) =>
          setFormData({ ...formData, manufactureDate: e.target.value })
        }
        className={`formInput ${errors.manufactureDate ? 'error' : ''}`}
      />
      {errors.manufactureDate && (
        <span className="errorMessage">{errors.manufactureDate}</span>
      )}
    </label>

    <label className="formLabel">
      Expiry Date:
      <input
        type="date"
        value={formData.expiryDate}
        onChange={(e) =>
          setFormData({ ...formData, expiryDate: e.target.value })
        }
        className={`formInput ${errors.expiryDate ? 'error' : ''}`}
      />
      {errors.expiryDate && (
        <span className="errorMessage">{errors.expiryDate}</span>
      )}
    </label>

    <label className="formLabel">
      Seller Information:
      <input
        type="text"
        value={formData.sellerInformation}
        onChange={(e) =>
          setFormData({ ...formData, sellerInformation: e.target.value })
        }
        className="formInput"
      />
    </label>
    <div className="cl-toggle-switch">
    <label className="formLabel">
        Deal of the Day:
        <label className="cl-switch">
          <input
            type="checkbox"
            checked={formData.dealOfDay}
            onChange={() =>
              setFormData({ ...formData, dealOfDay: !formData.dealOfDay })
            }
          />
          <span className="slider"></span>
        </label>
      </label>
      </div>

    <button type="submit" className="formButton">
      Submit
    </button>
  </form>
  </div>
  );
};

export default AddProductForm;
